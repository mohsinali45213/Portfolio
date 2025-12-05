import { databases, ID } from '../appwrite/appwriteConfig';
import { ContactMessage } from '../types/types';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_CONTACTS;

// CREATE - Add new contact message
export const createContactMessage = async (data: Omit<ContactMessage, '$id' | 'createdAt'>): Promise<ContactMessage> => {
  try {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const messageData = {
      ...cleanData,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), messageData);
    return response as unknown as ContactMessage;
  } catch (err) {
    console.error('Error creating contact message:', err);
    throw err;
  }
};

// READ - Get all contact messages
export const getAllContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents as unknown as ContactMessage[];
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    return [];
  }
};

// READ - Get contact message by ID
export const getContactMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return response as unknown as ContactMessage;
  } catch (err) {
    console.error('Error fetching contact message by ID:', err);
    return null;
  }
};

// UPDATE - Update contact message status
export const updateContactMessageStatus = async (id: string, status: 'unread' | 'read' | 'replied'): Promise<ContactMessage> => {
  try {
    const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { status });
    return response as unknown as ContactMessage;
  } catch (err) {
    console.error('Error updating contact message status:', err);
    throw err;
  }
};

// DELETE - Delete contact message by ID
export const deleteContactMessage = async (id: string): Promise<void> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (err) {
    console.error('Error deleting contact message:', err);
    throw err;
  }
};

// UTILITY - Get unread messages
export const getUnreadMessages = async (): Promise<ContactMessage[]> => {
  try {
    const allMessages = await getAllContactMessages();
    return allMessages.filter(msg => msg.status === 'unread');
  } catch (err) {
    console.error('Error filtering unread messages:', err);
    return [];
  }
};
