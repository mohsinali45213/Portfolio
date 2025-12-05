# Complete Appwrite Collections Setup Guide

This document provides complete setup instructions for all Appwrite collections needed for the dynamic portfolio.

## Database Collections

You need to create **6 collections** in your Appwrite database:

### 1. Personal Info Collection (`personal_info`)

| Attribute Key | Type    | Size | Required | Array |
|---------------|---------|------|----------|-------|
| name          | String  | 255  | Yes      | No    |
| title         | String  | 255  | Yes      | No    |
| email         | Email   | 255  | Yes      | No    |
| phone         | String  | 20   | Yes      | No    |
| website       | URL     | 255  | No       | No    |
| location      | String  | 255  | Yes      | No    |
| bio           | String  | 2000 | No       | No    |
| profile_img   | String  | 255  | No       | No    |
| github        | URL     | 255  | Yes      | No    |
| linkedin      | URL     | 255  | Yes      | No    |

### 2. Experience Collection (`experience`)

| Attribute Key | Type    | Size  | Required | Array |
|---------------|---------|-------|----------|-------|
| title         | String  | 255   | Yes      | No    |
| company       | String  | 255   | Yes      | No    |
| location      | String  | 255   | Yes      | No    |
| duration      | String  | 100   | Yes      | No    |
| type          | String  | 100   | Yes      | No    |
| description   | String  | 2000  | Yes      | No    |
| technologies  | String  | 1000  | Yes      | No    |

**Note**: `technologies` should be stored as comma-separated string (e.g., "React, Node.js, MongoDB")

### 3. Skills Collection (`skills`)

| Attribute Key | Type    | Size | Required | Array |
|---------------|---------|------|----------|-------|
| name          | String  | 100  | Yes      | No    |
| level         | Integer | -    | Yes      | No    |
| category      | String  | 100  | Yes      | No    |
| color         | String  | 100  | Yes      | No    |

**Category Options**: Programming, Data Science, ML/AI, Big Data, Cloud, DevOps

**Color Format**: Tailwind gradient classes (e.g., "from-blue-400 to-blue-600")

**Level Range**: 0-100 (representing skill proficiency percentage)

### 4. Projects Collection (`projects`)

| Attribute Key | Type    | Size  | Required | Array |
|---------------|---------|-------|----------|-------|
| title         | String  | 255   | Yes      | No    |
| description   | String  | 2000  | Yes      | No    |
| image         | URL     | 500   | Yes      | No    |
| tech          | String  | 1000  | Yes      | No    |
| liveUrl       | URL     | 500   | Yes      | No    |
| githubUrl     | URL     | 500   | Yes      | No    |
| featured      | Boolean | -     | Yes      | No    |
| status        | String  | 100   | Yes      | No    |

**Note**: `tech` should be stored as comma-separated string or JSON array string (e.g., "React, TypeScript, Node.js")

**Status Options**: completed, in-progress, planned

### 5. Certificates Collection (`certificates`)

| Attribute Key | Type    | Size  | Required | Array |
|---------------|---------|-------|----------|-------|
| title         | String  | 255   | Yes      | No    |
| issuer        | String  | 255   | Yes      | No    |
| date          | String  | 100   | Yes      | No    |
| credentialId  | String  | 255   | Yes      | No    |
| image         | URL     | 500   | Yes      | No    |
| description   | String  | 2000  | Yes      | No    |
| skills        | String  | 1000  | Yes      | No    |
| verified      | Boolean | -     | Yes      | No    |
| link          | URL     | 500   | Yes      | No    |

**Note**: `skills` should be stored as comma-separated string (e.g., "React, JavaScript, Testing")

### 6. Contacts Collection (`contacts`)

| Attribute Key | Type     | Size  | Required | Array |
|---------------|----------|-------|----------|-------|
| name          | String   | 255   | Yes      | No    |
| email         | Email    | 255   | Yes      | No    |
| message       | String   | 5000  | Yes      | No    |
| createdAt     | String   | 100   | Yes      | No    |
| status        | String   | 50    | Yes      | No    |

**Status Options**: unread, read, replied

**CreatedAt Format**: ISO 8601 date string (automatically set by service)

## Storage Buckets

### Profile Images Bucket (`profile-images`)

**Settings**:
- Maximum File Size: 5MB
- Allowed File Extensions: jpg, jpeg, png, gif, webp
- Compression: Enabled
- Encryption: Enabled

## Permissions Setup

For each collection and bucket, configure the following permissions:

### Development/Testing (Recommended for initial setup):
- **Read**: Any
- **Create**: Any
- **Update**: Any
- **Delete**: Any

### Production (Recommended):
- **Personal Info, Experience, Skills, Projects, Certificates**: 
  - Read: Any
  - Create/Update/Delete: Users (authenticated)
  
- **Contacts**: 
  - Read: Users (authenticated/admin only)
  - Create: Any (allow contact form submissions)
  - Update/Delete: Users (authenticated/admin only)

- **Profile Images Bucket**: 
  - Read: Any
  - Create/Update/Delete: Users (authenticated)

## Environment Variables

After creating all collections and buckets, update your `.env` file:

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

## Quick Setup Checklist

- [ ] Create Appwrite project
- [ ] Create database
- [ ] Create 6 collections with attributes as specified
- [ ] Create storage bucket for profile images
- [ ] Configure permissions for all collections and bucket
- [ ] Copy collection IDs and bucket ID
- [ ] Create `.env` file with all required variables
- [ ] Test connection using the admin panel

## Data Format Examples

### Skills Example:
```json
{
  "name": "Python",
  "level": 95,
  "category": "Programming",
  "color": "from-blue-400 to-blue-600"
}
```

### Projects Example:
```json
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce solution...",
  "image": "https://example.com/image.jpg",
  "tech": "React, Node.js, PostgreSQL, Stripe",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": true,
  "status": "completed"
}
```

### Certificates Example:
```json
{
  "title": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "date": "2023",
  "credentialId": "AWS-SAA-2023-001",
  "image": "https://example.com/cert.jpg",
  "description": "Comprehensive certification...",
  "skills": "Cloud Architecture, AWS Services, Security",
  "verified": true,
  "link": "https://verify.example.com"
}
```

## Notes

- All string array fields (tech, skills, technologies) are stored as comma-separated strings for Appwrite compatibility
- The frontend services automatically parse these strings into arrays for display
- ISO 8601 format is used for all date/time fields
- URLs should include the full protocol (https://)
- Boolean fields are native Appwrite booleans (true/false)
