"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Clipboard, Eye, Activity } from "lucide-react";
import { useAuth } from "../context/auth-context";
import { v4 as uuidv4 } from "uuid";

type PatientData = {
  fullName: string;
  age: string;
  gender: string;
  medicalHistory: string;
  contactNumber: string;
  email: string;
};

const PatientEntryPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [patientData, setPatientData] = useState<PatientData>({
    fullName: "",
    age: "",
    gender: "",
    medicalHistory: "",
    contactNumber: "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState<Partial<PatientData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PatientData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PatientData> = {};
    let isValid = true;

    if (!patientData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!patientData.age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(Number(patientData.age)) || Number(patientData.age) <= 0) {
      newErrors.age = "Age must be a valid number";
      isValid = false;
    }

    if (!patientData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (
      patientData.contactNumber &&
      !/^\d{10}$/.test(patientData.contactNumber)
    ) {
      newErrors.contactNumber = "Please enter a valid 10-digit contact number";
      isValid = false;
    }

    if (patientData.email && !/\S+@\S+\.\S+/.test(patientData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (destination: "detection" | "monitoring") => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a unique patient ID if not exists
      const patientId = sessionStorage.getItem("currentPatientId") || uuidv4();

      // Prepare patient data with user ID
      const patientWithUserId = {
        ...patientData,
        userId: user?.email || "anonymous",
        patientId,
      };

      // Save to MongoDB
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientWithUserId),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save patient data");
      }

      // Store patient data and ID in session storage
      sessionStorage.setItem("patientData", JSON.stringify(patientWithUserId));
      sessionStorage.setItem("currentPatientId", patientId);

      // Navigate to the selected page
      router.push(`/${destination}`);
    } catch (error) {
      console.error("Error saving patient data:", error);
      alert("Failed to save patient data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">Patient Information</h1>
      <div className="flex items-center mb-6">
        <Clipboard className="w-6 h-6 text-black mr-2" />
        <h2 className="text-xl font-semibold">Enter Patient Details</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name*
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={patientData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age*
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={patientData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">{errors.age}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender*
          </label>
          <select
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={patientData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 shadow-sm focus:ring-black bg-white"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={patientData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="medicalHistory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Medical History
          </label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={patientData.medicalHistory}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter any relevant medical history, such as diabetes duration, medications, etc."
          ></textarea>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 ">
        <Button
          onClick={() => handleSubmit("detection")}
          className="flex items-center justify-center gap-2"
          size="lg"
        >
          <Eye className="w-5 h-5" />
          DR Detection
        </Button>

        <Button
          onClick={() => handleSubmit("monitoring")}
          className="flex items-center justify-center gap-2"
          variant="outline"
          size="lg"
        >
          <Activity className="w-5 h-5" />
          DR Monitoring
        </Button>
      </div>
    </div>
  );
};

export default PatientEntryPage;
