require("babel-register")({
    presets: ["env", "react"]
  });
   
  const router = require("./sitemap-routes").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://marg-art.org/")
            .save("./../../marg-balancer/sitemap.xml")
      );
  }
  
  generateSitemap();