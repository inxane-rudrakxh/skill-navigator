import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  difficulty?: string;
}

interface ProjectSuggestionsProps {
  projects: Project[];
}

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ProjectSuggestions = ({ projects }: ProjectSuggestionsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <h3 className="text-xl font-bold mb-4 text-foreground">Suggested Portfolio Projects</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <GlassCard key={i} className="group flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg text-foreground">{project.title}</h4>
              {project.difficulty && (
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    difficultyColor[project.difficulty] ?? "bg-secondary text-muted-foreground border-border"
                  }`}
                >
                  {project.difficulty}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-primary">
            View Details
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </GlassCard>
      ))}
    </div>
  </motion.div>
);

export default ProjectSuggestions;
