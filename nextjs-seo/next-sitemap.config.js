/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://inspir.uk",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Single sitemap file, no index
  outDir: './public', // Output to public directory
};
