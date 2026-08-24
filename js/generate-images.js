/* Generate SVG images for products */
const fs = require('fs');
const path = require('path');

const products = [
  { id: 1, name: "lavender-candle", text: "Lavender\nCandle", bg: "b8c9a9" },
  { id: 2, name: "teacup-set", text: "Teacup\nSet", bg: "e8d5d0" },
  { id: 3, name: "woven-basket", text: "Woven\nBasket", bg: "d4c4a8" },
  { id: 4, name: "linen-pillow", text: "Linen\nPillow", bg: "e5ddd3" },
  { id: 5, name: "dried-flowers", text: "Dried\nFlowers", bg: "e8d5d0" },
  { id: 6, name: "ceramic-vase", text: "Ceramic\nVase", bg: "c5d1c2" },
  { id: 7, name: "knit-throw", text: "Knit\nThrow", bg: "d8cfc2" },
  { id: 8, name: "candle-trio", text: "Candle\nTrio", bg: "b8c9a9" },
  { id: 9, name: "beeswax-candle", text: "Beeswax\nCandle", bg: "d4c4a8" },
  { id: 10, name: "serving-board", text: "Serving\nBoard", bg: "c9b8a8" },
  { id: 11, name: "cotton-napkins", text: "Cotton\nNapkins", bg: "e5ddd3" },
  { id: 12, name: "botanical-print", text: "Botanical\nPrint", bg: "c5d1c2" },
  { id: 13, name: "reed-diffuser", text: "Reed\nDiffuser", bg: "b8c9a9" },
  { id: 14, name: "brass-frame", text: "Brass\nFrame", bg: "d8cfc2" },
  { id: 15, name: "table-runner", text: "Table\nRunner", bg: "e5ddd3" },
  { id: 16, name: "storage-jars", text: "Storage\nJars", bg: "c9b8a8" }
];

const categories = [
  { id: "home-decor", text: "Home\nDecor", bg: "c5d1c2" },
  { id: "candles", text: "Candles", bg: "b8c9a9" },
  { id: "kitchen-dining", text: "Kitchen\n& Dining", bg: "c9b8a8" },
  { id: "textiles", text: "Textiles", bg: "e5ddd3" },
  { id: "gifts", text: "Gifts", bg: "e8d5d0" }
];

function generateSVG(text, bg) {
  const safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = safeText.split("\n");
  const lineHeight = 36;
  const startY = 350 - ((lines.length - 1) * lineHeight) / 2;
  const textElements = lines
    .map((line, i) => `<tspan x="300" y="${startY + i * lineHeight}">${line}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">
  <rect width="600" height="700" fill="#${bg}"/>
  <rect x="20" y="20" width="560" height="660" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <text x="300" y="350" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="#ffffff" font-style="italic">
    ${textElements}
  </text>
</svg>`;
}

const imagesDir = path.join(__dirname, '..', 'images');

// Generate product images
products.forEach(product => {
  const svg = generateSVG(product.text, product.bg);
  const filename = `product-${product.id}.svg`;
  const filepath = path.join(imagesDir, filename);
  fs.writeFileSync(filepath, svg);
  console.log(`Created ${filename}`);
});

// Generate category images
categories.forEach(category => {
  const svg = generateSVG(category.text, category.bg);
  const filename = `category-${category.id}.svg`;
  const filepath = path.join(imagesDir, filename);
  fs.writeFileSync(filepath, svg);
  console.log(`Created ${filename}`);
});

console.log('All images generated successfully!');
