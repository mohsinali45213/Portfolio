# Deployment Guide

## Important: Admin Panel Access

After deploying your portfolio, you can access the admin panel at:
```
https://your-domain.com/admin
```

## Required Configuration Files

This project includes the following deployment configuration files:

### For Vercel
- `vercel.json` - Handles SPA routing

### For Netlify
- `netlify.toml` - Main configuration
- `public/_redirects` - Fallback routing rules

## Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID_INFO=your-personal-info-collection-id
VITE_APPWRITE_COLLECTION_ID_EXPERIENCE=your-experience-collection-id
VITE_APPWRITE_COLLECTION_ID_SKILLS=your-skills-collection-id
VITE_APPWRITE_COLLECTION_ID_PROJECTS=your-projects-collection-id
VITE_APPWRITE_COLLECTION_ID_CERTIFICATES=your-certificates-collection-id
VITE_APPWRITE_COLLECTION_ID_CONTACTS=your-contacts-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

## Deployment Instructions

### Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Push your code to GitHub
2. Create new site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

### Other Platforms (Cloudflare Pages, GitHub Pages, etc.)
Make sure to configure SPA routing properly. Most platforms require:
- All routes to be redirected to `/index.html`
- 200 status code (not 301/302 redirect)

## Troubleshooting

### Admin Panel Shows 404
**Solution:** The deployment platform needs SPA routing configuration.
- Vercel: Uses `vercel.json`
- Netlify: Uses `netlify.toml` and `public/_redirects`
- Others: Check their documentation for SPA routing setup

### Images Not Loading
**Solution:** Verify environment variables are set correctly, especially:
- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_BUCKET_ID`

### Login Not Working
**Solution:** 
1. Check Appwrite console for authentication settings
2. Add your deployment domain to Appwrite's allowed domains
3. Verify authentication is enabled in Appwrite project

## Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] Admin panel accessible at `/admin`
- [ ] Can login to admin panel
- [ ] Images are loading correctly
- [ ] All sections display data from Appwrite
- [ ] Forms are working (Contact, Admin CRUD operations)
- [ ] Domain added to Appwrite's Web Platform settings

## Appwrite Domain Configuration

Important: Add your deployment domain to Appwrite:
1. Go to your Appwrite Console
2. Select your project
3. Navigate to Settings > Platforms
4. Add your domain (e.g., `https://your-domain.com`)
5. Save changes

Without this, authentication and API calls will fail!
