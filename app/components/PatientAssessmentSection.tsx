import { Clipboard, Eye, Activity } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const PatientAssessmentSection = () => {
  const steps = [
    {
      icon: Clipboard,
      title: "Enter Patient Information",
      description:
        "Record patient details and medical history for accurate assessment",
    },
    {
      icon: Eye,
      title: "DR Detection",
      description:
        "Upload retinal images for AI-powered detection of Diabetic Retinopathy",
    },
    {
      icon: Activity,
      title: "DR Monitoring",
      description:
        "Track changes in retinal health over time with comparative analysis",
    },
  ];

  return (
    <section id="patient-assessment-section" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Patient Assessment Process
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our comprehensive approach ensures accurate diagnosis and effective
          monitoring of Diabetic Retinopathy
        </p>

        <div className="flex flex-wrap justify-center mb-12">
          {steps.map((step, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-4">
                    <step.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/patient-entry">
            <Button
              size="lg"
              className="bg-black text-white border-black hover:bg-gray-800"
            >
              Begin Patient Assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PatientAssessmentSection;
