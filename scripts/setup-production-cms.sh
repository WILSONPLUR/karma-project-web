#!/bin/bash

# DecapCMS Production Setup Script
# This script helps verify and prepare the CMS for production deployment

echo "🚀 DecapCMS Production Setup"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "site" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check for required files
echo "📁 Checking required files..."

required_files=(
    "site/static/admin/config.yml"
    "site/static/admin/index.html"
    "netlify.toml"
    "site/layouts/_default/baseof.html"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ Missing: $file"
        exit 1
    fi
done

# Check CMS configuration
echo "🔧 Validating CMS configuration..."

if grep -q "publish_mode: editorial_workflow" site/static/admin/config.yml; then
    echo "  ✅ Editorial workflow enabled"
else
    echo "  ⚠️  Editorial workflow not found - changes will publish immediately"
fi

if grep -q "git-gateway" site/static/admin/config.yml; then
    echo "  ✅ Git Gateway configured"
else
    echo "  ❌ Git Gateway not configured"
    exit 1
fi

# Check Netlify Identity integration
echo "🔐 Checking Netlify Identity integration..."

if grep -q "netlify-identity-widget" site/layouts/_default/baseof.html; then
    echo "  ✅ Netlify Identity widget integrated in main layout"
else
    echo "  ❌ Netlify Identity widget missing from main layout"
    exit 1
fi

# Check build configuration
echo "🏗️  Checking build configuration..."

if grep -q "HUGO_VERSION" netlify.toml; then
    echo "  ✅ Hugo version specified in netlify.toml"
else
    echo "  ⚠️  Hugo version not specified - may cause build issues"
fi

# Verify content structure
echo "📄 Checking content structure..."

if [ -d "site/content/catalog" ] && [ -d "site/content/guides" ]; then
    echo "  ✅ Content directories exist"
    
    catalog_count=$(find site/content/catalog -name "*.md" | wc -l)
    guides_count=$(find site/content/guides -name "*.md" | wc -l)
    
    echo "  📊 Found $catalog_count product files"
    echo "  📊 Found $guides_count guide files"
else
    echo "  ❌ Content directories missing"
    exit 1
fi

echo ""
echo "🎉 Setup validation complete!"
echo ""
echo "📋 Next steps for production deployment:"
echo "1. Update site URL in site/static/admin/config.yml"
echo "2. Deploy to Netlify"
echo "3. Enable Netlify Identity in your site dashboard"
echo "4. Enable Git Gateway in Netlify Identity settings"
echo "5. Invite content managers via Netlify Identity"
echo ""
echo "📖 See DECAPCMS_SETUP_GUIDE.md for detailed instructions"
