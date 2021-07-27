const path = require("path");
const child_process = require("child_process");
const TerserPlugin = require("terser-webpack-plugin");

console.log(child_process.execSync(
  "nim js -d:release -o:./src/nimBuild.js ./src/main.nim", 
));

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.js",
    injector: "./src/injector.js",
    loadInjector: "./src/loadInjector.js",
    runInjectors: "./src/runInjectors.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false
        },
      }),
    ],
  },
  performance: {
    maxEntrypointSize: 1e6,
    maxAssetSize: 1e6,
  }
};
