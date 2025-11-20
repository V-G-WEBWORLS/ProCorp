const fs = require('fs');
const path = require('path');

const root = __dirname;
const distDir = path.join(root, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{:;,}])\s*/g, '$1')
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function copyRootFiles() {
  const files = fs.readdirSync(root).filter(f => {
    const full = path.join(root, f);
    return fs.statSync(full).isFile() && !['build.js', 'package.json', 'README.md'].includes(f);
  });

  files.forEach(f => {
    // we already generate minified versions for styles/script and transform index.html
    if (['styles.css', 'script.js', 'index.html'].includes(f)) return;
    const src = path.join(root, f);
    const dest = path.join(distDir, f);
    fs.copyFileSync(src, dest);
  });
}

function build() {
  ensureDir(distDir);

  // Minify CSS
  const cssPath = path.join(root, 'styles.css');
  if (fs.existsSync(cssPath)) {
    const css = fs.readFileSync(cssPath, 'utf8');
    const min = minifyCSS(css);
    fs.writeFileSync(path.join(distDir, 'styles.min.css'), min, 'utf8');
    console.log('styles.min.css written');
  }

  // Minify JS
  const jsPath = path.join(root, 'script.js');
  if (fs.existsSync(jsPath)) {
    const js = fs.readFileSync(jsPath, 'utf8');
    const min = minifyJS(js);
    fs.writeFileSync(path.join(distDir, 'script.min.js'), min, 'utf8');
    console.log('script.min.js written');
  }

  // Process HTML
  const htmlPath = path.join(root, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    html = html.replace(/href="styles\.css"/g, 'href="styles.min.css"');
    html = html.replace(/src="script\.js"/g, 'src="script.min.js"');
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    console.log('dist/index.html written');
  }

  // Copy other root files (images, icons, etc.)
  copyRootFiles();

  console.log('\nBuild complete — output in dist/');
}

build();
