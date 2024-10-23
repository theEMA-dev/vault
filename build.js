import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const assetDirs = ['asset/grid/thumbnail'];
const gridComponentFile = path.resolve('src/components/grid.ts');
const metadataFile = path.resolve('src/data/metadata.json');

// Function to get assets with metadata
function getAssets() {
  const metadata = JSON.parse(readFileSync(metadataFile, 'utf-8'));
  let assets = [];
  for (const dir of assetDirs) {
    const fullPath = path.resolve(dir);
    const files = readdirSync(fullPath).filter(file => /\.(png|jpe?g|webp|gif|svg)$/.test(file));
    assets = assets.concat(files.map(file => {
      const id = parseInt(path.basename(file, path.extname(file)), 10);
      const assetMetadata = metadata.find(meta => meta.id === id);
      return assetMetadata ? { id, src: `${dir}/${file}`, ...assetMetadata } : { id, src: `${dir}/${file}`, title: "null", release: "null", author: "null", resolution: "null", sgdb: "null", sdb: "null", attributes: [] , tags: [] };
    }));
  }
  // Sort assets in descending order based on filename
  assets.sort((a, b) => b.id - a.id);
  return assets;
}

// Get assets
const assets = getAssets();

// Read the existing content of grid.ts
let gridComponentContent = readFileSync(gridComponentFile, 'utf-8');

// Define the assets line to be inserted
const assetsLine = `  assets: Asset[] = ${JSON.stringify(assets, null, 2)};\n`;

// Find the position to insert the assets line
const startCommentIndex = gridComponentContent.indexOf('// ASSET GENERATE LINE (DO NOT DELETE THIS LINE)');
const endCommentIndex = gridComponentContent.indexOf('// ASSET GENERATE LINE END (DO NOT DELETE THIS LINE)');

if (startCommentIndex !== -1 && endCommentIndex !== -1) {
  const lines = gridComponentContent.split('\n');
  const startLineIndex = lines.findIndex(line => line.includes('// ASSET GENERATE LINE (DO NOT DELETE THIS LINE)'));
  const endLineIndex = lines.findIndex(line => line.includes('// ASSET GENERATE LINE END (DO NOT DELETE THIS LINE)'));

  if (startLineIndex !== -1 && endLineIndex !== -1) {
    // Replace the lines between the start and end comments with the new assets line
    lines.splice(startLineIndex + 1, endLineIndex - startLineIndex - 1, ...assetsLine.split('\n'));
    gridComponentContent = lines.join('\n');
  } else {
    console.error('Unable to find the lines between the comment lines.');
  }
} else {
  console.error('Comment lines not found in grid.ts');
}

// Write the updated content back to grid.ts
writeFileSync(gridComponentFile, gridComponentContent);
console.log('Assets detected and injected into grid component:', assets);