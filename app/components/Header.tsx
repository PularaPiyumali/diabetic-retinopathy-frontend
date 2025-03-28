"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "../context/auth-context";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [localUser, setLocalUser] = useState<any>(null);
  const pathname = usePathname();

  // Check if current page is login or signup
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // This effect ensures the component re-renders after mounting
  useEffect(() => {
    setMounted(true);

    // Safely check localStorage after component mounts
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setLocalUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Force a re-render when localStorage changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setLocalUser(JSON.parse(storedUser));
        } else {
          setLocalUser(null);
        }
      } catch (error) {
        console.error("Error handling storage change:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Don't render user-dependent UI until after hydration
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800 mr-6">
              PrismEye
            </Link>
            <div className="hidden md:flex space-x-4">
              {/* Navigation links */}
            </div>
            <div className="flex items-center ml-auto space-x-4">
              {/* Auth placeholder */}
            </div>
          </div>
        </nav>
      </header>
    );
  }

  // Use either the context user or the localStorage user
  const currentUser = user || localUser;

  // Simplified header for login and signup pages
  if (isAuthPage) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800 mr-6">
              PrismEye
            </Link>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800 mr-6">
            PrismEye
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-black hover:text-gray-700">
              Home
            </Link>
            {/* <Link href="/detection" className="text-black hover:text-gray-700">
              DR Detection
            </Link>
            <Link href="/monitoring" className="text-black hover:text-gray-700">
              DR Monitoring
            </Link> */}
            <Link
              href="/patient-entry"
              className="text-black hover:text-gray-700"
            >
              Patient Entry
            </Link>
            <Link href="/about" className="text-black hover:text-gray-700">
              About Us
            </Link>
            <Link href="/blog" className="text-black hover:text-gray-700">
              Blog
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-700">
              Contact
            </Link>
          </div>
          <div className="flex items-center ml-auto space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-800 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <span>{user.name}</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="mr-2">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
