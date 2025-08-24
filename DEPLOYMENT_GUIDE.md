# Deployment Guide - Dynamic Catalog System

## 🚀 Quick Deployment Steps

### 1. Pre-deployment Checklist

```bash
# Verify Hugo installation
hugo version

# Test local build
hugo server -D

# Check for build errors
hugo --minify
```

## 🔧 Local Development Setup

### DecapCMS Local Backend

For local development with DecapCMS, use the local backend to avoid Git authentication:

**1. Install DecapCMS Proxy Server:**
```bash
npm install -g @decapcms/cli
```

**2. Start Local Backend:**
```bash
# In project root
decap-server
```

**3. Start Hugo Development Server:**
```bash
# In site/ directory
hugo server -D
```

**4. Access CMS:**
- Hugo site: `http://localhost:1313`
- CMS admin: `http://localhost:1313/admin`
- Local backend runs on: `http://localhost:8082`

**Configuration:**
The `local_backend` is already configured in `config.yml`:
```yaml
local_backend:
  url: http://localhost:8082
```

**Benefits:**
- No Git authentication required
- Instant content updates
- Full CMS functionality locally
- Perfect for development and testing

### 2. Environment Setup

**Required Environment Variables:**
```bash
HUGO_VERSION=0.118.0
NODE_VERSION=18.x
```

**Build Commands:**
```bash
# Install dependencies
npm install

# Build Hugo site
hugo --minify

# Build assets
npm run build
```

### 3. Netlify Deployment

**netlify.toml Configuration:**
```toml
[build]
  publish = "site/public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.118.0"
  NODE_VERSION = "18"

[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview.environment]
  HUGO_ENV = "production"
```

### 4. CMS Authentication Setup

**Enable Git Gateway:**
1. Go to Netlify dashboard
2. Navigate to Site Settings > Identity
3. Enable Identity service
4. Enable Git Gateway
5. Set registration to "Invite only"

**Configure CMS Access:**
```yaml
# In site/static/admin/config.yml
backend:
  name: git-gateway
  branch: main

# Enable editorial workflow (optional)
publish_mode: editorial_workflow
```

### 5. Content Migration

**Migrate Existing Products:**
```bash
# Create product files from data
node scripts/migrate-products.js

# Verify content structure
find site/content/catalog -name "*.md" | head -10
```

**Migrate Knowledge Base:**
```bash
# Convert existing guides
node scripts/migrate-guides.js

# Check categories
grep -r "category:" site/content/guides/
```

## 🔧 Advanced Configuration

### Custom Domain Setup

1. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

2. **SSL Certificate:**
   - Automatic via Netlify
   - Custom certificates supported

### Performance Optimization

**Hugo Configuration:**
```toml
[minify]
  disableCSS = false
  disableHTML = false
  disableJS = false
  disableJSON = false
  disableSVG = false
  disableXML = false

[imaging]
  resampleFilter = "lanczos"
  quality = 85
  anchor = "smart"
```

**Asset Optimization:**
```bash
# Optimize images
npm run optimize-images

# Minify CSS/JS
npm run minify-assets
```

### CDN Configuration

**Netlify CDN Settings:**
```toml
[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## 🔍 Testing & Validation

### Pre-deployment Tests

```bash
# Test all templates
hugo --templateMetrics

# Validate HTML
npm run validate-html

# Check internal links
npm run check-links

# Test responsive design
npm run test-responsive
```

### Post-deployment Verification

1. **Functionality Tests:**
   - [ ] Product pages load correctly
   - [ ] Knowledge base articles display
   - [ ] CMS admin panel accessible
   - [ ] Product slider works
   - [ ] Category filtering functions

2. **Performance Tests:**
   - [ ] Page load speed < 3s
   - [ ] Mobile performance score > 90
   - [ ] SEO score > 95
   - [ ] Accessibility score > 95

3. **Content Tests:**
   - [ ] Add test product via CMS
   - [ ] Create test knowledge base article
   - [ ] Verify content appears on site
   - [ ] Test content editing workflow

## 🚨 Troubleshooting

### Common Deployment Issues

**Build Failures:**
```bash
# Check Hugo version compatibility
hugo version

# Verify template syntax
hugo --templateMetrics --verbose

# Check for missing partials
grep -r "partial.*missing" logs/
```

**CMS Issues:**
```bash
# Verify Git Gateway setup
curl -X GET "https://api.netlify.com/api/v1/sites/SITE_ID/identity"

# Check authentication
curl -H "Authorization: Bearer TOKEN" \
  "https://api.netlify.com/api/v1/user"
```

**Content Not Displaying:**
```bash
# Check content structure
hugo list all

# Verify front matter
head -20 site/content/catalog/*.md

# Test template logic
hugo server --debug
```

### Performance Issues

**Slow Build Times:**
```bash
# Enable build caching
export HUGO_CACHEDIR=./cache

# Optimize image processing
hugo --gc --minify
```

**Large Bundle Size:**
```bash
# Analyze bundle
npm run analyze-bundle

# Remove unused CSS
npm run purge-css
```

## 📊 Monitoring & Analytics

### Setup Google Analytics

```html
<!-- In layouts/partials/head.html -->
{{ if .Site.Params.googleAnalytics }}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ .Site.Params.googleAnalytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ .Site.Params.googleAnalytics }}');
</script>
{{ end }}
```

### Performance Monitoring

**Netlify Analytics:**
- Enable in dashboard
- Track page views
- Monitor performance metrics

**Custom Metrics:**
```javascript
// Track product views
gtag('event', 'page_view', {
  page_title: 'Product: {{ .Title }}',
  page_location: '{{ .Permalink }}',
  content_group1: 'Products'
});
```

## 🔐 Security Best Practices

### Content Security Policy

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = """
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://identity.netlify.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
    """
```

### Access Control

```yaml
# CMS user roles
roles:
  - name: editor
    permissions:
      - create: products
      - edit: products
      - create: guides
      - edit: guides
  - name: admin
    permissions:
      - "*"
```

## 📈 Scaling Considerations

### High Traffic Optimization

1. **Enable Netlify Edge:**
   ```toml
   [build]
     edge_handlers = "netlify/edge-handlers"
   ```

2. **Implement Caching Strategy:**
   ```javascript
   // Service worker for offline support
   self.addEventListener('fetch', event => {
     if (event.request.url.includes('/catalog/')) {
       event.respondWith(cacheFirst(event.request));
     }
   });
   ```

3. **Database Integration (Future):**
   ```javascript
   // Headless CMS integration
   const products = await fetch('/api/products');
   const guides = await fetch('/api/guides');
   ```

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks

- [ ] Update Hugo version monthly
- [ ] Review and optimize images quarterly
- [ ] Update dependencies
- [ ] Monitor performance metrics
- [ ] Backup content regularly

### Emergency Procedures

**Site Down:**
1. Check Netlify status
2. Review recent deployments
3. Rollback if necessary
4. Contact support if needed

**CMS Issues:**
1. Verify Git Gateway status
2. Check authentication tokens
3. Review recent config changes
4. Test with fresh browser session
