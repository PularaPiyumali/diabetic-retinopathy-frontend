"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Activity, Upload } from "lucide-react";
import Image from "next/image";
import router from "next/router";
import DiagnosisDisclaimer from "../components/DiagnosisDisclaimer";

type DetectionResult = {
  severity: string;
  confidence: number;
};

type PatientData = {
  patientId?: string;
  fullName: string;
  age: string;
  gender: string;
  medicalHistory: string;
  contactNumber: string;
  email: string;
};

const DRDetectionPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] =
    useState<DetectionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [diagnosisSaved, setDiagnosisSaved] = useState(false);

  useEffect(() => {
    // Retrieve patient data from session storage
    const storedData = sessionStorage.getItem("patientData");
    if (storedData) {
      setPatientData(JSON.parse(storedData));
    } else {
      // Redirect to patient entry if no data is found
      router.push("/patient-entry");
    }
  }, [router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validFormats = ["image/png", "image/jpeg", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        setErrorMessage("Please upload a PNG, JPG or JPEG image.");
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setErrorMessage(null);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Reset detection result when a new file is selected
      setDetectionResult(null);
      setDiagnosisSaved(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    console.log("Starting analysis...");

    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("FormData created with file:", selectedFile.name);

    try {
      console.log("Sending request to server...");
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });
      console.log("Server response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response data:", result);

      if (result.error) {
        setErrorMessage(result.error);
        console.error("Server returned error:", result.error);
      } else {
        setDetectionResult({
          severity: result.severity,
          confidence: result.confidence,
        });

        setErrorMessage(null);
        console.log("Analysis complete, result set");

        saveDiagnosisToDatabase();
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      setErrorMessage("Failed to analyze the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveDiagnosisToDatabase = async () => {
    if (!detectionResult || !patientData || !patientData.patientId) return;

    setIsSaving(true);

    try {
      const diagnosisData = {
        patientId: patientData.patientId,
        patientName: patientData.fullName,
        diagnosisType: "detection",
        result: detectionResult,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diagnosisData),
      });

      const result = await response.json();

      if (result.success) {
        setDiagnosisSaved(true);
        console.log("Diagnosis saved successfully");
      } else {
        throw new Error(result.error || "Failed to save diagnosis");
      }
    } catch (error) {
      console.error("Error saving diagnosis:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!patientData) {
    return (
      <div className="container mx-auto px-6 py-8">Loading patient data...</div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">
        Diabetic Retinopathy Detection
      </h1>

      {/* Patient Information Card */}
      <div className="bg-blue-50 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold mb-2">Patient Information</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{patientData.fullName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Age</p>
            <p>{patientData.age}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gender History</p>
            <p>{patientData.gender}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Retinal Image</h2>
        <p className="text-gray-600 mb-20">
          Please upload a clear, high-resolution image of your retina (PNG or
          JPG format).
        </p>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Retinal image preview"
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
              ) : (
                <>
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG or JPG (MAX. 800x400px)
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleAnalyze || saveDiagnosisToDatabase}
          disabled={!selectedFile || isAnalyzing}
          className="w-48"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Now"}
        </Button>
      </div>

      {detectionResult && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Detection Report</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Diagnosis:</h3>
              <p className="text-gray-700">{detectionResult.severity}</p>
              <p className="text-sm text-gray-500">
                Confidence: {detectionResult.confidence.toFixed(2)}%
              </p>
            </div>
          </div>
          <DiagnosisDisclaimer />
        </div>
      )}
    </div>
  );
};

export default DRDetectionPage;
