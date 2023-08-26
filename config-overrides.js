// eth crypto
const webpack = require("webpack");

module.exports = function override(config, env) {
  // TODO: see about removing some of these deps to not need to do this
  // need this because of ethereumjs-util, node-rsa, ...
  console.log("override");
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve("assert/"), // ethereumjs-util
    buffer: require.resolve("buffer/"), // ethereumjs-util
    constants: require.resolve("constants-browserify"), // node-rsa
    crypto: require.resolve("crypto-browserify"), // node-rsa
    stream: require.resolve("stream-browserify"), // cipher-base
    // http: require.resolve("stream-http"), // rskapi
    // https: require.resolve("https-browserify"), // rskapi
    // "process/browser": require.resolve("process/browser"), // eth crypto
    // stream: require.resolve("stream-browserify"), // rskapi
    // url: require.resolve("url/"), // rskapi
  };
  // config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  // eth crypto
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  //   new webpack.ProvidePlugin({
  //     process: "process/browser",
  //   }),
  ];
  return config;
};
