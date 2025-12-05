# Post-Deployment Checklist

## ✅ Critical Steps After Deployment

### 1. **Add Domain to Appwrite** (MOST IMPORTANT!)
Your admin panel won't work without this:

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your Portfolio project
3. Click "Settings" in the left sidebar
4. Go to "Platforms" tab
5. Click "Add Platform" → "Web App"
6. Enter your deployment URL (e.g., `https://your-domain.vercel.app`)
7. Save

**Without this step, authentication and all API calls will fail!**

### 2. **Verify Environment Variables**
Make sure these are set in your deployment platform:

- [ ] `VITE_APPWRITE_ENDPOINT`
- [ ] `VITE_APPWRITE_PROJECT_ID`
- [ ] `VITE_APPWRITE_DATABASE_ID`
- [ ] `VITE_APPWRITE_COLLECTION_ID_INFO`
- [ ] `VITE_APPWRITE_COLLECTION_ID_EXPERIENCE`
- [ ] `VITE_APPWRITE_COLLECTION_ID_SKILLS`
- [ ] `VITE_APPWRITE_COLLECTION_ID_PROJECTS`
- [ ] `VITE_APPWRITE_COLLECTION_ID_CERTIFICATES`
- [ ] `VITE_APPWRITE_COLLECTION_ID_CONTACTS`
- [ ] `VITE_APPWRITE_BUCKET_ID`

### 3. **Test Admin Panel Access**
- [ ] Navigate to `https://your-domain.com/admin`
- [ ] Login page should appear (not 404)
- [ ] Can login with your credentials
- [ ] Can see all management sections

### 4. **Test Image Upload**
- [ ] Upload a project image in admin
- [ ] Upload a certificate image in admin
- [ ] Verify images appear in the frontend

### 5. **Test Data Display**
- [ ] Projects section shows your projects
- [ ] Certificates section shows your certifications
- [ ] Skills section displays correctly
- [ ] Experience timeline appears
- [ ] About section has your info

## 🔧 Troubleshooting

### Admin Panel Shows 404
**Problem:** SPA routing not configured
**Solution:** 
- Vercel: `vercel.json` is already included ✓
- Netlify: `netlify.toml` and `public/_redirects` are included ✓
- Redeploy after pushing latest code

### "Invalid Origin" or CORS Errors
**Problem:** Domain not added to Appwrite
**Solution:** Follow Step 1 above - Add domain to Appwrite platforms

### Images Not Loading
**Problem:** Wrong bucket URL or environment variables
**Solution:** 
1. Verify `VITE_APPWRITE_BUCKET_ID` is correct
2. Check Appwrite Storage permissions (File Read: Role Any)
3. Verify image URLs in database are correct

### Login Not Working
**Problem:** Authentication not configured or domain not whitelisted
**Solution:**
1. Verify domain is added to Appwrite (Step 1)
2. Check Appwrite Auth is enabled
3. Make sure you have a user account created in Appwrite

## 📝 Notes

- The admin panel route is: `/admin` (not `/admin.html`)
- Default Vercel URL works: `https://yourproject.vercel.app/admin`
- Custom domains need to be added to Appwrite separately
- After adding domain to Appwrite, wait 1-2 minutes for changes to propagate

## 🚀 Quick Test Commands

Test locally before deployment:
```bash
npm run build
npm run preview
```

Then test:
- Homepage: http://localhost:4173
- Admin: http://localhost:4173/admin

## ⚡ Deployment Platforms

### Vercel (Recommended)
✓ Uses `vercel.json` for routing
✓ Automatic HTTPS
✓ Fast global CDN

### Netlify
✓ Uses `netlify.toml` and `_redirects`
✓ Automatic HTTPS
✓ Form handling

### Others
Check their documentation for SPA routing configuration.
