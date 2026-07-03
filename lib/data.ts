export type SkillCategory = "frontend" | "backend" | "mobile" | "database" | "devops" | "design";

export interface ProjectData {
  id: string;
  tech: string[];
  github: string;
  live: string;
  category: "frontend" | "backend" | "fullstack";
  color: string;
}

export interface SkillData {
  name: string;
  level: number;
  category: SkillCategory;
  color: string;
}

export interface ExperienceData {
  index: number;
  tech: string[];
}

export const projects: ProjectData[] = [
  {
    id: "flex_transport",
    tech: ["React", "Angular", ".NET Core", "Google Maps API", "SQL Server", "Azure DevOps"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "teleseminar",
    tech: [".NET 8", "Blazor", "React", "Next.js", "TypeScript", "SQL Server"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "smtp_erp",
    tech: [".NET Core", "Angular", "TypeScript", "SQL Server", "Azure DevOps"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "aei_gpao",
    tech: [".NET Core", "Angular", "TypeScript", "SQL Server", "Azure DevOps"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "job_matching",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-orange-500 to-amber-600",
  },
];

export const skillsList: SkillData[] = [
  // Backend
  { name: ".NET Core / .NET 8", level: 92, category: "backend", color: "#512BD4" },
  { name: "C#", level: 90, category: "backend", color: "#9B59B6" },
  { name: "PHP / Laravel", level: 78, category: "backend", color: "#777BB3" },
  { name: "Java", level: 62, category: "backend", color: "#F89820" },
  // Frontend
  { name: "Angular", level: 90, category: "frontend", color: "#DD0031" },
  { name: "React / Next.js", level: 88, category: "frontend", color: "#61DAFB" },
  { name: "Blazor", level: 76, category: "frontend", color: "#512BD4" },
  { name: "TypeScript", level: 87, category: "frontend", color: "#3178C6" },
  { name: "JavaScript", level: 85, category: "frontend", color: "#F7DF1E" },
  // Mobile
  { name: "Android (Java)", level: 70, category: "mobile", color: "#3DDC84" },
  { name: "Xamarin", level: 65, category: "mobile", color: "#3498DB" },
  { name: "Ionic", level: 65, category: "mobile", color: "#3880FF" },
  // Database
  { name: "SQL Server", level: 88, category: "database", color: "#CC2927" },
  { name: "MySQL", level: 82, category: "database", color: "#00618A" },
  { name: "Firebase", level: 68, category: "database", color: "#FFCA28" },
  // DevOps
  { name: "Azure DevOps", level: 76, category: "devops", color: "#0089D6" },
  { name: "Git / GitHub", level: 85, category: "devops", color: "#F05032" },
  { name: "Docker", level: 68, category: "devops", color: "#2496ED" },
  // Design
  { name: "Figma", level: 76, category: "design", color: "#F24E1E" },
  { name: "Adobe XD", level: 70, category: "design", color: "#FF61F6" },
];

export const experienceList: ExperienceData[] = [
  { index: 0, tech: [".NET 8", "Blazor", "React", "Next.js", "TypeScript", "SQL Server"] },
  { index: 1, tech: [".NET Core", "Angular", "React", "TypeScript", "SQL Server", "Azure DevOps", "Google Maps API"] },
  { index: 2, tech: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML/CSS"] },
  { index: 3, tech: ["C#", ".NET", "SQL Server", "HTML/CSS", "JavaScript"] },
  { index: 4, tech: ["PHP", "JavaScript", "HTML/CSS", "MySQL"] },
  { index: 5, tech: ["WordPress", "HTML/CSS", "JavaScript", "SEO"] },
  { index: 6, tech: ["Java", "Android SDK", "SQLite"] },
];
