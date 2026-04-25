import fs from 'fs';

const files = ['./src/App.tsx', './src/index.css'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/#001E3F/g, '#1F2133'); // Replace with #1F2133
  content = content.replace(/0, 30, 63/g, '31, 33, 51'); // Update the rgba equivalents
  fs.writeFileSync(file, content);
});

console.log('Colors updated to #1F2133.');
