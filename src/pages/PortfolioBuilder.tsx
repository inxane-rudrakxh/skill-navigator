import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Download, 
  Linkedin, 
  Mail, 
  User, 
  Briefcase, 
  MessageSquare, 
  Code2, 
  Copy, 
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ResultsData } from "@/components/Dashboard";

interface PortfolioBuilderProps {
  data: ResultsData | null;
}

const PortfolioBuilder = ({ data }: PortfolioBuilderProps) => {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  
  const [copied, setCopied] = useState(false);
  const [bio, setBio] = useState(
    `I am a passionate ${profile?.target_role || "developer"} constantly learning new skills and pushing the boundaries of what's possible.`
  );
  
  if (loading) return null;
  if (!user || !profile) return <Navigate to="/login" />;

  // Default skills & projects from data if available, else placeholders
  const heroName = profile.full_name || "Your Name";
  const heroRole = profile.target_role || "Software Engineer";
  const email = profile.email || "hello@example.com";
  const linkedin = profile.linkedin_url || "https://linkedin.com/in/username";
  
  const missingSkills = data?.missingSkills || ["React", "TypeScript", "Tailwind CSS"];
  const allSkills = ["JavaScript", "HTML/CSS", "Git", ...missingSkills.slice(0, 3)];
  
  const projects = data?.projects || [
    { title: "Portfolio Website", description: "My robust personal site built with React." },
    { title: "Task App", description: "Interactive task manager demonstrating full-stack skills." }
  ];

  // The actual HTML + Tailwind that we generate
  const generatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${heroName} - ${heroRole}</title>
    <!-- Tailwind CSS (CDN for simplicity in exporting) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0f172a; color: #f8fafc; }
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
    </style>
</head>
<body class="antialiased min-h-screen">
    
    <header class="py-20 px-6 max-w-4xl mx-auto text-center">
        <div class="inline-block p-4 rounded-full glass mb-6">
            <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </div>
        <h1 class="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">${heroName}</h1>
        <p class="text-2xl text-slate-400 mb-8">${heroRole}</p>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">${bio}</p>
        
        <div class="mt-10 flex justify-center gap-4">
            <a href="mailto:${email}" class="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors text-white">
                Contact Me
            </a>
            ${linkedin ? `<a href="${linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}" target="_blank" class="flex items-center gap-2 px-6 py-3 glass hover:bg-white/10 rounded-full font-semibold transition-colors">
                LinkedIn
            </a>` : ''}
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-6 pb-24">
        <section class="mb-20">
            <h2 class="text-3xl font-bold mb-8 text-center">Core Skills</h2>
            <div class="flex flex-wrap justify-center gap-3">
                ${allSkills.map(s => `<span class="px-5 py-2 glass rounded-full text-slate-200 border-blue-500/30">${s}</span>`).join('')}
            </div>
        </section>

        <section>
            <h2 class="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div class="grid md:grid-cols-2 gap-6">
                ${projects.map(p => `
                <div class="glass p-8 rounded-2xl hover:bg-white/5 transition-colors">
                    <h3 class="text-xl font-bold mb-3 text-emerald-400">${p.title}</h3>
                    <p class="text-slate-400 leading-relaxed">${p.description}</p>
                </div>
                `).join('')}
            </div>
        </section>
    </main>
    
    <footer class="text-center py-8 text-slate-500 border-t border-white/10">
        <p>&copy; ${new Date().getFullYear()} ${heroName}. Built with SkillGap AI.</p>
    </footer>

</body>
</html>`;

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    toast({ title: "Copied!", description: "HTML code copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "Your portfolio.html file is ready." });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 xl:px-8 py-24 md:py-32">
      <div className="mb-10 text-center md:text-left">
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter gradient-text">Portfolio Builder</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Instantly generate a tailored, single-page professional portfolio based on your profile and analysis results. You can customize the content and download the raw HTML code for free hosting (like GitHub Pages or Vercel).
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Editor Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profile Basics
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Name</label>
                <div className="text-foreground font-semibold px-4 py-2 bg-muted/20 rounded-lg">{heroName}</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Target Role</label>
                <div className="text-foreground font-semibold px-4 py-2 bg-muted/20 rounded-lg">{heroRole}</div>
              </div>
            </div>
            
            <hr className="border-border" />
            
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Personal Bio
            </h2>
            <textarea
              className="glass-input min-h-[120px] resize-y"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short summary about yourself..."
            />
          </div>

          <div className="glass-card p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" /> Export Your Code
            </h2>
            <p className="text-sm text-muted-foreground">
              Your generated portfolio uses purely vanilla HTML and Tailwind CSS. It is ready to upload directly to any hosting platform instantly.
            </p>
            <div className="flex gap-3 mt-2">
              <motion.button
                onClick={handleCopyHtml}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 py-3 rounded-lg font-medium transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Code"}
              </motion.button>
              <motion.button
                onClick={downloadHtml}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium transition-colors shadow-glow"
              >
                <Download className="w-4 h-4" /> Download
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Side: Live HTML Preview Frame */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between bg-muted/50 rounded-t-xl px-4 py-3 border border-border border-b-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Live Preview</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
          </div>
          <div className="glass-card rounded-t-none border-t-0 p-1 bg-black/50 overflow-hidden h-[800px] flex">
            {/* We render the HTML string directly inside an iframe to show exactly what they'll get */}
            <iframe 
              title="portfolio-preview"
              srcDoc={generatedHtml}
              className="w-full h-full bg-white rounded-lg border-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortfolioBuilder;
