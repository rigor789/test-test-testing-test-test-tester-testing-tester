const webpack = require("@nativescript/webpack");
const {
  NativeScriptPreviewWebpackPlugin,
} = require("../test/dist/NativeScriptPreviewWebpackPlugin");


module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.chainWebpack((config, env) => {
    if (env.preview) {
      config
        .plugin("NativeScriptPreviewWebpackPlugin")
        .use(NativeScriptPreviewWebpackPlugin);
    }
  });

  return webpack.resolveConfig();
};
