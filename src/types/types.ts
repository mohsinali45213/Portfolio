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
