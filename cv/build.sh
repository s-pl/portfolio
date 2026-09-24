#!/bin/sh
# Genera los PDF del CV a partir de cv/cv.{es,en}.html con Chrome headless.
set -e

cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

render() {
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=5000 \
    --print-to-pdf="../public/cv/$2" "file://$PWD/$1" 2>/dev/null
  echo "public/cv/$2"
}

render cv.es.html cv-samuel-ponce.pdf
render cv.en.html cv-samuel-ponce-en.pdf
