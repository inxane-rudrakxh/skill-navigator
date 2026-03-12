import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FormData {
  fullName: string;
  targetRole: string;
  currentSkills: string;
  linkedinUrl: string;
}

interface SkillFormProps {
  onAnalyze: (data: FormData) => void;
}

const SkillForm = ({ onAnalyze }: SkillFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    targetRole: "",
    currentSkills: "",
    linkedinUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Skill Analyzer
          </h2>
          <p className="mt-2 text-muted-foreground">
            Enter your details to generate your personalized roadmap.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="glass-input"
              placeholder="e.g., Ada Lovelace"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="targetRole" className="text-sm font-medium text-muted-foreground">
              Target Job Role
            </label>
            <select
              id="targetRole"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              className="glass-input"
              required
            >
              <option value="" disabled>
                Select a role...
              </option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Scientist</option>
              <option>AI Engineer</option>
              <option>Product Manager</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="currentSkills" className="text-sm font-medium text-muted-foreground">
              Current Skills (comma-separated)
            </label>
            <textarea
              id="currentSkills"
              name="currentSkills"
              value={formData.currentSkills}
              onChange={handleChange}
              className="glass-input min-h-[100px] resize-none"
              placeholder="e.g., HTML, CSS, JavaScript, Python"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="linkedinUrl" className="text-sm font-medium text-muted-foreground">
              LinkedIn Profile URL (optional)
            </label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="glass-input"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(220, 95%, 65%)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full group flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-4 rounded-lg transition-all duration-300"
        >
          Analyze My Skills
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SkillForm;
