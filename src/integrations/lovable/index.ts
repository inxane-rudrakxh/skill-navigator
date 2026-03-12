// Lovable integration - updated to use Firebase Google Auth
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/client";

type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const lovable = {
  auth: {
    signInWithOAuth: async (_provider: "google" | "apple", _opts?: SignInOptions) => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user, error: null, redirected: false };
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)), redirected: false };
      }
    },
  },
};
