import React from 'react';
import QRCode from 'react-qr-code';
import GrowHiveIndiaLogo from '../../public/logo1.jpeg';    


const GrowHiveIndiaReview = () => {
  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJrTLr-GyuEmsRBfy61i59si0";

  return (
    <div className="flex min-h-[600px] bg-gradient-to-r from-purple-700 to-purple-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-start p-8 lg:p-16 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-1.5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="white"/>
            </svg>
            {/* <img src={GrowHiveIndiaLogo} width="28" height="28" alt="GrowHiveIndia Logo" /> */}
            
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold">
              <span className="text-white">Grow</span>
              <span className="text-purple-300">Hive</span>
              <span className="text-white">India</span>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Learning</span>
          </h1>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">Today</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-6 max-w-xl">
          <p className="text-base text-white/90 leading-relaxed">
            Explore premium courses & products to unlock your potential and achieve success.
          </p>
          <p className="text-sm text-white/80 mt-3">
            Scan the QR code to share your experience and help others discover quality learning!
          </p>
        </div>
      </div>

      {/* Right Section - Phone Display */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="relative">
          {/* Glowing effect behind phone */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-[2.5rem] blur-2xl opacity-40 scale-105"></div>
          
          {/* Phone Frame */}
          <div className="relative w-72 h-[520px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl">
            {/* Phone Screen */}
            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
              {/* Status Bar */}
              <div className="h-7 bg-white flex items-center justify-center">
                <div className="w-28 h-5 bg-black rounded-full"></div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-5 bg-gradient-to-br from-purple-50 to-blue-50">
                {/* Google Logo */}
                <div className="mb-5">
                  <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                    <path d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
                    <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
                    <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
                  </svg>
                </div>

                {/* Quote */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-5 max-w-xs">
                  <p className="text-purple-600 text-base font-semibold text-center italic">
                    "GrowHiveIndia transformed my career journey!"
                  </p>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FBBF24"/>
                    </svg>
                  ))}
                </div>

                {/* QR Code */}
                <div className="bg-white p-3 rounded-xl shadow-xl">
                  <QRCode value={googleReviewUrl} size={140} />
                </div>

                <p className="text-purple-600 font-semibold mt-3 text-xs">
                  Scan to review us on Google
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowHiveIndiaReview;