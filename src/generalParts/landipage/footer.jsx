import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-yellow-400  md:py-12 text-gray-900 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-10 justify-between">
            {/* Contact Info */}
            <div className="w-1/2 md:w-1/">
              <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
              <div className="space-y-3 text-sm sm:text-base">
                <p className="flex items-center gap-2">
                  <span className="text-lg">📧</span> karnan.se@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-lg">📞</span> +91 9048905001
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-lg">📍</span> Kozhikode, Kerala
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="w-1/4 md:w-1/4">
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <Link
                    to="/"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/benefits"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Our Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonials"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Our Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Our FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="w-1/4 md:w-1/4 md:sm:flex-row  ">
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/company"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/achievements"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/goals"
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    Our Goals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Profiles */}
            <div className="w-1/2 md:w-1/4">
              <h3 className="font-semibold mb-4 text-lg">Social Profiles</h3>
              <div className="flex gap-6">
                <Link
                  to="#"
                  className="text-gray-900 hover:text-gray-800 transition-colors duration-200"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-gray-900 hover:text-gray-800 transition-colors duration-200"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-gray-900 hover:text-gray-800 transition-colors duration-200"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="mt-3 xl:mt-7 pt-6 border-t border-gray-600 text-center text-sm sm:text-base">
            <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}