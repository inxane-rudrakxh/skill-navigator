import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center w-full"
    >
      <div className="glass-card p-12 md:p-16 text-center max-w-md w-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-6 w-fit"
        >
          <Loader2 className="text-primary w-12 h-12" />
        </motion.div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Analyzing your skills...
        </h2>
        <p className="mt-3 text-muted-foreground">
          Our AI is crafting your personalized career plan.
        </p>
        <div className="mt-6 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
