#!/bin/sh
set -e

rm -rf dist
mkdir -p dist/assets

# JS: bundle all modules into one file, minify, mangle variable names
esbuild js/app.js \
  --bundle \
  --minify \
  --format=esm \
  --external:@electric-sql/pglite \
  --external:petite-vue \
  --outfile=dist/app.min.js

# CSS: minify
esbuild css/app.css \
  --minify \
  --outfile=dist/app.min.css

# Copy static files
cp index.html dist/index.html
cp .nojekyll dist/
cp assets/favicon.ico dist/assets/
cp -r lessons dist/lessons

# Patch index.html to use minified files
sed -i '' 's|css/app.css|app.min.css|' dist/index.html
sed -i '' 's|js/app.js|app.min.js|' dist/index.html

echo "Build complete → dist/"
ls -lh dist/app.min.js dist/app.min.css
