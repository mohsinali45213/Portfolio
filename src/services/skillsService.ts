import { databases, ID } from '../appwrite/appwriteConfig';
import { Skill } from '../types/types';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_SKILLS;

// Helper function to determine proficiency based on level
const getProficiencyFromLevel = (level: number): 'Beginner' | 'Intermediate' | 'Advanced' => {
  if (level <= 40) return 'Beginner';
  if (level <= 75) return 'Intermediate';
  return 'Advanced';
};

// CREATE - Add new skill
export const createSkill = async (data: Omit<Skill, '$id'>): Promise<Skill> => {
  try {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    
    // Ensure proficiency is set based on level if not provided
    const skillData = {
      ...cleanData,
      proficiency: cleanData.proficiency || getProficiencyFromLevel(cleanData.level)
    };
    
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), skillData);
    return response as unknown as Skill;
  } catch (err) {
    console.error('Error creating skill:', err);
    throw err;
  }
};

// READ - Get all skills
export const getAllSkills = async (): Promise<Skill[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents as unknown as Skill[];
  } catch (err) {
    console.error('Error fetching skills:', err);
    return [];
  }
};

// READ - Get skill by ID
export const getSkillById = async (id: string): Promise<Skill | null> => {
  try {
    const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return response as unknown as Skill;
  } catch (err) {
    console.error('Error fetching skill by ID:', err);
    return null;
  }
};

// UPDATE - Update existing skill
export const updateSkill = async (id: string, data: Partial<Skill>): Promise<Skill> => {
  try {
    console.log('updateSkill called with:', { id, data });
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    
    console.log('Clean data to send:', cleanData);
    const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, cleanData);
    console.log('Update response:', response);
    return response as unknown as Skill;
  } catch (err) {
    console.error('Error updating skill:', err);
    throw err;
  }
};

// DELETE - Delete skill by ID
export const deleteSkill = async (id: string): Promise<void> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (err) {
    console.error('Error deleting skill:', err);
    throw err;
  }
};

// UTILITY - Get skills by category
export const getSkillsByCategory = async (category: string): Promise<Skill[]> => {
  try {
    const allSkills = await getAllSkills();
    return allSkills.filter(skill => skill.category.toLowerCase() === category.toLowerCase());
  } catch (err) {
    console.error('Error filtering skills by category:', err);
    return [];
  }
};
