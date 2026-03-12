import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartAnalysis = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Mouse parallax state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transformations using useTransform
  const translateX1 = useTransform(springX, [-1, 1], [-50, 50]);
  const translateY1 = useTransform(springY, [-1, 1], [-50, 50]);
  
  const translateX2 = useTransform(springX, [-1, 1], [50, -50]);
  const translateY2 = useTransform(springY, [-1, 1], [50, -50]);
  
  const translateX3 = useTransform(springX, [-1, 1], [-20, 20]);
  const translateY3 = useTransform(springY, [-1, 1], [-20, 20]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 overflow-hidden">
      {/* Animated background blobs with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-blob" 
          style={{ translateX: translateX1, translateY: translateY1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" 
          style={{ translateX: translateX2, translateY: translateY2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-3xl animate-blob animation-delay-4000" 
          style={{ translateX: translateX3, translateY: translateY3 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.3, 0, 0, 1] }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 text-sm text-muted-foreground"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Powered by Artificial Intelligence</span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter gradient-text leading-[1.05] [text-wrap:balance]">
          Find Your Future,
          <br />
          Faster.
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-muted-foreground [text-wrap:pretty]">
          Analyze your skills, detect missing abilities, and receive a
          personalized career roadmap powered by AI.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
              onClick={handleStartAnalysis}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px -5px hsl(220, 95%, 65%)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Start Skill Analysis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
