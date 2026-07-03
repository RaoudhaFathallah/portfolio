const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
if (fs.existsSync(outDir)) {
  fs.copyFileSync(
    path.join(__dirname, "..", "public", "portfolio-raoudha.html"),
    path.join(outDir, "index.html")
  );
}
