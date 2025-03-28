import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  href="/"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  Home
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="/about"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  About Us
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="/faq"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Legal</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  href="/terms"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  Terms of Use
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="/privacy"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Social</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a
                  href="#"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  Facebook
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="#"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  LinkedIn
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="#"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Company</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link
                  href="/contact"
                  className="hover:underline text-white hover:text-gray-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-white font-bold mb-2">
              © 2025 PrismEye. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
