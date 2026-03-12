import { motion } from "framer-motion";
import { User, Mail, Linkedin, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const UserProfileCard = () => {
  const { profile } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-foreground truncate">
            {profile?.full_name || "User"}
          </h2>
          <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5 mt-1">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            {profile?.email || "—"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-muted-foreground">Target Role:</span>
          <span className="font-medium text-foreground">
            {profile?.target_role || "Not set"}
          </span>
        </div>
        {profile?.linkedin_url && (
          <a
            href={
              profile.linkedin_url.startsWith("http")
                ? profile.linkedin_url
                : `https://${profile.linkedin_url}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Linkedin className="w-4 h-4 flex-shrink-0" />
            {profile.linkedin_url}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
