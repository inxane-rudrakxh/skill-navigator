import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { boxShadow: "0 0 40px -10px hsl(220, 95%, 65%, 0.3)" } : undefined}
      className={cn("glass-card", hover && "glass-card-hover", className)}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
