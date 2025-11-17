import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt ,
  FaEnvelope ,
  FaPhoneAlt
} from "react-icons/fa";
import logo from '../../public/logo1.jpeg';   

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
                <div
                                  class="w-10 h-10 border-radius-[25px] from-primary-600 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse-slow hover:rotate-12 transition-transform">
                               <img src={logo} alt="GrowHiveIndia Logo" />
                        </div>
              <a href="#" className="text-2xl font-extrabold text-white hover:text-purple-400 transition">Grow<span className="text-purple-400">Hive</span>India</a>
            </div>
            <p className="text-gray-400 mb-6">Learn, Grow, and Succeed with India's Fastest Learning Hub</p>
            <div className="flex space-x-4 text-gray-400">
              <a href="https://www.facebook.com/profile.php?id=61574957055667&mibextid=ZbWKwL" className="w-10 h-10 bg-gray-800 rounded-full grid place-items-center hover:bg-purple-600 hover:text-white transition" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full grid place-items-center hover:bg-sky-500 hover:text-white transition" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://www.instagram.com/growhiveindia?igsh=OTdwb2JxaGNxaXJi" className="w-10 h-10 bg-gray-800 rounded-full grid place-items-center hover:bg-pink-600 hover:text-white transition" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://youtube.com/@growhiveindia?si=BW6xWHo4oqGjcqgI" className="w-10 h-10 bg-gray-800 rounded-full grid place-items-center hover:bg-red-600 hover:text-white transition" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://wa.me/919569574295" className="w-10 h-10 bg-gray-800 rounded-full grid place-items-center hover:bg-green-500 hover:text-white transition" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#courses" className="hover:text-white transition">Courses</a></li>
              <li><a href="#products" className="hover:text-white transition">Products</a></li>
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Courses</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white transition">Business & Finance</a></li>
              <li><a href="#" className="hover:text-white transition">Personal Development</a></li>
              <li><a href="#" className="hover:text-white transition">Technology</a></li>
              <li><a href="#" className="hover:text-white transition">All Courses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start"><FaMapMarkerAlt className="text-6xl mr-3 text-purple-400 "/><span>Gilat Bazar H.No.S.1/22-A-6, Kautilya Koin Marg, UCO Bank, Chotta Chuppepur, Varanasi Uttar Pradesh-221002</span></li>
              <li className="flex items-center"><FaEnvelope className="text-2xl mr-3 text-purple-400"/><span>growhiveindia@gmail.com</span></li>
              <li className="flex items-center"><FaPhoneAlt className="text-2xl mr-3 text-purple-400"/><span>+91 9569574295</span></li>
              <li className="flex items-center"><FaWhatsapp className="text-2xl mr-3 text-purple-400"/><span>+91 9569574295</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} GrowHiveIndia. All rights reserved.</p>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

