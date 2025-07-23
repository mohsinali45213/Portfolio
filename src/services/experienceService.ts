import { databases, ID } from '../appwrite/appwriteConfig';
import { Experience } from '../types/types';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_EXPERIENCE;

// CREATE - Add new experience
export const createExperience = async (data: Omit<Experience, '$id'>): Promise<Experience> => {
  try {
    // Filter out any potential Appwrite metadata fields
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), cleanData);
    return response as unknown as Experience;
  } catch (err) {
    console.error('Error creating experience:', err);
    throw err;
  }
};

// READ - Get all experiences
export const getAllExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents as unknown as Experience[];
  } catch (err) {
    console.error('Error fetching experiences:', err);
    return [];
  }
};

// READ - Get experience by ID
// export const getExperienceById = async (id: string): Promise<Experience | null> => {
//   try {
//     const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
//     return response as unknown as Experience;
//   } catch (err) {
//     console.error('Error fetching experience by ID:', err);
//     return null;
//   }
// };

// UPDATE - Update existing experience
export const updateExperience = async (id: string, data: Partial<Experience>): Promise<Experience> => {
  try {
    // Filter out Appwrite metadata fields
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, cleanData);
    return response as unknown as Experience;
  } catch (err) {
    console.error('Error updating experience:', err);
    throw err;
  }
};

// DELETE - Delete experience by ID
export const deleteExperience = async (id: string): Promise<void> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (err) {
    console.error('Error deleting experience:', err);
    throw err;
  }
};

// SEARCH - Search experiences by company or title
// export const searchExperiences = async (searchTerm: string): Promise<Experience[]> => {
//   try {
//     // Note: This assumes you have search/query capabilities set up in Appwrite
//     // You might need to adjust this based on your Appwrite setup
//     const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
//     const experiences = response.documents as unknown as Experience[];
    
//     // Client-side filtering if server-side search is not available
//     return experiences.filter(experience => 
//       experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       experience.technologies.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   } catch (err) {
//     console.error('Error searching experiences:', err);
//     return [];
//   }
// };

// UTILITY - Get experiences by type (e.g., "Full-time", "Part-time", "Internship")
// export const getExperiencesByType = async (type: string): Promise<Experience[]> => {
//   try {
//     const allExperiences = await getAllExperiences();
//     return allExperiences.filter(experience => 
//       experience.type.toLowerCase() === type.toLowerCase()
//     );
//   } catch (err) {
//     console.error('Error filtering experiences by type:', err);
//     return [];
//   }
// };

// UTILITY - Get experiences by company
// export const getExperiencesByCompany = async (company: string): Promise<Experience[]> => {
//   try {
//     const allExperiences = await getAllExperiences();
//     return allExperiences.filter(experience => 
//       experience.company.toLowerCase() === company.toLowerCase()
//     );
//   } catch (err) {
//     console.error('Error filtering experiences by company:', err);
//     return [];
//   }
// };

// BULK OPERATIONS - Create multiple experiences
// export const createMultipleExperiences = async (experiences: Omit<Experience, '$id'>[]): Promise<Experience[]> => {
//   try {
//     const promises = experiences.map(experience => createExperience(experience));
//     return await Promise.all(promises);
//   } catch (err) {
//     console.error('Error creating multiple experiences:', err);
//     throw err;
//   }
// };

// BULK OPERATIONS - Delete multiple experiences
// export const deleteMultipleExperiences = async (ids: string[]): Promise<void> => {
//   try {
//     const promises = ids.map(id => deleteExperience(id));
//     await Promise.all(promises);
//   } catch (err) {
//     console.error('Error deleting multiple experiences:', err);
//     throw err;
//   }
// };
