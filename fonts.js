// Copies the fonts into app/fonts so the app looks right with no internet.
const fs = require("fs"), path = require("path");
const out = path.join(__dirname, "..", "app", "fonts");
fs.mkdirSync(out, { recursive: true });
const want = [
  ["oswald", "Oswald", [400, 600]],
  ["barlow-condensed", "Barlow Condensed", [500, 600, 700]],
  ["share-tech-mono", "Share Tech Mono", [400]],
  ["vt323", "VT323", [400]]
];
let css = "";
for (const [pkg, family, weights] of want) {
  for (const w of weights) {
    const f = `${pkg}-latin-${w}-normal.woff2`;
    const src = path.join(__dirname, "..", "node_modules", "@fontsource", pkg, "files", f);
    if (!fs.existsSync(src)) { console.warn("font missing, skipped:", f); continue; }
    fs.copyFileSync(src, path.join(out, f));
    css += `@font-face{font-family:"${family}";font-weight:${w};font-style:normal;font-display:swap;src:url("fonts/${f}") format("woff2");}\n`;
  }
}
fs.writeFileSync(path.join(__dirname, "..", "app", "fonts.css"), css);
console.log("fonts ready");
