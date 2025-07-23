import { create } from 'zustand';

interface PersonalInfo {
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

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
  type: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
}

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  color: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  description: string;
  skills: string[];
  verified: boolean;
  link: string;
}

interface PortfolioState {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateCertificates: (certificates: Certificate[]) => void;
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
      experiences: [
        {
          id: 1,
          title: "Senior Full Stack Developer",
          company: "TechCorp Solutions",
          location: "San Francisco, CA",
          duration: "2022 - Present",
          description: "Led development of scalable web applications using React, Node.js, and cloud technologies. Managed a team of 5 developers and improved system performance by 40%.",
          technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
          type: "Full-time"
        },
        {
          id: 2,
          title: "Full Stack Developer",
          company: "Digital Innovations Inc",
          location: "New York, NY",
          duration: "2020 - 2022",
          description: "Developed and maintained multiple client projects, implemented CI/CD pipelines, and collaborated with cross-functional teams to deliver high-quality solutions.",
          technologies: ["Vue.js", "Python", "MongoDB", "Firebase", "GCP"],
          type: "Full-time"
        },
        {
          id: 3,
          title: "Frontend Developer",
          company: "StartupXYZ",
          location: "Austin, TX",
          duration: "2019 - 2020",
          description: "Built responsive web applications and mobile-first designs. Worked closely with UX/UI designers to implement pixel-perfect interfaces.",
          technologies: ["JavaScript", "React", "SASS", "Webpack", "Jest"],
          type: "Full-time"
        },
        {
          id: 4,
          title: "Junior Web Developer",
          company: "WebSolutions Agency",
          location: "Remote",
          duration: "2018 - 2019",
          description: "Developed custom WordPress themes and plugins, optimized website performance, and provided technical support to clients.",
          technologies: ["PHP", "WordPress", "MySQL", "jQuery", "CSS3"],
          type: "Contract"
        }
      ],
      projects: [
        {
          id: 1,
          title: "E-Commerce Platform",
          description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
          image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
          liveUrl: "#",
          githubUrl: "#",
          featured: true,
          status: "completed"
        },
        {
          id: 2,
          title: "Task Management App",
          description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
          image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech: ["React", "Socket.io", "MongoDB", "Express"],
          liveUrl: "#",
          githubUrl: "#",
          featured: true,
          status: "completed"
        },
        {
          id: 3,
          title: "AI Dashboard",
          description: "Modern analytics dashboard with AI-powered insights, data visualization, and interactive charts for business intelligence.",
          image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech: ["Next.js", "TypeScript", "Python", "TensorFlow"],
          liveUrl: "#",
          githubUrl: "#",
          featured: false,
          status: "completed"
        },
        {
          id: 4,
          title: "Social Media Platform",
          description: "Full-featured social media platform with real-time messaging, post sharing, and advanced privacy controls.",
          image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech: ["React Native", "Firebase", "Node.js", "GraphQL"],
          liveUrl: "#",
          githubUrl: "#",
          featured: false,
          status: "completed"
        },
        {
          id: 5,
          title: "Cryptocurrency Tracker",
          description: "Real-time cryptocurrency tracking application with portfolio management, price alerts, and market analysis tools.",
          image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech: ["Vue.js", "D3.js", "Node.js", "WebSocket"],
          liveUrl: "#",
          githubUrl: "#",
          featured: false,
          status: "completed"
        },
        {
          id: 6,
          title: "Learning Management System",
          description: "Comprehensive LMS platform with course creation, student progress tracking, and interactive learning modules.",
          image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech: ["React", "Django", "PostgreSQL", "Redis"],
          liveUrl: "#",
          githubUrl: "#",
          featured: false,
          status: "completed"
        }
      ],
      skills: [
        { id: 1, name: "Python", level: 95, category: "Programming", color: "from-blue-400 to-blue-600" },
        { id: 2, name: "JavaScript", level: 88, category: "Programming", color: "from-yellow-400 to-yellow-600" },
        { id: 3, name: "R", level: 85, category: "Programming", color: "from-blue-500 to-indigo-600" },
        { id: 4, name: "SQL", level: 92, category: "Programming", color: "from-green-400 to-green-600" },
        { id: 5, name: "Java", level: 80, category: "Programming", color: "from-red-400 to-red-600" },
        { id: 6, name: "C++", level: 75, category: "Programming", color: "from-purple-400 to-purple-600" },
        { id: 7, name: "NumPy", level: 95, category: "Data Science", color: "from-cyan-400 to-cyan-600" },
        { id: 8, name: "Pandas", level: 95, category: "Data Science", color: "from-indigo-400 to-indigo-600" },
        { id: 9, name: "Matplotlib", level: 90, category: "Data Science", color: "from-orange-400 to-orange-600" },
        { id: 10, name: "Seaborn", level: 88, category: "Data Science", color: "from-teal-400 to-teal-600" },
        { id: 11, name: "Scikit-learn", level: 92, category: "ML/AI", color: "from-pink-400 to-pink-600" },
        { id: 12, name: "TensorFlow", level: 88, category: "ML/AI", color: "from-amber-400 to-amber-600" },
        { id: 13, name: "Machine Learning", level: 90, category: "ML/AI", color: "from-purple-500 to-pink-500" },
        { id: 14, name: "Deep Learning", level: 85, category: "ML/AI", color: "from-violet-400 to-violet-600" },
        { id: 15, name: "NLP", level: 82, category: "ML/AI", color: "from-emerald-400 to-emerald-600" },
        { id: 16, name: "Computer Vision", level: 80, category: "ML/AI", color: "from-rose-400 to-rose-600" },
        { id: 17, name: "Apache Spark", level: 85, category: "Big Data", color: "from-orange-500 to-red-500" },
        { id: 18, name: "Hadoop", level: 78, category: "Big Data", color: "from-yellow-500 to-orange-500" },
        { id: 19, name: "AWS", level: 88, category: "Cloud", color: "from-blue-500 to-cyan-500" },
        { id: 20, name: "GCP", level: 82, category: "Cloud", color: "from-green-500 to-blue-500" },
        { id: 21, name: "Docker", level: 85, category: "DevOps", color: "from-blue-400 to-blue-500" },
        { id: 22, name: "Kubernetes", level: 80, category: "DevOps", color: "from-indigo-400 to-purple-500" },
      ],
      certificates: [
        {
          id: 1,
          title: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "2023",
          credentialId: "AWS-SAA-2023-001",
          image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
          description: "Comprehensive certification covering AWS cloud architecture, security, and best practices.",
          skills: ["Cloud Architecture", "AWS Services", "Security", "Scalability"],
          verified: true,
          link: "#"
        },
        {
          id: 2,
          title: "Google Cloud Professional Developer",
          issuer: "Google Cloud",
          date: "2023",
          credentialId: "GCP-PD-2023-002",
          image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
          description: "Advanced certification in Google Cloud Platform development and deployment strategies.",
          skills: ["GCP Services", "Kubernetes", "DevOps", "Microservices"],
          verified: true,
          link: "#"
        },
        {
          id: 3,
          title: "Meta React Developer Certificate",
          issuer: "Meta (Facebook)",
          date: "2022",
          credentialId: "META-RD-2022-003",
          image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
          description: "Professional certificate program covering advanced React development and modern JavaScript.",
          skills: ["React", "JavaScript", "Redux", "Testing"],
          verified: true,
          link: "#"
        },
        {
          id: 4,
          title: "MongoDB Certified Developer",
          issuer: "MongoDB University",
          date: "2022",
          credentialId: "MDB-DEV-2022-004",
          image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
          description: "Certification in MongoDB database design, development, and optimization techniques.",
          skills: ["MongoDB", "Database Design", "Aggregation", "Performance"],
          verified: true,
          link: "#"
        },
        {
          id: 5,
          title: "Docker Certified Associate",
          issuer: "Docker Inc.",
          date: "2021",
          credentialId: "DCA-2021-005",
          image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=400",
          description: "Professional certification in containerization, orchestration, and Docker best practices.",
          skills: ["Docker", "Containerization", "DevOps", "CI/CD"],
          verified: true,
          link: "#"
        },
        {
          id: 6,
          title: "Certified Kubernetes Administrator",
          issuer: "Cloud Native Computing Foundation",
          date: "2021",
          credentialId: "CKA-2021-006",
          image: "https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&w=400",
          description: "Hands-on certification demonstrating skills in Kubernetes cluster administration.",
          skills: ["Kubernetes", "Container Orchestration", "Cluster Management", "Networking"],
          verified: true,
          link: "#"
        }
      ],
      
      // Actions
      updatePersonalInfo: (info: Partial<PersonalInfo>) => set((state) => ({
        personalInfo: { ...state.personalInfo, ...info }
      })),
      updateExperiences: (experiences: Experience[]) => set({ experiences }),
      updateProjects: (projects: Project[]) => set({ projects }),
      updateSkills: (skills: Skill[]) => set({ skills }),
      updateCertificates: (certificates: Certificate[]) => set({ certificates }),
    }));