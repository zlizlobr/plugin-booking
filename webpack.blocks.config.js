const path = require("path");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

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
const getBlocksCSS = () => {
  const blocksDir = path.resolve(__dirname, "assets/css/blocks");
  const entries = {};
  
  if (fs.existsSync(blocksDir)) {
    const files = fs.readdirSync(blocksDir);
    files.forEach(file => {
      if (file.endsWith('.css') && !file.includes('compiled') && !file.includes('final')) {
        const blockName = path.basename(file, '.css');
        entries[`blocks/${blockName}`] = path.resolve(blocksDir, file);
      }
    });
  }
  
  return entries;
};

module.exports = [
  // JS Blocks
  {
    name: 'blocks-js',
    entry: getBlocks(),
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
                  { 
                    pragma: "h", 
                    pragmaFrag: "Fragment" 
                  },
                ],
              ],
            },
          },
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
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@js": path.resolve(__dirname, "assets/js"),
        "@styles": path.resolve(__dirname, "assets/css"),
      },
    },
  },
  
  // CSS Blocks
  {
    name: 'blocks-css',
    entry: getBlocksCSS(),
    output: {
      filename: "[name]-css.js", // Dummy file, CSS se extrahuje
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
                  config: path.resolve(__dirname, './postcss.public.config.js'),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: (pathData) => {
          const name = pathData.chunk.name.replace('blocks/', '');
          return `../../css/dist/blocks/${name}.css`;
        },
        ignoreOrder: false,
      }),
    ],
  },
];
