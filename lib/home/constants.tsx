import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Cpu, Database, Layers } from "lucide-react";
import React from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  metrics?: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Software Engineer L-1",
    company: "Vivasoft Limited",
    period: "2024 – Present",
    description: [
      "Architecting scalable frontend solutions for enterprise clients using Next.js and TypeScript.",
      "Leading performance optimization initiatives, improving Lighthouse scores by 40%+ on average.",
      "Mentoring junior developers and establishing internal coding standards.",
    ],
  },
  {
    id: "exp-2",
    role: "Senior Freelance Developer",
    company: "Self-Employed",
    period: "2021 – 2024",
    description: [
      "Delivered 60+ production-ready projects across fintech, health, and SaaS sectors.",
      "Specialized in real-time applications using WebRTC and Socket.io.",
      "Managed end-to-end development lifecycle from architecture to deployment.",
    ],
  },
  {
    id: "exp-3",
    role: "React Developer",
    company: "Shunno IT",
    period: "2021",
    description: [
      "Developed responsive UI components and integrated RESTful APIs.",
      "Collaborated with design teams to implement pixel-perfect interfaces.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Financfy",
    description:
      "A high-security finance platform featuring 2FA, role-based access control, and advanced data grids for real-time transaction monitoring.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    metrics: "2FA Secured",
  },
  {
    id: "proj-2",
    title: "Wellteam",
    description:
      "Performance-optimized fitness application with video streaming capabilities and complex state management for workout tracking.",
    tags: ["React", "Redux Toolkit", "WebRTC", "Tailwind"],
    metrics: "Lighthouse 97",
  },
  {
    id: "proj-3",
    title: "Career Crawler",
    description:
      "Automated job aggregation engine with real-time data scraping and intelligent filtering algorithms.",
    tags: ["Node.js", "Cheerio", "React", "MongoDB"],
  },
  {
    id: "proj-4",
    title: "WebRTC Video Suite",
    description:
      "Browser-based video conferencing solution with screen sharing, chat, and recording capabilities.",
    tags: ["WebRTC", "Socket.io", "Express", "React"],
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend Core",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
    ],
  },
  {
    title: "Animation & 3D",
    icon: <Layers className="w-5 h-5" />,
    skills: ["GSAP", "Three.js", "Rive", "WebGL", "Framer Motion"],
  },
  {
    title: "Real-time & Backend",
    icon: <Database className="w-5 h-5" />,
    skills: [
      "Node.js",
      "NestJS",
      "Socket.io",
      "WebRTC",
      "PostgreSQL",
      "Prisma",
    ],
  },
  {
    title: "Engineering",
    icon: <Cpu className="w-5 h-5" />,
    skills: [
      "Performance Optimization",
      "SEO",
      "Docker",
      "CI/CD",
      "System Design",
    ],
  },
];
