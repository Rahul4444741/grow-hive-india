import React from 'react';
import QRCode from 'react-qr-code';

const GrowHiveIndiaReview = () => {
  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJrTLr-GyuEmsRBfy61i59si0";

  return (
    <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px] bg-gradient-to-r from-purple-700 to-purple-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 h-40 md:w-60 md:h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 md:bottom-32 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-start p-6 md:p-10 lg:p-16 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
            <img 
              src="/logo1.jpeg" 
              className="w-full h-full object-cover" 
              alt="GrowHiveIndia Logo" 
            />
          </div>
          <div className="text-left">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">
              <span className="text-white">Grow</span>
              <span className="text-purple-300">Hive</span>
              <span className="text-white">India</span>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight">
            Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Learning</span>
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">Today</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-6 md:mb-8 max-w-xl">
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            Explore premium courses & products to unlock your potential and achieve success.
          </p>
          <p className="text-xs md:text-sm text-white/80 mt-2 md:mt-3">
            Scan the QR code to share your experience and help others discover quality learning!
          </p>
        </div>
      </div>

      {/* Right Section - Phone Display */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12 relative z-10">
        <div className="relative">
          {/* Glowing effect behind phone */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-[2rem] md:rounded-[2.5rem] blur-2xl opacity-40 scale-105"></div>
          
          {/* Phone Frame */}
          <div className="relative w-64 h-[450px] md:w-72 md:h-[520px] lg:w-80 lg:h-[560px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-2.5 shadow-2xl">
            {/* Phone Screen */}
            <div className="w-full h-full bg-white rounded-[1.75rem] md:rounded-[2rem] overflow-hidden flex flex-col">
              {/* Status Bar */}
              <div className="h-6 md:h-7 bg-white flex items-center justify-center">
                <div className="w-24 h-4 md:w-28 md:h-5 bg-black rounded-full"></div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-5 bg-gradient-to-br from-purple-50 to-blue-50">
                {/* Google Logo */}
                <div className="mb-4 md:mb-5">
                  <svg width="56" height="56" className="md:w-16 md:h-16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                    <path d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
                    <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
                    <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
                  </svg>
                </div>

                {/* Quote */}
                <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-4 mb-4 md:mb-5 max-w-xs">
                  <p className="text-purple-600 text-sm md:text-base font-semibold text-center italic">
                    "GrowHiveIndia transformed my career journey!"
                  </p>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 md:mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FBBF24"/>
                    </svg>
                  ))}
                </div>

                {/* QR Code */}
                <div className="bg-white p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-xl">
                  <QRCode value={googleReviewUrl} size={120} className="md:w-[140px] md:h-[140px]" />
                </div>

                <p className="text-purple-600 font-semibold mt-2 md:mt-3 text-[10px] md:text-xs text-center">
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