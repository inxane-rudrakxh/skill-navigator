import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileCode2 } from "lucide-react";
import SkillTag from "./SkillTag";
import RoadmapCard from "./RoadmapCard";
import ProjectCard from "./ProjectCard";

export interface ResultsData {
  score: number;
  missingSkills: string[];
  roadmap: { title: string; description: string }[];
  projects: { title: string; description: string }[];
}

interface DashboardProps {
  data: ResultsData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Dashboard = ({ data }: DashboardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Skill Match Score */}
      <motion.div variants={itemVariants} className="glass-card p-8 md:p-10 text-center">
        <h2 className="text-lg font-medium text-muted-foreground">Skill Match Score</h2>
        <p className="text-7xl md:text-8xl font-bold my-4 text-primary">{data.score}%</p>
        <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-primary h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${data.score}%` }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.3, 0, 0, 1] }}
          />
        </div>
      </motion.div>

      {/* Missing Skills */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold mb-4 text-foreground">Missing Skills to Learn</h3>
        <div className="flex flex-wrap gap-3">
          {data.missingSkills.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </motion.div>

      {/* Learning Roadmap */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold mb-4 text-foreground">Your AI Learning Roadmap</h3>
        <div className="space-y-4">
          {data.roadmap.map((step, index) => (
            <RoadmapCard key={index} index={index + 1} {...step} />
          ))}
        </div>
      </motion.div>

      {/* Suggested Projects */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold mb-4 text-foreground">Suggested Portfolio Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </motion.div>

      {/* Portfolio Builder CTA */}
      <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center justify-center p-8 md:p-12 glass-card rounded-2xl text-center border-primary/20 bg-primary/5">
        <FileCode2 className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to build your presence?</h3>
        <p className="text-muted-foreground max-w-lg mb-8">
          Use your analysis data to instantly generate a sleek, professional portfolio page that you can share with recruiters.
        </p>
        <motion.button
          onClick={() => navigate("/portfolio-builder")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-glow"
        >
          Generate Portfolio
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
