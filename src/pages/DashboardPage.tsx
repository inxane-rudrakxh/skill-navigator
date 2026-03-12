import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserProfileCard from "@/components/UserProfileCard";
import SkillMatchCard from "@/components/SkillMatchCard";
import MissingSkills from "@/components/MissingSkills";
import RoadmapSection from "@/components/RoadmapSection";
import ProjectSuggestions from "@/components/ProjectSuggestions";
import type { ResultsData } from "@/components/Dashboard";

interface DashboardPageProps {
  data: ResultsData | null;
}

const DEFAULT_DATA: ResultsData = {
  score: 40,
  missingSkills: ["JavaScript", "React", "Git", "Testing", "TypeScript", "CI/CD", "REST APIs"],
  roadmap: [
    { title: "Learn JavaScript Fundamentals", description: "Master core JavaScript concepts including ES6+, async/await, and closures." },
    { title: "Practice DOM Manipulation", description: "Build interactive web pages by understanding the Document Object Model." },
    { title: "Learn React", description: "Dive into component-based architecture, hooks, state management, and routing." },
    { title: "Build Real-World Projects", description: "Apply your skills by building portfolio-ready applications." },
  ],
  projects: [
    { title: "Weather App", description: "Build a weather dashboard that fetches real-time data from APIs with search and location features." },
    { title: "Task Manager", description: "Create a full-featured task management app with CRUD operations, filters, and local storage." },
    { title: "E-commerce UI", description: "Design and build a product listing page with cart functionality and responsive layout." },
  ],
};

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const DashboardPage = ({ data }: DashboardPageProps) => {
  const { user, loading } = useAuth();

  if (!loading && !user) return <Navigate to="/login" />;

  const d = data ?? DEFAULT_DATA;
  const projects = d.projects.map((p, i) => ({
    ...p,
    difficulty: DIFFICULTIES[i % DIFFICULTIES.length],
  }));

  return (
    <div className="container mx-auto max-w-6xl px-6 py-28 md:py-36 space-y-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter gradient-text">
          Your Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your personalized career readiness overview
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <UserProfileCard />
        <div className="lg:col-span-2">
          <SkillMatchCard score={d.score} />
        </div>
      </div>

      <MissingSkills skills={d.missingSkills} />
      <RoadmapSection roadmap={d.roadmap} />
      <ProjectSuggestions projects={projects} />
    </div>
  );
};

export default DashboardPage;
