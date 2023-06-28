const express = require("express");

function setupStaticFiles(app) {
  app.use("/uploads", express.static("./uploads/professionals"));
  app.use("/uploads", express.static("./uploads/shops"));
  app.use("/uploads", express.static("./uploads/works"));
  app.use("/uploads", express.static("./uploads/magazines"));
  app.use("/uploads", express.static("./uploads/categories"));
  app.use("/uploads", express.static("./uploads/clients"));
  app.use("/uploads", express.static("./uploads/products"));
}

module.exports = setupStaticFiles;
