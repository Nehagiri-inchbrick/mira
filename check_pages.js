const fs = require('fs');
const path = require('path');

// Let's inspect where the photos and where the text are on each PDF page
// In img_2.jpg: Left side is photo, Right side is beige with text!
// In img_19.jpg: Is the photo the whole page or only left side?
// In img_8.jpg: Left side is photo, Right side is beige with quote!
// In img_20.jpg: Left side is photo, Right side is beige with quote!
// In img_17.jpg: Left side is aerial photo, Right side is beige with text!
// In img_22.jpg: Full bleed photo with white text in bottom left!
// In img_23.jpg: Full bleed photo with green text in top left!
// In img_27.jpg: Left is aerial photo, Right is Tbilisi photo + text!
console.log('Inspecting pages...');
