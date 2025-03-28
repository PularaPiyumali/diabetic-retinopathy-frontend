import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PatientAssessmentSection from "./components/PatientAssessmentSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PatientAssessmentSection />
      <HowItWorksSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
