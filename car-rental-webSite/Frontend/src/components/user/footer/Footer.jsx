import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sky-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Subscription Section */}
      <div className="text-center py-10 px-4">
        <h2 className="text-3xl font-bold">Never Miss a Deal !</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter Your Email ID"
            className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md shadow hover:bg-teal-600">
            Subscribe
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold">Car Rental</h3>
          <p className="mt-2 text-sm">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-sky-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-sky-600">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:text-sky-600">Home</a></li>
            <li><a href="#" className="hover:text-sky-600">Browse Cars</a></li>
            <li><a href="#" className="hover:text-sky-600">List Your Car</a></li>
            <li><a href="#" className="hover:text-sky-600">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold">Resources</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:text-sky-600">Help Center</a></li>
            <li><a href="#" className="hover:text-sky-600">Terms Of Service</a></li>
            <li><a href="#" className="hover:text-sky-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-2 text-sm">
            91234 56789  Easy Drive <br />
            Kerala, India
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p>© 2025 Brand. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-sky-600">Privacy</a>
          <a href="#" className="hover:text-sky-600">Terms</a>
          <a href="#" className="hover:text-sky-600">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
