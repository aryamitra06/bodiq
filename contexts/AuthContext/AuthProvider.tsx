import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { account } from "@/lib/appwrite";
import { OAuthProvider } from "react-native-appwrite";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Helper: Save JWT persistently
  const saveAuthData = async (jwt: string, user: any) => {
    await AsyncStorage.setItem("jwt", jwt);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setJwt(jwt);
    setUser(user);
  };

  // 🧠 Helper: Clear JWT + user data
  const clearAuthData = async () => {
    await AsyncStorage.removeItem("jwt");
    await AsyncStorage.removeItem("user");
    setJwt(null);
    setUser(null);
  };

  // ✅ On app startup — check for valid session
  useEffect(() => {
    const checkUser = async () => {
      try {
        // try to get an active Appwrite session
        const session = await account.getSession("current");
        if (session) {
          // get new JWT token for RTK Query use
          const jwtResponse = await account.createJWT();
          const currentUser = await account.get();

          await saveAuthData(jwtResponse.jwt, currentUser);
        } else {
          await clearAuthData();
        }
      } catch (err) {
        await clearAuthData();
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // ✅ Google OAuth Login Flow
  const googleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);

      const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
      const scheme = `${deepLink.protocol}//`;

      const loginUrl = await account.createOAuth2Token(
        OAuthProvider.Google as any,
        `${deepLink}`,
        `${deepLink}`
      );

      const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

      if (result.type !== "success" || !result.url) {
        throw new Error("OAuth flow canceled or failed");
      }

      const returned = new URL(result.url);
      const secret = returned.searchParams.get("secret");
      const userId = returned.searchParams.get("userId");

      if (!secret || !userId) throw new Error("Missing OAuth credentials");

      // Create Appwrite session
      await account.createSession(userId, secret);

      // Fetch user info and JWT
      const currentUser = await account.get();
      const jwtResponse = await account.createJWT();

      // Save both persistently
      await saveAuthData(jwtResponse.jwt, currentUser);
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      setError(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout and clear data
  const logout = async () => {
    try {
      setError(null);
      await account.deleteSession("current");
      await clearAuthData();
    } catch (err: any) {
      setError(err?.message || "Logout failed");
    }
  };

  // ♻️ JWT Auto-Refresh (every 10 minutes)
  useEffect(() => {
    let interval: any;
    if (user) {
      interval = setInterval(async () => {
        try {
          const jwtResponse = await account.createJWT();
          setJwt(jwtResponse.jwt);
          await AsyncStorage.setItem("jwt", jwtResponse.jwt);
        } catch (err) {
          console.warn("JWT refresh failed:", err);
        }
      }, 10 * 60 * 1000); // refresh every 10 min
    }
    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        loading,
        error,
        googleSignIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};