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

// Automaticky načti všechny CSS bloky ze složky blocks/
const getBlockCss = () => {
  const blocksCssDir = path.resolve(__dirname, "assets/css/blocks");
  const entries = {};
  
  if (fs.existsSync(blocksCssDir)) {
    const files = fs.readdirSync(blocksCssDir);
    files.forEach(file => {
      if (file.endsWith('.css')) {
        const blockName = path.basename(file, '.css');
        entries[`blocks-css/${blockName}`] = path.resolve(blocksCssDir, file);
      }
    });
  }
  
  return entries;
};

module.exports = {
  entry: {
    public: "./assets/js/public/index.js",
    admin: "./assets/js/admin/index.js",
    ...getBlocks(),
    ...getWpifyComponents(),
    ...getBlockCss(),
    "public-css": "./assets/css/public.css",
    "admin-css": "./assets/css/admin.css",
  },

  devtool: "source-map",

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets/js/dist"),
  },

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
                config: path.resolve(__dirname, "./postcss.config.js"),
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
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        if (pathData.chunk.name === "public-css") {
          return "../../css/dist/public.min.css";
        }
        if (pathData.chunk.name === "admin-css") {
          return "../../css/dist/admin.min.css";
        }
        if (pathData.chunk.name.startsWith("blocks-css/")) {
          const blockName = pathData.chunk.name.replace("blocks-css/", "");
          return `../../css/blocks/${blockName}.css`;
        }
        return "../../css/dist/[name].min.css";
      },
      ignoreOrder: false,
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@js": path.resolve(__dirname, "assets/js"),
      "@styles": path.resolve(__dirname, "assets/css"),
      "@wpify": path.resolve(__dirname, "assets/css/wpify"),
      // Keep React for wpify/custom-fields compatibility
      // react: "preact/compat",
      // "react-dom": "preact/compat",
      // "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
};
