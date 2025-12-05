import { create } from 'zustand';
import { PersonalInfo, Experience, Skill, Project, Certificate } from '../types/types';
import { getAllExperiences } from '../services/experienceService';
import { getPersonalInfo } from '../services/personalInfoService';
import { getAllSkills } from '../services/skillsService';
import { getAllProjects } from '../services/projectsService';
import { getAllCertificates } from '../services/certificatesService';

interface PortfolioState {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateExperiences: (experiences: Experience[]) => void;
  loadExperiences: () => Promise<void>;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateCertificates: (certificates: Certificate[]) => void;
  loadPersonalInfo: () => Promise<void>;
  loadSkills: () => Promise<void>;
  loadProjects: () => Promise<void>;
  loadCertificates: () => Promise<void>;
  loadAllData: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  personalInfo: {
    name: 'Mohsin Ali',
    title: 'Data scientist & ML Engineer',
    email: 'mohsinaliabidali320@gmail.com',
    phone: '9327900855',
    location: 'Patan Gujarat, 384265',
    website: '',
    bio: '',
    profile_img: '',
    github: 'http://github.com/mohsinali45213',
    linkedin: 'https://www.linkedin.com/in/mohsinaliaghariya/',
  },
  experiences: [],
  projects: [],
  skills: [],
  certificates: [],
  loading: false,
  error: null,
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => set((state) => ({
    personalInfo: { ...state.personalInfo, ...info }
  })),
  
  updateExperiences: (experiences: Experience[]) => set({ experiences }),
  
  loadExperiences: async () => {
    try {
      set({ loading: true, error: null });
      const experiences = await getAllExperiences();
      set({ experiences, loading: false });
    } catch (error) {
      console.error('Error loading experiences:', error);
      set({ error: 'Failed to load experiences', loading: false });
    }
  },
  
  updateProjects: (projects: Project[]) => set({ projects }),
  
  updateSkills: (skills: Skill[]) => set({ skills }),
  
  updateCertificates: (certificates: Certificate[]) => set({ certificates }),
  
  loadPersonalInfo: async () => {
    try {
      set({ loading: true, error: null });
      const info = await getPersonalInfo();
      if (info) {
        set({ personalInfo: info, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Error loading personal info:', error);
      set({ error: 'Failed to load personal info', loading: false });
    }
  },
  
  loadSkills: async () => {
    try {
      set({ loading: true, error: null });
      const skills = await getAllSkills();
      set({ skills, loading: false });
    } catch (error) {
      console.error('Error loading skills:', error);
      set({ error: 'Failed to load skills', loading: false });
    }
  },
  
  loadProjects: async () => {
    try {
      set({ loading: true, error: null });
      const projects = await getAllProjects();
      set({ projects, loading: false });
    } catch (error) {
      console.error('Error loading projects:', error);
      set({ error: 'Failed to load projects', loading: false });
    }
  },
  
  loadCertificates: async () => {
    try {
      set({ loading: true, error: null });
      const certificates = await getAllCertificates();
      set({ certificates, loading: false });
    } catch (error) {
      console.error('Error loading certificates:', error);
      set({ error: 'Failed to load certificates', loading: false });
    }
  },
  
  loadAllData: async () => {
    try {
      set({ loading: true, error: null });
      const [personalInfo, experiences, skills, projects, certificates] = await Promise.all([
        getPersonalInfo(),
        getAllExperiences(),
        getAllSkills(),
        getAllProjects(),
        getAllCertificates()
      ]);
      
      set({
        personalInfo: personalInfo || {
          name: 'Mohsin Ali',
          title: 'Data scientist & ML Engineer',
          email: 'mohsinaliabidali320@gmail.com',
          phone: '9327900855',
          location: 'Patan Gujarat, 384265',
          website: '',
          bio: '',
          profile_img: '',
          github: 'http://github.com/mohsinali45213',
          linkedin: 'https://www.linkedin.com/in/mohsinaliaghariya/',
        },
        experiences,
        skills,
        projects,
        certificates,
        loading: false
      });
    } catch (error) {
      console.error('Error loading all data:', error);
      set({ error: 'Failed to load portfolio data', loading: false });
    }
  }
}));