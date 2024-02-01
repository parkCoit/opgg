const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    ["/lol/summoner", "/lol/league"],
    createProxyMiddleware({
      target: "https://kr.api.riotgames.com/",
      changeOrigin: true,
    })
  );
  app.use(
    ["/riot", "/lol/match" ],  
    createProxyMiddleware({
      target: "https://asia.api.riotgames.com/",
      changeOrigin: true,
    })
  );
};