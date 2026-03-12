import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillForm from "@/components/SkillForm";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import type { ResultsData } from "@/components/Dashboard";
import { analyzeSkillsWithGemini } from "@/integrations/gemini/gemini";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  fullName: string;
  targetRole: string;
  currentSkills: string;
  linkedinUrl: string;
}

interface AnalyzerProps {
  setResultsData: (data: ResultsData) => void;
}

const Analyzer = ({ setResultsData }: AnalyzerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnalyze = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const results = await analyzeSkillsWithGemini(formData);
      setResultsData(results);
      navigate("/results");
    } catch (err: unknown) {
      console.error("Gemini analysis error:", err);
      const message =
        err instanceof Error ? err.message : "AI analysis failed. Please try again.";
      toast({
        title: "Analysis Failed",
        description: message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 py-32 md:py-40 min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <SkillForm key="form" onAnalyze={handleAnalyze} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analyzer;
