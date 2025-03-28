"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import router from "next/router";

type ProgressReport = {
  overallChange: string;
  confidenceScore: number;
  lesionChanges: {
    type: string;
    previousCount: number;
    currentCount: number;
    change: "increased" | "decreased" | "stable";
  }[];
  recommendations: string[];
};

type PatientData = {
  fullName: string;
  age: string;
  gender: string;
  medicalHistory: string;
  contactNumber: string;
  email: string;
};

const DRMonitoringPage = () => {
  const [baselineImage, setBaselineImage] = useState<File | null>(null);
  const [followUpImage, setFollowUpImage] = useState<File | null>(null);
  const [baselinePreview, setBaselinePreview] = useState<string | null>(null);
  const [followUpPreview, setFollowUpPreview] = useState<string | null>(null);
  const [progressReport, setProgressReport] = useState<ProgressReport | null>(
    null
  );
  const [errorMessages, setErrorMessages] = useState<{
    baseline: string | null;
    followUp: string | null;
  }>({
    baseline: null,
    followUp: null,
  });
  const [patientData, setPatientData] = useState<PatientData | null>(null);

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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    imageType: "baseline" | "followUp"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const validFormats = ["image/png", "image/jpeg", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        setErrorMessages((prev) => ({
          ...prev,
          [imageType]: "Please upload a PNG, JPG or JPEG image only.",
        }));
        setImage(null);
        setPreview(null);

        event.target.value = "";
        return;
      }

      setErrorMessages((prev) => ({
        ...prev,
        [imageType]: null,
      }));
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCompare = () => {
    setTimeout(() => {
      const mockProgressReport: ProgressReport = {
        overallChange: "Slight improvement",
        confidenceScore: 0.85,
        lesionChanges: [
          {
            type: "Microaneurysms",
            previousCount: 7,
            currentCount: 5,
            change: "decreased",
          },
          {
            type: "Dot Hemorrhages",
            previousCount: 3,
            currentCount: 2,
            change: "decreased",
          },
          {
            type: "Hard Exudates",
            previousCount: 1,
            currentCount: 1,
            change: "stable",
          },
        ],
        recommendations: [
          "Continue with current treatment plan",
          "Maintain strict blood sugar control",
          "Schedule next follow-up in 4-6 months",
        ],
      };
      setProgressReport(mockProgressReport);
    }, 2000);
  };

  if (!patientData) {
    return (
      <div className="container mx-auto px-6 py-8">Loading patient data...</div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">
        Diabetic Retinopathy Monitoring
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
            <p className="text-sm font-medium text-gray-500">Gender</p>
            <p>{patientData.gender}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Baseline",
              image: baselineImage,
              preview: baselinePreview,
              setImage: setBaselineImage,
              setPreview: setBaselinePreview,
              error: errorMessages.baseline,
              type: "baseline" as const,
            },
            {
              label: "Follow-up",
              image: followUpImage,
              preview: followUpPreview,
              setImage: setFollowUpImage,
              setPreview: setFollowUpPreview,
              error: errorMessages.followUp,
              type: "followUp" as const,
            },
          ].map(
            (
              { label, image, preview, setImage, setPreview, error, type },
              index
            ) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-2">
                  Upload {label} Image
                </h2>
                <p className="text-gray-600 mb-4">
                  Please upload your {label.toLowerCase()} retinal image.
                </p>
                <label
                  htmlFor={`${label.toLowerCase()}-file`}
                  className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt={`${label} image preview`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG or JPG (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id={`${label.toLowerCase()}-file`}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) =>
                      handleFileChange(e, setImage, setPreview, type)
                    }
                  />
                </label>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            )
          )}
        </div>
        <Button
          onClick={handleCompare}
          disabled={!baselineImage || !followUpImage}
          className="w-full mt-6"
        >
          Compare Progress
        </Button>
      </div>
      {progressReport && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Report</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Overall Change:</h3>
              <p className="text-gray-700">{progressReport.overallChange}</p>
              <p className="text-sm text-gray-500">
                Confidence Score:{" "}
                {(progressReport.confidenceScore * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Lesion Changes:</h3>
              <ul className="list-disc list-inside">
                {progressReport.lesionChanges.map((lesion, index) => (
                  <li key={index} className="text-gray-700">
                    {lesion.type}: {lesion.previousCount} →{" "}
                    {lesion.currentCount} ({lesion.change})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Recommendations:</h3>
              <ul className="list-disc list-inside">
                {progressReport.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-gray-700">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline">Download Full Report</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DRMonitoringPage;
