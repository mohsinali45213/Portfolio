# Portfolio Personal Info Management - Appwrite Setup

## Appwrite Database Configuration

This application uses Appwrite as the backend for managing personal information and profile images. Follow these steps to set up your Appwrite database:

### 1. Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Note down your Project ID

### 2. Create Database
1. In your Appwrite project, go to Databases
2. Create a new database
3. Note down your Database ID

### 3. Create Storage Bucket
1. Go to Storage in your Appwrite project
2. Create a new bucket for profile images
3. Name it "profile-images" or similar
4. Note down your Bucket ID
5. Set appropriate permissions for read/write access

### 4. Create Collection for Personal Info
1. Create a new collection called "personal_info"
2. Note down your Collection ID

### 5. Configure Collection Attributes

Add the following attributes to your "personal_info" collection:

| Attribute Key | Type    | Size | Required | Default Value |
|---------------|---------|------|----------|---------------|
| name          | String  | 255  | Yes      | Mohsin Ali    |
| title         | String  | 255  | Yes      | Data scientist & ML Engineer |
| email         | Email   | 255  | Yes      | mohsinaliabidali320@gmail.com |
| phone         | String  | 20   | Yes      | 9327900855    |
| website       | URL     | 255  | No       | -             |
| location      | String  | 255  | Yes      | Patan Gujarat, 384265 |
| bio           | String  | 2000 | No       | -             |
| profile_img   | String  | 255  | No       | -             |
| github        | URL     | 255  | Yes      | http://github.com/mohsinali45213 |
| linkedin      | URL     | 255  | Yes      | https://www.linkedin.com/in/mohsinaliaghariya/ |

### 6. Set Permissions
Configure read/write permissions for your collection and bucket based on your authentication requirements.

### 7. Update Environment Variables
Make sure your `.env` file contains the correct values:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID_INFO=your-personal-info-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

## Features Implemented

✅ **Appwrite Integration**: Complete integration with Appwrite backend
✅ **CRUD Operations**: Create, Read, Update, Delete personal information
✅ **Image Upload**: Profile picture upload and storage in Appwrite
✅ **Image Management**: Automatic deletion of old images when updating
✅ **File Validation**: Image type and size validation (max 5MB)
✅ **Real-time Data**: Data is fetched from and saved to Appwrite database
✅ **Error Handling**: Proper error handling for API calls and uploads
✅ **Loading States**: Loading indicators during data operations
✅ **Type Safety**: Full TypeScript support with proper typing
✅ **No localStorage**: Removed all localStorage functionality
✅ **Modern UI**: Beautiful, responsive interface with Tailwind CSS

## Component Features

- **Real-time Loading**: Shows loading spinner while fetching data
- **Auto-save**: Changes are saved to Appwrite database
- **Image Upload**: Click to upload profile pictures
- **Image Preview**: Shows uploaded images or initials fallback
- **File Validation**: Validates image type and size before upload
- **Error Feedback**: User-friendly error messages
- **Edit Mode**: Toggle between view and edit modes
- **Field Validation**: Proper input types (email, URL, tel, etc.)
- **Responsive Design**: Works on all device sizes
- **Image Optimization**: Automatic image serving from Appwrite CDN

## Image Upload Features

- **File Types**: Supports all common image formats (jpg, png, gif, etc.)
- **Size Limit**: Maximum 5MB file size
- **Auto Cleanup**: Automatically deletes old profile images when uploading new ones
- **CDN Delivery**: Images served through Appwrite's global CDN
- **Fallback Display**: Shows user initials when no profile image exists
- **Upload Progress**: Visual feedback during image upload process

## Usage

The PersonalInfoManager component will:
1. Load existing data from Appwrite on component mount
2. Display profile image or fallback to user initials
3. Allow editing of all personal information fields
4. Enable profile picture upload with drag-and-drop or click
5. Save changes directly to Appwrite database
6. Provide real-time feedback for all operations
7. Handle image uploads and automatic cleanup
