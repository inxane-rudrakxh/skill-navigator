import { motion } from "framer-motion";
import SkillTag from "./SkillTag";

interface MissingSkillsProps {
  skills: string[];
}

const MissingSkills = ({ skills }: MissingSkillsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <h3 className="text-xl font-bold mb-4 text-foreground">Missing Skills to Learn</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <SkillTag key={skill} skill={skill} />
      ))}
    </div>
  </motion.div>
);

export default MissingSkills;
