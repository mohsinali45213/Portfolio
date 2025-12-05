export interface PersonalInfo {
  $id?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  bio: string;
  profile_img?: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  $id?: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  technologies: string;
}

export interface Skill {
  $id?: string;
  name: string;
  level: number;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  color: string;
}

export interface Project {
  $id?: string;
  title: string;
  description: string;
  image: string;
  tech: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
}

export interface Certificate {
  $id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  description: string;
  skills: string;
  verified: boolean;
  link: string;
}

export interface ContactMessage {
  $id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}
