const fs = require('fs');
const path = require('path');

// Create simple SVG images that can be used as placeholders
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];

for (let i = 1; i <= 10; i++) {
      const color = colors[i - 1];
      const svg = `<svg width="800" height="1200" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="1200" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
    Menu Page ${i}
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
    Click to flip pages
  </text>
</svg>`;

      fs.writeFileSync(path.join(__dirname, 'public', 'menu-images', `page${i}.svg`), svg);
      console.log(`Created page${i}.svg`);
}

console.log('All menu page images created successfully!');
