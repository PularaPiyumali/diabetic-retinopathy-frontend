"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
};

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   // Check if user is logged in on initial load
  //   const storedUser = localStorage.getItem("user")
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser))
  //   }
  //   setIsLoading(false)
  // }, [])

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        email,
        name: email.split("@")[0], // Just for demo
        isLoggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Dispatch a storage event to notify other tabs/components
      window.dispatchEvent(new Event("storage"));

      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call to register
      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        name,
        email,
        isLoggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      // Dispatch a storage event to notify other tabs/components
      window.dispatchEvent(new Event("storage"));
      return userData;
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // Dispatch a storage event to notify other tabs/components
    window.dispatchEvent(new Event("storage"));

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
