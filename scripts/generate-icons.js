const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/icons/logo_512.png');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate 256x256 icon
    await sharp(inputFile)
      .resize(256, 256)
      .toFile(path.join(outputDir, 'logo_256.png'));

    // Generate 384x384 icon
    await sharp(inputFile)
      .resize(384, 384)
      .toFile(path.join(outputDir, 'logo_384.png'));

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
