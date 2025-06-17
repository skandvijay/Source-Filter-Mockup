#!/bin/bash

echo "🚀 Starting Setup..."

# Install Homebrew if missing
if ! command -v brew &> /dev/null; then
    echo "🔧 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js if missing
if ! command -v node &> /dev/null; then
    echo "🔧 Installing Node.js..."
    brew install node
else
    echo "✅ Node.js is already installed."
fi

# Install dependencies
echo "📦 Installing npm packages..."
npm install

# Run the dev server
echo "🚀 Launching app..."
npm run dev
