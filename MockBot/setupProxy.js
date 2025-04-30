const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/generate-mcq',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      timeout: 300000, // 5 minutes
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Request-Start', Date.now());
      },
      onError: (err, req, res) => {
        res.status(500).json({
          error: 'Proxy error',
          details: err.message
        });
      }
    })
  );
};