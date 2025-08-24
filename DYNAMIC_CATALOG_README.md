# Dynamic Catalog & Knowledge Base Implementation

This document describes the complete implementation of a dynamic product catalog and knowledge base system using Hugo and DecapCMS.

## 🎯 Overview

The system allows content managers to:
- Add/edit products through DecapCMS interface
- Create knowledge base articles with categories
- Automatically display content in organized sections
- Generate SEO-friendly URLs for all content

## 🏗️ Architecture

### Content Structure
```
site/content/
├── catalog/           # Product pages
│   ├── _index.md     # Category index pages
│   └── *.md          # Individual products
└── guides/           # Knowledge base articles
    ├── _index.md     # KB main page
    └── *.md          # Individual articles
```

### Template Structure
```
site/layouts/
├── catalog/
│   ├── list.html     # Category listing page
│   └── single.html   # Individual product page
├── guides/
│   ├── list.html     # Knowledge base index
│   └── single.html   # Individual article page
└── partials/
    ├── our-products-section.html      # Dynamic product slider
    └── catalog-knowledge-base.html    # Dynamic KB section
```

## 📝 DecapCMS Configuration

### Product Collection Fields
- **Title**: Product name
- **Description**: Short description
- **Category**: politni-steky | videoperedavachi-vtx | esc
- **Product ID**: Unique identifier
- **Image**: Product image
- **Price & Currency**: Pricing information
- **Specs**: List of specifications (label/value pairs)
- **Body**: Detailed markdown content
- **Stock Status**: In stock boolean

### Knowledge Base Collection Fields
- **Title**: Article title
- **Description**: Article summary
- **Category**: БПЛА | Політні стеки | Відеопередавачі | ESC
- **Tags**: Optional tags list
- **Image**: Featured image
- **Date**: Publication date
- **Body**: Markdown content

## 🚀 Usage Instructions

### Adding Products via CMS

1. Navigate to `/admin` on your site
2. Click "Товари" (Products)
3. Click "New Товари"
4. Fill in all required fields:
   - Product name and description
   - Select appropriate category
   - Add product specifications
   - Upload product image
   - Set price and availability
5. Write detailed product description in markdown
6. Save and publish

### Adding Knowledge Base Articles

1. Navigate to `/admin` on your site
2. Click "База знань" (Knowledge Base)
3. Click "New База знань"
4. Fill in article details:
   - Title and description
   - Select category
   - Add relevant tags
   - Upload featured image
5. Write article content in markdown
6. Save and publish

### URL Structure

- **Products**: `/catalog/[product-slug]/`
- **Knowledge Base**: `/guides/[article-slug]/`
- **Categories**: `/catalog/[category-name]/`

## 🎨 Dynamic Features

### Product Slider
- Automatically displays products from selected category
- Responsive design (desktop/mobile)
- Links to individual product pages
- Uses product images and specifications

### Knowledge Base Integration
- Shows relevant articles by category
- Displays on product category pages
- Automatic fallback for empty categories
- Links to full articles

### Related Content
- Products show related items from same category
- Knowledge base articles link to relevant products
- Category-based navigation

## 🔧 Technical Implementation

### Hugo Configuration Updates
```toml
# Enable taxonomies
[taxonomies]
  category = "categories"
  tag = "tags"

# Permalink structure
[permalinks]
  catalog = "/catalog/:section/:filename/"
```

### Template Logic
- Uses `where` filters for category-based content
- Dynamic breadcrumb navigation
- Responsive grid layouts
- SEO-optimized meta data

### Content Management
- All content stored as markdown files
- Front matter contains structured data
- Git-based version control
- Preview functionality in CMS

## 📱 Responsive Design

### Desktop Features
- Multi-column product grids
- Sidebar navigation
- Large product images
- Detailed specifications

### Mobile Optimizations
- Single-column layouts
- Touch-friendly navigation
- Optimized image sizes
- Collapsible sections

## 🔍 SEO Optimization

### Product Pages
- Structured data for products
- Optimized meta descriptions
- Category-based breadcrumbs
- Internal linking structure

### Knowledge Base
- Article meta data
- Category organization
- Tag-based relationships
- Search-friendly URLs

## 🛠️ Maintenance

### Content Updates
- All updates through CMS interface
- Automatic Git commits
- Preview before publishing
- Version history tracking

### Adding Categories
1. Update category options in CMS config
2. Add category data to `products.json`
3. Update template category mappings
4. Test category filtering

### Performance
- Hugo static site generation
- Optimized image processing
- Minimal JavaScript dependencies
- Fast build times

## 🚨 Troubleshooting

### Common Issues

**Products not showing in slider:**
- Check category field matches exactly
- Verify product is not draft
- Ensure image path is correct

**Knowledge base articles missing:**
- Confirm category spelling
- Check article publication date
- Verify markdown syntax

**CMS preview not working:**
- Check preview template imports
- Verify field name consistency
- Review browser console for errors

### Debug Commands
```bash
# Test Hugo build
hugo server -D

# Check content structure
hugo list all

# Validate templates
hugo --templateMetrics
```

## 📊 Analytics Integration

The system supports:
- Google Analytics tracking
- Product view metrics
- Article engagement data
- Category performance analysis

## 🔐 Security

- Git-based authentication
- Role-based CMS access
- Secure image uploads
- Content validation

## 🎯 Future Enhancements

Potential improvements:
- Search functionality
- Product filtering
- User reviews
- Inventory management
- Multi-language support
- Advanced analytics

---

## 📞 Support

For technical issues or questions about the implementation, refer to:
- Hugo documentation: https://gohugo.io/
- DecapCMS docs: https://decapcms.org/
- Project repository issues
