export type SkillCategory = "backend" | "frontend" | "database" | "devops" | "architecture";

export interface ProjectData {
  id: string;
  /**
   * Screenshot shown at the top of the card, as a path under `public/`
   * (e.g. "/projects/flex-transport.png"). Leave it out and the card renders
   * without an image rather than with an empty frame.
   */
  image?: string;
  /** Number of "my role" bullets, read as `<id>_role1…roleN` from the translations. */
  roles: number;
  tech: string[];
  github: string;
  live: string;
  category: "frontend" | "backend" | "fullstack";
  color: string;
}

export interface SkillData {
  name: string;
  category: SkillCategory;
  color: string;
}

export interface ExperienceData {
  index: number;
  /** Number of bullets, read as `exp<index>_bullet1…bulletN` from the translations. */
  bullets: number;
  tech: string[];
}

export const projects: ProjectData[] = [
  {
    id: "teleseminar",
    roles: 6,
    tech: [".NET 8", "C#", "Clean Architecture", "CQRS", "Angular", "React", "Next.js", "Blazor", "TypeScript", "SQL Server", "Azure"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "flex_transport",
    roles: 5,
    tech: ["React", "Angular", ".NET Core", "Google Maps API", "SQL Server", "Azure DevOps"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "smtp_erp",
    roles: 5,
    tech: [".NET Core", "Angular", "TypeScript", "SQL Server", "Azure DevOps"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "aei_gpao",
    roles: 5,
    tech: [".NET Core", "Angular", "TypeScript", "SQL Server", "Azure DevOps"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "job_matching",
    roles: 5,
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
    color: "from-orange-500 to-amber-600",
  },
];

export interface BuildArea {
  icon: string;
  /** Stack shown under the title — proper nouns, so not translated. */
  stack: string[];
}

/** "What I build" cards; titles come from the translations as `wb<n>_title`. */
export const buildAreas: BuildArea[] = [
  { icon: "🧩", stack: ["ERP", "CRM", "WMS", "TMS"] },
  { icon: "⚙️", stack: [".NET", "ASP.NET Core", "REST API", "SQL Server"] },
  { icon: "🎨", stack: ["Angular", "React", "Next.js", "Blazor"] },
  { icon: "☁️", stack: ["Azure", "Azure DevOps", "Docker", "CI/CD"] },
  { icon: "🏗️", stack: ["Clean Architecture", "CQRS", "SOLID", "Microservices"] },
];

/** Roles being targeted — industry titles, identical in every language. */
export const targetRoles: string[] = [
  "Full Stack .NET",
  "Senior .NET Developer",
  "Lead Developer",
  "Software Engineer",
  "Remote / International",
];

export const skillsList: SkillData[] = [
  // Backend
  { name: "C#", category: "backend", color: "#9B59B6" },
  { name: "ASP.NET Core", category: "backend", color: "#512BD4" },
  { name: ".NET 8 / .NET 10", category: "backend", color: "#512BD4" },
  { name: "Web API", category: "backend", color: "#6C5CE7" },
  { name: "EF Core", category: "backend", color: "#8E44AD" },
  { name: "CQRS", category: "backend", color: "#7D5FFF" },
  { name: "Clean Architecture", category: "backend", color: "#A55EEA" },
  // Frontend
  { name: "Angular", category: "frontend", color: "#DD0031" },
  { name: "React", category: "frontend", color: "#61DAFB" },
  { name: "Next.js", category: "frontend", color: "#E4E4E7" },
  { name: "Blazor", category: "frontend", color: "#512BD4" },
  { name: "TypeScript", category: "frontend", color: "#3178C6" },
  // Database
  { name: "SQL Server", category: "database", color: "#CC2927" },
  { name: "MySQL", category: "database", color: "#00618A" },
  { name: "Entity Framework Core", category: "database", color: "#8E44AD" },
  // Cloud & DevOps
  { name: "Azure", category: "devops", color: "#0089D6" },
  { name: "Azure DevOps", category: "devops", color: "#0078D4" },
  { name: "Docker", category: "devops", color: "#2496ED" },
  { name: "GitHub", category: "devops", color: "#F05032" },
  // Architecture
  { name: "Clean Architecture", category: "architecture", color: "#A55EEA" },
  { name: "Microservices", category: "architecture", color: "#00B894" },
  { name: "REST API", category: "architecture", color: "#0984E3" },
  { name: "CQRS", category: "architecture", color: "#7D5FFF" },
  { name: "SOLID", category: "architecture", color: "#FDCB6E" },
];

export interface ArchitectureLayer {
  /** Layer name — a proper noun, so it is not translated. */
  name: string;
  color: string;
}

/** Request path through a Clean Architecture service, from the UI down to storage. */
export const architectureLayers: ArchitectureLayer[] = [
  { name: "Frontend", color: "#61DAFB" },
  { name: "REST API", color: "#0984E3" },
  { name: "ASP.NET Core", color: "#512BD4" },
  { name: "Application / CQRS", color: "#7D5FFF" },
  { name: "Domain", color: "#A55EEA" },
  { name: "Infrastructure", color: "#00B894" },
  { name: "SQL Server", color: "#CC2927" },
];

/** Cross-cutting practices shown alongside the diagram. */
export const architecturePractices: string[] = [
  "Clean Architecture",
  "CQRS",
  "SOLID",
  "Dependency Injection",
  "EF Core",
  "REST API",
];

export const experienceList: ExperienceData[] = [
  { index: 0, bullets: 5, tech: [".NET 8", "Blazor", "React", "Next.js", "TypeScript", "SQL Server"] },
  { index: 1, bullets: 5, tech: [".NET Core", "Angular", "React", "TypeScript", "SQL Server", "Azure DevOps", "Google Maps API"] },
  { index: 2, bullets: 4, tech: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML/CSS"] },
  { index: 5, bullets: 4, tech: ["WordPress", "HTML/CSS", "JavaScript", "SEO"] },
  { index: 3, bullets: 3, tech: ["C#", ".NET", "SQL Server", "HTML/CSS", "JavaScript"] },
  { index: 4, bullets: 4, tech: ["PHP", "JavaScript", "HTML/CSS", "MySQL"] },
  { index: 6, bullets: 4, tech: ["Java", "Android SDK", "SQLite"] },
];
