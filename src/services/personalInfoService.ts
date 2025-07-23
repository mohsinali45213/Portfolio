import { databases, ID } from '../appwrite/appwriteConfig';
import { PersonalInfo } from '../types/types';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_INFO;

export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return (res.documents[0] as unknown as PersonalInfo) || null;
  } catch (err) {
    console.error('Error fetching personal info:', err);
    return null;
  }
};

export const updatePersonalInfo = async (docId: string, data: Partial<PersonalInfo>) => {
  try {
    // Filter out Appwrite metadata fields
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, cleanData);
  } catch (err) {
    console.error('Error updating personal info:', err);
    throw err;
  }
};

export const createPersonalInfo = async (data: PersonalInfo) => {
  try {
    // Filter out Appwrite metadata fields
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    return await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), cleanData);
  } catch (err) {
    console.error('Error creating personal info:', err);
    throw err;
  }
};

export const deletePersonalInfo = async (docId: string) => {
  try {
    return await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
  } catch (err) {
    console.error('Error deleting personal info:', err);
    throw err;
  }
};