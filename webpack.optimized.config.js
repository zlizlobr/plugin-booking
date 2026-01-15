const path = require("path");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

// Automaticky načti všechny komponenty ze složky admin/wpify/components
const getWpifyComponents = () => {
  const componentsDir = path.resolve(__dirname, "assets/js/admin/wpify/components");
  const entries = {};
  
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    files.forEach(file => {
      if (file.endsWith('.js') && file !== 'index.js') {
        const componentName = path.basename(file, '.js');
        entries[`wpify/${componentName}`] = path.resolve(componentsDir, file);
      }
    });
  }
  
  return entries;
};

// Automaticky načti všechny bloky ze složky blocks/
const getBlocks = () => {
  const blocksDir = path.resolve(__dirname, "assets/js/blocks");
  const entries = {};
  
  if (fs.existsSync(blocksDir)) {
    const files = fs.readdirSync(blocksDir);
    files.forEach(file => {
      if (file.endsWith('.js') && file !== 'index.js') {
        const blockName = path.basename(file, '.js');
        entries[`blocks/${blockName}`] = path.resolve(blocksDir, file);
      }
    });
  }
  
  return entries;
};

// Společná konfigurace pro JS
const getCommonJSConfig = (name) => ({
  name,
  entry: {
    [name]: `./assets/js/${name}/index.js`,
    ...getWpifyComponents(), // Wpify components are needed in both admin and public
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "assets/js/dist"),
    chunkLoadingGlobal: "webpackChunkBooking",
  },
  devtool: "source-map",
  stats: {
    preset: "minimal",
    errors: true,
    assets: false,
    warnings: true,
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        oneOf: [
          // TableBuilderComponent MUST be compiled with React when imported by wpify components
          {
            test: /TableBuilderComponent\.jsx$/,
            include: path.resolve(__dirname, "assets/js/admin/TableBuilderComponent.jsx"),
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-env"
                ],
              },
            },
          },
          // Wpify components need React (not Preact) for wpify-custom-fields compatibility
          {
            include: [
              path.resolve(__dirname, "assets/js/admin/wpify/components"),
            ],
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-env"
                ],
              },
            },
          },
          // All other files use Preact
          {
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react", "@babel/preset-env"],
                plugins: [
                  [
                    "@babel/plugin-transform-react-jsx",
                    { pragma: "h", pragmaFrag: "Fragment" },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    // Konzistentní chunk IDs - použijeme "named" pro lepší kompatibilitu s dynamickými importy
    // Explicitní názvy v splitChunks zajistí konzistenci mezi dev a build
    chunkIds: "named",
    moduleIds: "named",
    // Runtime chunk pro lepší správu chunk loading
    runtimeChunk: false,
    // Konzistentní code splitting - pouze pro dynamické importy
    splitChunks: {
      chunks: "async", // Pouze async chunks (dynamické importy), entry pointy zůstávají
      minSize: 0, // Povolit i malé chunk
      cacheGroups: {
        default: false,
        vendors: false,
        // TableBuilderComponent má vlastní chunk při dynamickém importu
        tableBuilder: {
          test: /[\\/]assets[\\/]js[\\/]admin[\\/]TableBuilderComponent\.jsx$/,
          name: (module, chunks, cacheGroupKey) => {
            return "tableBuilder";
          },
          priority: 30,
          reuseExistingChunk: true,
        },
        // React DOM client má speciální chunk
        reactDOMClient: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]client/,
          name: "node_modules_react-dom_client_js",
          priority: 25,
          reuseExistingChunk: true,
          enforce: true,
        },
        // React DOM index
        reactDOMIndex: {
          test: /[\\/]node_modules[\\/]react-dom[\\/](?!client)/,
          name: "vendors-node_modules_react-dom_index_js",
          priority: 20,
          reuseExistingChunk: true,
        },
        // React JSX runtime
        reactJSXRuntime: {
          test: /[\\/]node_modules[\\/]react[\\/]jsx-runtime/,
          name: "vendors-node_modules_react_jsx-runtime_js",
          priority: 15,
          reuseExistingChunk: true,
        },
        // React core (ne jsx-runtime) - pokud je použit v dynamických importech
        react: {
          test: /[\\/]node_modules[\\/]react[\\/](?!jsx-runtime)/,
          name: "vendors-node_modules_react_index_js",
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@js": path.resolve(__dirname, "assets/js"),
      "@styles": path.resolve(__dirname, "assets/css"),
      "@wpify": path.resolve(__dirname, "assets/css/wpify"),
    },
  },
});

// Společná konfigurace pro CSS
const getCommonCSSConfig = (name, postcssConfig) => ({
  name: `${name}-css`,
  entry: {
    [`${name}-css`]: `./assets/css/${name}/${name}.css`,
  },
  output: {
    filename: `${name}-css.js`, // Dummy file, CSS se extrahuje
    path: path.resolve(__dirname, "assets/js/dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { 
              sourceMap: false
            },
          },
          {
            loader: "postcss-loader",
            options: {
              implementation: require("postcss"),
              postcssOptions: {
                config: path.resolve(__dirname, postcssConfig),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `../../css/dist/${name}.min.css`,
      ignoreOrder: false,
    }),
  ],
});

const configs = [
  // Admin JS
  getCommonJSConfig('admin'),
  
  // Admin CSS
  getCommonCSSConfig('admin', './postcss.admin.config.js'),
  
  // Public JS
  getCommonJSConfig('public'),
  
  // Public CSS
  getCommonCSSConfig('public', './postcss.public.config.js'),
];

// Pokud je nastaven BUILD_TARGET, filtruj konfigurace
const buildTarget = process.env.BUILD_TARGET;
if (buildTarget) {
  const filtered = configs.filter(config => {
    if (buildTarget === 'admin') {
      return config.name === 'admin' || config.name === 'admin-css';
    }
    if (buildTarget === 'public') {
      return config.name === 'public' || config.name === 'public-css';
    }
    return true;
  });
  module.exports = filtered;
} else {
  module.exports = configs;
}
