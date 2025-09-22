const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../public/icons/logo_512.png');
const outputDir = path.join(__dirname, '../public/icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy the 512x512 icon to create the other sizes
const sizes = [192, 256, 384];
sizes.forEach(size => {
  const destFile = path.join(outputDir, `logo_${size}.png`);
  if (!fs.existsSync(destFile)) {
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Created ${destFile}`);
  } else {
    console.log(`${destFile} already exists`);
  }
});

console.log('Icons setup complete!');
