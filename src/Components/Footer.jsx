import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiX } from 'react-icons/si'

export default function Footer() {
  const location = useLocation();
  const is404Page = location.pathname === '/404' || location.pathname === '*';

  if (is404Page) {
    return null;
  }

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary mb-2 block">
              🚗 RentWheels
            </Link>
            <p className="text-gray-300 text-sm">
              Premium car rental platform designed for your convenience and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-cars" className="text-gray-300 hover:text-primary transition">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 support@rentwheels.com</li>
              <li>📍 123 Car Street, Motor City, MC 12345</li>
              <li>🕐 Mon - Sun: 8AM - 6PM</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/mahamudul.islam.shawcha/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition duration-300 hover:scale-125 inline-block">
                <FaFacebook />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition duration-300 hover:scale-125 inline-block">
                <SiX />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition duration-300 hover:scale-125 inline-block">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition duration-300 hover:scale-125 inline-block">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p>&copy; 2024 RentWheels. All rights reserved.</p>
            </div>
            <div className="flex gap-4 md:justify-end">
              <Link to="/" className="hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-primary transition">
                Terms of Service
              </Link>
              <Link to="/" className="hover:text-primary transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
