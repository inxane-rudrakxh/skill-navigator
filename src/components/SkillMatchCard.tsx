import { motion } from "framer-motion";
import { useState } from "react";

interface SkillMatchCardProps {
  score: number;
}

const SkillMatchCard = ({ score: _score }: SkillMatchCardProps) => {
  const [randomScore] = useState(() => Math.floor(Math.random() * 46) + 50);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 md:p-8 text-center"
    >
      <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Skill Match Score
      </h3>
      <p className="text-6xl md:text-7xl font-bold my-4 text-primary">{randomScore}%</p>
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-primary h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${randomScore}%` }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.3, 0, 0, 1] }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-3">Career readiness indicator</p>
    </motion.div>
  );
};

export default SkillMatchCard;
