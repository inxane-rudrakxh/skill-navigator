import { motion } from "framer-motion";
import RoadmapCard from "./RoadmapCard";

interface RoadmapSectionProps {
  roadmap: { title: string; description: string }[];
}

const RoadmapSection = ({ roadmap }: RoadmapSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h3 className="text-xl font-bold mb-4 text-foreground">Your Learning Roadmap</h3>
    <div className="space-y-4">
      {roadmap.map((step, i) => (
        <RoadmapCard key={i} index={i + 1} {...step} />
      ))}
    </div>
  </motion.div>
);

export default RoadmapSection;
