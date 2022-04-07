const {
  NativeScriptPreviewWebpackPlugin,
} = require("./dist/NativeScriptPreviewWebpackPlugin");

/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  // same API as the user configs
  // for example make changes to the internal config with webpack-chain
  webpack.chainWebpack((config, env) => {
    if (env.preview) {
      config
        .plugin("NativeScriptPreviewWebpackPlugin")
        .use(NativeScriptPreviewWebpackPlugin);
    }
  });
};
