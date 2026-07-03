import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/integrations/firebase/client";

interface Profile {
  full_name: string | null;
  email: string | null;
  linkedin_url: string | null;
  target_role: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const MOCK_USER_KEY = "skillgap_mock_user";
const MOCK_PROFILE_KEY = "skillgap_mock_profile";
const MOCK_LOGGED_OUT_KEY = "skillgap_mock_logged_out";

const getStoredMockUser = () => {
  if (localStorage.getItem(MOCK_LOGGED_OUT_KEY) === "true") return null;
  const stored = localStorage.getItem(MOCK_USER_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return {
    uid: "demo-user-123",
    email: "demo@skillgap.ai",
    displayName: "Demo User",
  };
};

const getStoredMockProfile = () => {
  if (localStorage.getItem(MOCK_LOGGED_OUT_KEY) === "true") return null;
  const stored = localStorage.getItem(MOCK_PROFILE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return {
    full_name: "Demo User",
    email: "demo@skillgap.ai",
    linkedin_url: "linkedin.com/in/demouser",
    target_role: "AI Engineer",
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    try {
      const docRef = doc(db, "profiles", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          full_name: data.full_name ?? null,
          email: data.email ?? null,
          linkedin_url: data.linkedin_url ?? null,
          target_role: data.target_role ?? null,
        });
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (!isFirebaseConfigured) {
      setUser(getStoredMockUser());
      setProfile(getStoredMockProfile());
    } else {
      if (user) await fetchProfile(user.uid);
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setUser(getStoredMockUser());
      setProfile(getStoredMockProfile());
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    if (!isFirebaseConfigured) {
      localStorage.setItem(MOCK_LOGGED_OUT_KEY, "true");
      localStorage.removeItem(MOCK_USER_KEY);
      localStorage.removeItem(MOCK_PROFILE_KEY);
      setUser(null);
      setProfile(null);
    } else {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
