const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy("/api", {
            secure: false,
            target: "https://localhost:8080",
            changeOrigin: true,
            onProxyReq(proxyReq) {
                if (proxyReq.getHeader("origin")) {
                    proxyReq.setHeader("origin", "https://localhost:8080")
                }
            },
            pathRewrite: { "^/api": "" },
            logLevel: "debug",
        })
    )
}
