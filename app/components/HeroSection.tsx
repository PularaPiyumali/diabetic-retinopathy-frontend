"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    // Scroll to the PatientAssessmentSection
    const patientSection = document.getElementById(
      "patient-assessment-section"
    );
    if (patientSection) {
      patientSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 pt-[65px] pb-8">
      <section className="relative h-[88vh] flex items-center justify-center overflow-hidden rounded-3xl mx-2 shadow-xl">
        <div
          className="absolute z-0 w-full h-full bg-cover bg-center max-w-none rounded-3xl"
          style={{ backgroundImage: "url('/images/eye-care.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
        </div>
        <div className="relative z-10 text-center text-white p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl mx-auto">
            Welcome to PrismEye <br /> Your Vision, Our Mission
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Revolutionizing Diabetic Retinopathy Diagnosis & Monitoring
          </p>
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
