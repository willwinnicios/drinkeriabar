import fs from 'fs';

const files = ['src/App.tsx', 'src/index.css'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/#000A1A/g, '#001E3F'); // Replace with a more distinct navy blue
  content = content.replace(/0, 10, 26/g, '0, 30, 63'); // Update the rgba equivalents for glass classes
  fs.writeFileSync(file, content);
});

console.log('Colors updated.');
