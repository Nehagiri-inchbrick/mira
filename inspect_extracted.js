const fs = require('fs');

// Let's inspect the PDF structure
const buf = fs.readFileSync('Mira Verde_Brochure.pdf');
console.log('PDF total size:', buf.length);

// Let's check how many images were extracted and their properties
const files = fs.readdirSync('extracted_images');
console.log('Total extracted files:', files.length);

// Let's check image dimensions and aspect ratios
const sizeOf = (buffer) => {
  // Simple JPEG dimension reader
  let i = 0;
  while (i < buffer.length) {
    if (buffer[i] === 0xFF && buffer[i+1] === 0xC0) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    i++;
  }
  return null;
};

files.forEach(f => {
  if (f.endsWith('.jpg')) {
    const b = fs.readFileSync('extracted_images/' + f);
    const dims = sizeOf(b);
    console.log(`${f}: ${b.length} bytes, dims: ${dims ? dims.width + 'x' + dims.height : 'unknown'}`);
  }
});
