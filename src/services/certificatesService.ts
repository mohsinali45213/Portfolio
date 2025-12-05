import { databases, ID } from '../appwrite/appwriteConfig';
import { Certificate } from '../types/types';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_CERTIFICATES;

// CREATE - Add new certificate
export const createCertificate = async (data: Omit<Certificate, '$id'>): Promise<Certificate> => {
  try {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), cleanData);
    return response as unknown as Certificate;
  } catch (err) {
    console.error('Error creating certificate:', err);
    throw err;
  }
};

// READ - Get all certificates
export const getAllCertificates = async (): Promise<Certificate[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents as unknown as Certificate[];
  } catch (err) {
    console.error('Error fetching certificates:', err);
    return [];
  }
};

// READ - Get certificate by ID
export const getCertificateById = async (id: string): Promise<Certificate | null> => {
  try {
    const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return response as unknown as Certificate;
  } catch (err) {
    console.error('Error fetching certificate by ID:', err);
    return null;
  }
};

// UPDATE - Update existing certificate
export const updateCertificate = async (id: string, data: Partial<Certificate>): Promise<Certificate> => {
  try {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data as any;
    const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, cleanData);
    return response as unknown as Certificate;
  } catch (err) {
    console.error('Error updating certificate:', err);
    throw err;
  }
};

// DELETE - Delete certificate by ID
export const deleteCertificate = async (id: string): Promise<void> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (err) {
    console.error('Error deleting certificate:', err);
    throw err;
  }
};

// UTILITY - Get verified certificates
export const getVerifiedCertificates = async (): Promise<Certificate[]> => {
  try {
    const allCertificates = await getAllCertificates();
    return allCertificates.filter(cert => cert.verified === true);
  } catch (err) {
    console.error('Error filtering verified certificates:', err);
    return [];
  }
};

// UTILITY - Get certificates by issuer
export const getCertificatesByIssuer = async (issuer: string): Promise<Certificate[]> => {
  try {
    const allCertificates = await getAllCertificates();
    return allCertificates.filter(cert => 
      cert.issuer.toLowerCase().includes(issuer.toLowerCase())
    );
  } catch (err) {
    console.error('Error filtering certificates by issuer:', err);
    return [];
  }
};
