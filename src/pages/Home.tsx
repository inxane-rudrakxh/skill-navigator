import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { motion } from "framer-motion";
import { Target, Bot, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Target className="text-primary w-6 h-6" />,
    title: "Skill Gap Detection",
    description:
      "Our AI compares your skills against thousands of job descriptions to pinpoint exactly what you're missing.",
  },
  {
    icon: <Bot className="text-primary w-6 h-6" />,
    title: "AI Learning Roadmap",
    description:
      "Receive a step-by-step, personalized learning plan to acquire the skills you need, from fundamentals to advanced topics.",
  },
  {
    icon: <BookOpen className="text-primary w-6 h-6" />,
    title: "Portfolio Project Suggestions",
    description:
      "Get tailored project ideas that demonstrate your new skills to potential employers and help you build a strong portfolio.",
  },
];

const Home = () => {
  return (
    <div>
      <HeroSection />
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Three simple steps to your personalized career development plan.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
