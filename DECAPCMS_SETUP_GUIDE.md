# DecapCMS Production Setup Guide

## Overview
This guide ensures DecapCMS works properly in production with Netlify deployment and Git Gateway authentication.

## Key Issues Fixed

### 1. **Duplicate Configuration Resolved**
- Removed duplicate CMS config from `src/js/cms.js`
- Standardized on `site/static/admin/config.yml` as single source of truth
- CMS now loads configuration automatically from YAML file

### 2. **Editorial Workflow Implemented**
- Added `publish_mode: editorial_workflow` to enable content approval process
- Changes now go through draft → review → publish workflow
- Content managers can review changes before they go live

### 3. **Netlify Identity Integration**
- Added Netlify Identity widget to main site layout (`baseof.html`)
- Configured proper authentication flow in admin interface
- Users will be redirected to `/admin/` after login

### 4. **Build Process Optimized**
- Updated `netlify.toml` with proper Hugo version and build settings
- Added security headers for admin interface
- Configured Git Gateway processing

## Production Deployment Steps

### Step 1: Enable Netlify Identity
1. Go to your Netlify site dashboard
2. Navigate to **Identity** tab
3. Click **Enable Identity**
4. Under **Settings & usage**, enable:
   - **Open registration** (initially, then disable after adding users)
   - **Git Gateway** (this is crucial for CMS functionality)

### Step 2: Configure Git Gateway
1. In Netlify Identity settings, scroll to **Git Gateway**
2. Click **Enable Git Gateway**
3. This allows DecapCMS to commit directly to your repository

### Step 3: Add CMS Users
1. In Netlify Identity, go to **Users** tab
2. Click **Invite users** and add email addresses of content managers
3. Users will receive invitation emails to set up accounts

### Step 4: Update Site URL
In `site/static/admin/config.yml`, replace:
```yaml
site_url: https://your-site.netlify.app
display_url: https://your-site.netlify.app
```
With your actual Netlify site URL.

### Step 5: Deploy Changes
1. Commit all changes to your repository
2. Push to main branch
3. Netlify will automatically rebuild and deploy

## Testing the CMS Workflow

### For Content Managers:
1. Visit `https://your-site.netlify.app/admin/`
2. Log in with Netlify Identity credentials
3. Create or edit content (products/knowledge base articles)
4. Save as draft → Submit for review → Publish

### For Developers:
1. Check that changes appear in Git as pull requests (editorial workflow)
2. Merge approved changes to trigger production deployment
3. Verify content appears on live site after deployment

## Troubleshooting

### CMS Not Loading
- Check browser console for JavaScript errors
- Verify Netlify Identity is enabled
- Ensure Git Gateway is configured

### Changes Not Appearing in Production
- Check if editorial workflow is enabled (changes need approval)
- Verify build process completes successfully in Netlify
- Check that content files have `draft: false`

### Authentication Issues
- Ensure Netlify Identity widget is loaded on all pages
- Check that users have been invited and confirmed accounts
- Verify Git Gateway permissions

## File Structure
```
site/
├── static/
│   └── admin/
│       ├── index.html          # CMS interface
│       └── config.yml          # CMS configuration
├── content/
│   ├── catalog/               # Product content
│   └── guides/                # Knowledge base content
└── layouts/
    └── _default/
        └── baseof.html        # Main layout with Identity widget
```

## Security Notes
- Admin interface is protected by Netlify Identity
- Editorial workflow prevents unauthorized content publication
- Git Gateway ensures all changes are tracked in version control
- Security headers configured for admin routes

## Next Steps
1. Deploy to production
2. Configure Netlify Identity and Git Gateway
3. Add content manager users
4. Test complete workflow from content creation to publication
