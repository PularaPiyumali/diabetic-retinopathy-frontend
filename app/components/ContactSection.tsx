import { Button } from "./ui/button";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section className="py-16 bg-white-50">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join us in revolutionizing Diabetic Retinopathy detection and
            monitoring. Your eye health is our priority.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
