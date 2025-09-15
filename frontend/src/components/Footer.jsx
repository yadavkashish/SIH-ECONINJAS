import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About / Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-4">EcoManage</h2>
          <p className="text-gray-300 mb-4">
            Committed to a cleaner, greener environment through sustainable waste management solutions.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-200"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-200"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-200">Services</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-200">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">123 Green Street, Eco City</p>
          <p className="text-gray-300 mb-2">Email: info@ecomanage.com</p>
          <p className="text-gray-300">Phone: +91 123 456 7890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 mt-8 pt-6 text-center text-gray-300 text-sm">
        © 2025 EcoManage. All rights reserved.
      </div>
    </footer>
  );
}
