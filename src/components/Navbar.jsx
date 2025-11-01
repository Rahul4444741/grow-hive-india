// src/components/Navbar.jsx
import { useState } from "react";
import "./Navbar.css"; // custom component utilities

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div
                    class="w-10 h-10  from-primary-600 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse-slow hover:rotate-12 transition-transform">
                 <img src="public\logo1.jpeg"/>
          </div>
          <a
            href="#"
            className="text-2xl font-extrabold text-dark-900 hover:text-primary-700 transition"
          >
            Grow<span className="text-primary-700">Hive</span>India
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <a
            href="#"
            className="nav-link text-dark-700 hover:text-primary-600 transition font-medium"
          >
            Home
          </a>
          <a
            href="#courses"
            className="nav-link text-dark-700 hover:text-primary-600 transition font-medium"
          >
            Courses
          </a>
          <a
            href="#products"
            className="nav-link text-dark-700 hover:text-primary-600 transition font-medium"
          >
            Products
          </a>
          <a
            href="#features"
            className="nav-link text-dark-700 hover:text-primary-600 transition font-medium"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="nav-link text-dark-700 hover:text-primary-600 transition font-medium"
          >
            Success Stories
          </a>
          <a
            href="#contact"
            className="nav-link text-dark-700 hover:text-primary-600 transition font-medium"
          >
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="hidden md:block px-4 py-2 text-primary-600 rounded-md hover:bg-primary-50 transition font-medium hover:scale-105"
          >
            Login
          </a>

          <a
            href="#"
            // className="hidden md:block px-6 py-2 bg-primary-600 bg-gradient-to-r from-primary-600 to-primary-800 
            //  text-white rounded-lg hover:from-primary-700 hover:to-primary-900 
            //  transition shadow-lg hover:shadow-primary-300/50 btn-glow font-medium 
            //  hover:scale-105 btn-hover relative"
            className="z-1000 md:block px-6 py-2 bg-primary-600 text-white rounded-lg hover:from-primary-700 hover:to-primary-900 
             transition shadow-lg hover:shadow-primary-300/50 btn-glow font-medium 
             hover:scale-105 btn-hover relative"
          >
            <span className="relative z-10">Sign Up</span>
          </a>

          <button
            className="lg:hidden text-gray-700 focus:outline-none hover:text-primary-600 transition"
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu (React state, not IDs) */}
      {isOpen && (
        <div className="lg:hidden bg-white w-full py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="text-dark-700 hover:text-primary-600 transition font-medium hover:pl-2"
            >
              Home
            </a>
            <a
              href="#courses"
              className="text-dark-700 hover:text-primary-600 transition font-medium hover:pl-2"
            >
              Courses
            </a>
            <a
              href="#products"
              className="text-dark-700 hover:text-primary-600 transition font-medium hover:pl-2"
            >
              Products
            </a>
            <a
              href="#features"
              className="text-dark-700 hover:text-primary-600 transition font-medium hover:pl-2"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-dark-700 hover:text-primary-600 transition font-medium hover:pl-2"
            >
              Success Stories
            </a>
            <a
              href="#contact"
              className="text-dark-700 hover:text-primary-600 transition font-medium hover:pl-2"
            >
              Contact
            </a>
            <div className="pt-4 border-t border-gray-200 flex space-x-4">
              <a
                href="#"
                className="w-full text-center px-4 py-2 text-primary-600 rounded-md hover:bg-primary-50 transition font-medium hover:scale-105"
              >
                Login
              </a>
              <a
                href="#"
                className="w-full text-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg hover:from-primary-700 hover:to-primary-900 transition shadow-lg hover:shadow-primary-300/50 font-medium hover:scale-105 btn-hover relative"
              >
                <span className="relative z-10">Sign Up</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
