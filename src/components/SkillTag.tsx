import { motion } from "framer-motion";

interface SkillTagProps {
  skill: string;
}

const SkillTag = ({ skill }: SkillTagProps) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: "0 0 20px -5px hsl(220, 95%, 65%, 0.3)" }}
    className="glass-card px-4 py-2 text-sm font-medium text-foreground cursor-default"
  >
    {skill}
  </motion.div>
);

export default SkillTag;
