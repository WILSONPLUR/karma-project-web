# Dynamic Catalog System Documentation

## Overview
This Hugo-based dynamic catalog system converts the Next.js product page structure into a flexible, data-driven catalog that can handle multiple products and categories.

## File Structure

### Templates
- `site/layouts/catalog/single.html` - Main product page template
- `site/layouts/catalog/list.html` - Category listing page

### Partials
- `site/layouts/partials/product-hero.html` - Product hero section
- `site/layouts/partials/technical-specs.html` - Technical specifications display
- `site/layouts/partials/benefits.html` - Product benefits section
- `site/layouts/partials/pricing-calculator.html` - Interactive pricing calculator
- `site/layouts/partials/resources.html` - Resources and downloads section
- `site/layouts/partials/accordion-list.html` - FAQ accordion component

### Data Structure
- `site/data/products.json` - Central product database
- `site/content/catalog/[category]/[product].md` - Individual product content files

## How It Works

### 1. Product Data Resolution
The system uses a dual approach for product data:

1. **Primary**: Looks up product data from `site/data/products.json` by matching:
   - Product slug (URL-friendly name)
   - Product ID

2. **Fallback**: Uses front matter from the individual `.md` files if no match found in data

### 2. URL Structure
```
/catalog/politni-steky/karma-f405-v1/
```
- `politni-steky` = category slug
- `karma-f405-v1` = product slug

### 3. Content Files
Each product can have its own markdown file with front matter:

```yaml
---
title: "Політний стек KARMA F405 V1"
description: "Product description"
slug: "karma-f405-v1"
product_id: "2233"
category: "politni-steky"
price: 2500
currency: "грн"
in_stock: true
featured: true
---
```

## Components Converted from React

### ProductHero
- Displays product image, name, description
- Shows quick specs grid
- Call-to-action buttons

### TechnicalSpecs
- Dynamic specs display from product data
- Compatibility information
- Visual spec cards

### Benefits
- Static benefits grid with icons
- Responsive layout
- Call-to-action section

### PricingCalculator
- Interactive quantity selector
- Additional options checkboxes
- Real-time price calculation
- Bulk discount logic
- JavaScript-powered

### Resources
- Documentation downloads
- Software links
- Video tutorials
- Community links
- Support information

### AccordionList
- FAQ accordion component
- JavaScript-powered expand/collapse
- Reusable for any Q&A content

## Adding New Products

### Method 1: Data File (Recommended)
Add to `site/data/products.json`:

```json
{
  "id": "new-product-id",
  "name": "Product Name",
  "image": "/img/product.png",
  "alt": "Product alt text",
  "specs": [
    {
      "label": "Spec Name",
      "value": "Spec Value"
    }
  ]
}
```

### Method 2: Content File
Create `site/content/catalog/category/product-name.md`:

```yaml
---
title: "Product Name"
product_id: "unique-id"
specs:
  - label: "Spec Name"
    value: "Spec Value"
---
```

## Features

### Dynamic Product Loading
- Automatic product resolution by slug or ID
- Fallback to content file data
- 404 handling for missing products

### Interactive Elements
- Pricing calculator with real-time updates
- Accordion FAQ sections
- Responsive design

### SEO Friendly
- Clean URLs
- Meta data from front matter
- Structured content

## Customization

### Styling
All components use Tailwind CSS classes and can be customized by modifying the partial templates.

### FAQ Content
FAQ items are defined directly in the template and can be made dynamic by moving to data files.

### Pricing Logic
Discount tiers and pricing rules are in the JavaScript section of the pricing calculator partial.

## Error Handling

- Missing products show user-friendly 404 page
- Graceful fallbacks for missing data
- Console logging for debugging (in development)

## Performance

- Static generation via Hugo
- Minimal JavaScript for interactivity
- Optimized image loading
- CSS/JS bundling via Hugo Pipes (if configured)
