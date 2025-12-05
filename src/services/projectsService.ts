import { databases, ID } from '../appwrite/appwriteConfig';
import { Project } from '../types/types';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_PROJECTS;

// CREATE - Add new project
export const createProject = async (data: Omit<Project, '$id'>): Promise<Project> => {
  try {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), cleanData);
    return response as unknown as Project;
  } catch (err) {
    console.error('Error creating project:', err);
    throw err;
  }
};

// READ - Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents as unknown as Project[];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
};

// READ - Get project by ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return response as unknown as Project;
  } catch (err) {
    console.error('Error fetching project by ID:', err);
    return null;
  }
};

// UPDATE - Update existing project
export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  try {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, cleanData);
    return response as unknown as Project;
  } catch (err) {
    console.error('Error updating project:', err);
    throw err;
  }
};

// DELETE - Delete project by ID
export const deleteProject = async (id: string): Promise<void> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (err) {
    console.error('Error deleting project:', err);
    throw err;
  }
};

// UTILITY - Get featured projects
export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const allProjects = await getAllProjects();
    return allProjects.filter(project => project.featured === true);
  } catch (err) {
    console.error('Error filtering featured projects:', err);
    return [];
  }
};

// UTILITY - Get projects by status
export const getProjectsByStatus = async (status: string): Promise<Project[]> => {
  try {
    const allProjects = await getAllProjects();
    return allProjects.filter(project => project.status.toLowerCase() === status.toLowerCase());
  } catch (err) {
    console.error('Error filtering projects by status:', err);
    return [];
  }
};
