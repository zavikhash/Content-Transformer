#!/bin/bash
cd "$(dirname "$0")"
echo "=================================================="
echo "⚡ Starting OmniFormat Content Studio..."
echo "=================================================="
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies (first-time setup)..."
  npm install
fi
echo "Launching local dev server..."
npm run dev
