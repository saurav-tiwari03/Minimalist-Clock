const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/og-image.svg');
const outputPath = path.join(__dirname, '../public/og-image.png');

async function generateOGImage() {
  try {
    await sharp(inputPath)
      .resize(1200, 630)
      .png()
      .toFile(outputPath);
    
    console.log('✅ Generated og-image.png (1200x630)');
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
}

generateOGImage();
