import { Eye, Activity, BarChart } from "lucide-react";
import Image from "next/image";

const ServicesSection = () => {
  const services = [
    {
      icon: Eye,
      title: "DR Detection",
      description: "Early detection of Diabetic Retinopathy",
    },
    {
      icon: Activity,
      title: "DR Progress Monitoring",
      description: "Track changes in your retinal health over time",
    },
    {
      icon: BarChart,
      title: "Comprehensive Analysis",
      description: "Comprehensive analysis of your retinal health",
    },
  ];

  return (
    <section className="py-16 bg-white-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center">
          {services.map((service, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <service.icon className="w-8 h-8 text-black mr-3" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
