const fs = require('fs');
const path = require('path');

// Output file path
const OUTPUT_FILE = path.join(__dirname, 'codebase_transcription.md');

// Directories to ignore
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.github',
  'dist',
  'build',
  'artifacts',
  '.vscode',
  '.idea',
  'temp',
  'tmp',
  'coverage',
  '.next'
]);

// Binary / ignored extensions
const IGNORED_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.svg',
  '.pdf', '.zip', '.gz', '.tar', '.mp4', '.avi', '.mov',
  '.woff', '.woff2', '.ttf', '.eot',
  '.db', '.sqlite', '.exe', '.dll', '.bin',
  '.docx', '.xlsx', '.pptx', '.lock',
  '-lock.json', '.lock.json', 'lock.yaml', 'lock.yml'
]);

// Exact filenames to ignore
const IGNORED_FILES = new Set([
  'scrape-project.js',
  'codebase_transcription.md',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  '.DS_Store'
]);

// Function to check if a file should be ignored
function shouldIgnoreFile(fileName) {
  if (IGNORED_FILES.has(fileName)) return true;
  
  const ext = path.extname(fileName).toLowerCase();
  if (IGNORED_EXTS.has(ext)) return true;
  
  if (fileName.includes('lock.json') || fileName.includes('-lock.json') || fileName.includes('lock-')) return true;

  return false;
}

// Clear or create the output file
fs.writeFileSync(OUTPUT_FILE, `# Codebase Transcription for SonTerry E-Commerce\n\nGenerated on: ${new Date().toLocaleString()}\n\n`, 'utf8');

let fileCount = 0;

function traverseDir(currentDir) {
  const files = fs.readdirSync(currentDir);

  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const relativePath = path.relative(__dirname, fullPath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (IGNORED_DIRS.has(file)) {
        continue;
      }
      traverseDir(fullPath);
    } else {
      if (shouldIgnoreFile(file)) {
        continue;
      }

      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const ext = path.extname(file).substring(1);
        
        // Determine codeblock syntax highlighting tag
        let syntax = 'javascript';
        if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
          syntax = 'javascript';
        } else if (ext === 'json') {
          syntax = 'json';
        } else if (ext === 'css') {
          syntax = 'css';
        } else if (ext === 'html') {
          syntax = 'html';
        } else if (ext === 'md') {
          syntax = 'markdown';
        } else if (['yml', 'yaml'].includes(ext)) {
          syntax = 'yaml';
        } else if (ext === 'sh') {
          syntax = 'bash';
        } else {
          syntax = 'text';
        }

        // Write header and contents to transcription file
        fs.appendFileSync(
          OUTPUT_FILE,
          `## File: ${relativePath}\n\n**Path:** \`${relativePath}\`\n\n\`\`\`${syntax}\n${content}\n\`\`\`\n\n---\n\n`,
          'utf8'
        );
        fileCount++;
        console.log(`Transcribed: ${relativePath}`);
      } catch (err) {
        console.error(`Error reading ${relativePath}: ${err.message}`);
      }
    }
  }
}

console.log('Starting project transcription...');
traverseDir(__dirname);
console.log(`Finished transcribing ${fileCount} files into: ${OUTPUT_FILE}`);
