import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, Linkedin, LogOut, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { db, auth } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";

const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "AI Engineer",
  "Product Manager",
];

const Settings = () => {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setEmail(profile.email ?? "");
      setTargetRole(profile.target_role ?? "");
      setLinkedinUrl(profile.linkedin_url ?? "");
    }
  }, [profile]);

  if (!loading && !user) return <Navigate to="/login" />;

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "profiles", user.uid), {
        full_name: fullName,
        email,
        target_role: targetRole,
        linkedin_url: linkedinUrl,
        updated_at: serverTimestamp(),
      });
      await refreshProfile();
      toast({ title: "Saved", description: "Profile updated successfully." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) return;
    try {
      // Re-authenticate before changing password
      if (currentPassword) {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
      }
      await updatePassword(currentUser, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      toast({ title: "Updated", description: "Password changed successfully." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Password update failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-3xl px-6 py-28 md:py-36 space-y-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter gradient-text">Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your profile and account</p>
      </div>

      {/* Profile Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 space-y-5">
        <h2 className="text-lg font-bold text-foreground">Profile Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
            <input className="glass-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <input className="glass-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Target Career Role</label>
            <select
              className="glass-input"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              <option value="">Select a role</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </motion.div>

      {/* LinkedIn Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:p-8 space-y-5">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Linkedin className="w-5 h-5 text-primary" /> LinkedIn Profile
        </h2>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">LinkedIn Profile URL</label>
          <input
            className="glass-input"
            placeholder="linkedin.com/in/username"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
        </div>
        {linkedinUrl && (
          <p className="text-xs text-muted-foreground">
            Preview:{" "}
            <a
              href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {linkedinUrl}
            </a>
          </p>
        )}
        <button
          onClick={saveProfile}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save LinkedIn
        </button>
      </motion.div>

      {/* Account Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 md:p-8 space-y-5">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-accent" /> Account Settings
        </h2>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Current Password</label>
          <input
            type="password"
            className="glass-input"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">New Password</label>
          <input
            type="password"
            className="glass-input"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleUpdatePassword}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            Update Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-medium text-sm hover:bg-destructive/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
