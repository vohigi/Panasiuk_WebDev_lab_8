const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
      // pathRewrite: {
      //   '^/api': '/',
      // },
    })
  );
};
