const fs = require("fs");
const path = require("path");

// directory path
const assetDirectory = path.resolve(__dirname, "../assets/");

fs.rm(assetDirectory, { recursive: true }, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Assets cleared");
});
