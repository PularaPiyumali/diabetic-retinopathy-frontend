"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { User, Mail, Save } from "lucide-react";
import { useAuth } from "../context/auth-context";
import ProtectedRoute from "../components/protected-route";

const ProfileContent = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //Update local storage with new user data
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {successMessage && (
          <div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={logout}>
                  Sign Out
                </Button>
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
};

export default ProfilePage;
