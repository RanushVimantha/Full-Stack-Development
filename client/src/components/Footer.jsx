import { Link } from "react-router-dom";
import { EnvelopeIcon, GlobeAltIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between bg-black px-6 py-8 sm:px-10 lg:flex-row lg:items-start">
      {/* Left Section: Logo and Description */}
      <div className="mb-6 lg:mb-0 lg:w-1/3">
        <div className="flex items-center mb-4">
          <p className="text-3xl font-bold" style={{ color: "gold" }}>
            Ceynema
          </p>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Experience the ultimate movie experience with Ceynema! Your one-stop destination for cinema schedules, ticket bookings, and more.
        </p>
      </div>

      {/* Center Section: Quick Links */}
      <div className="mb-6 lg:mb-0 lg:w-1/3">
        <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/cinema"
              className="text-sm text-gray-400 hover:text-gold transition duration-200"
            >
              Cinema
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className="text-sm text-gray-400 hover:text-gold transition duration-200"
            >
              Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/ticket"
              className="text-sm text-gray-400 hover:text-gold transition duration-200"
            >
              Tickets
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section: Social Media and Contact */}
      <div className="lg:w-1/3">
        <h3 className="mb-4 text-lg font-bold text-white">Follow Us</h3>
        <div className="flex gap-4 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition duration-200"
            aria-label="Facebook"
          >
            <GlobeAltIcon className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition duration-200"
            aria-label="Instagram"
          >
            <GlobeAltIcon className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition duration-200"
            aria-label="Twitter"
          >
            <GlobeAltIcon className="h-6 w-6" />
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400">
              Email:{" "}
              <a
                href="mailto:support@ceynema.com"
                className="hover:text-gold transition duration-200"
              >
                support@ceynema.com
              </a>
            </li>
            <li className="text-sm text-gray-400">
              Phone:{" "}
              <a
                href="tel:+94123456789"
                className="hover:text-gold transition duration-200"
              >
                +94 123 456 789
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
