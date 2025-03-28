"use client";

import { Upload, Search, FileText } from "lucide-react";
import { Button } from "./ui/button";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Image(s)",
      description: "Securely upload your retinal images",
    },
    {
      icon: Search,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your images",
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description: "Receive a detailed report of your eye health",
    },
  ];

  const handleWatchDemo = () => {
    window.open("https://www.youtube.com", "_blank");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center mb-8">
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
          <Button
            size="lg"
            className="bg-black text-white border-black hover:bg-gray-800"
            onClick={handleWatchDemo}
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
