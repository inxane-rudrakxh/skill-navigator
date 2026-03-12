import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Linkedin, Briefcase, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      
      // Smart: Strip the base URL so the user only sees their username
      let ln = profile.linkedin_url || "";
      ln = ln.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, "").replace(/\/$/i, "");
      setLinkedinUrl(ln);
      
      setTargetRole(profile.target_role || "");
    }
  }, [profile]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  const handleSave = async () => {
    setSaving(true);
    try {
      // Re-construct the full LinkedIn URL if they just entered a username
      let finalLinkedinUrl = linkedinUrl.trim();
      if (finalLinkedinUrl && !finalLinkedinUrl.startsWith("http")) {
        finalLinkedinUrl = `https://linkedin.com/in/${finalLinkedinUrl.replace(/^\//, "")}`;
      }

      await updateDoc(doc(db, "profiles", user.uid), {
        full_name: fullName,
        linkedin_url: finalLinkedinUrl,
        target_role: targetRole,
        updated_at: serverTimestamp(),
      });
      await refreshProfile();
      toast({ title: "Profile updated!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="container mx-auto max-w-2xl px-6 py-32 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter gradient-text mb-8 text-center">
          Your Profile
        </h1>

        <div className="glass-card p-8 md:p-10 space-y-6">
          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={user.email || ""}
              className="glass-input opacity-60 cursor-not-allowed"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="glass-input"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" /> LinkedIn Profile
            </label>
            <div className="flex bg-background/50 border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <span className="flex items-center px-4 bg-muted/30 text-muted-foreground border-r border-border text-sm select-none">
                linkedin.com/in/
              </span>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground text-sm"
                placeholder="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Target Career Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="glass-input"
            >
              <option value="">Select a role...</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Scientist</option>
              <option>AI Engineer</option>
              <option>Product Manager</option>
            </select>
          </div>

          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Profile"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
