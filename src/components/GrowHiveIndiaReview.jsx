import React, { useState } from 'react';

const QRCodeSVG = ({ value, size = 200 }) => {
  // Simple QR code generator using SVG
  const qrSize = 29; // QR code modules (29x29 for this URL)
  const moduleSize = size / qrSize;
  
  // This is a simplified QR code pattern for the Google review URL
  // In production, you'd use a proper QR library, but this creates a visual QR-like pattern
  const createQRPattern = () => {
    const pattern = [];
    // Create a pseudo-random but deterministic pattern based on the URL
    const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    for (let row = 0; row < qrSize; row++) {
      for (let col = 0; col < qrSize; col++) {
        // Finder patterns (corners)
        const isFinderPattern = 
          (row < 7 && col < 7) || 
          (row < 7 && col >= qrSize - 7) || 
          (row >= qrSize - 7 && col < 7);
        
        if (isFinderPattern) {
          const inOuterBox = (row === 0 || row === 6 || col === 0 || col === 6 ||
                             (row >= qrSize - 7 && (row === qrSize - 7 || row === qrSize - 1)) ||
                             (col >= qrSize - 7 && (col === qrSize - 7 || col === qrSize - 1)));
          const inInnerBox = ((row >= 2 && row <= 4) && (col >= 2 && col <= 4)) ||
                            ((row >= 2 && row <= 4) && (col >= qrSize - 5 && col <= qrSize - 3)) ||
                            ((row >= qrSize - 5 && row <= qrSize - 3) && (col >= 2 && col <= 4));
          
          if (inOuterBox || inInnerBox) {
            pattern.push({ row, col, filled: true });
          }
        } else {
          // Data pattern - pseudo-random based on position and seed
          const hash = (row * qrSize + col + seed) * 2654435761;
          if (hash % 3 !== 0) {
            pattern.push({ row, col, filled: true });
          }
        }
      }
    }
    return pattern;
  };

  const modules = createQRPattern();

  return (
    <svg width={size} height={size} viewBox={`0 0 ${qrSize} ${qrSize}`} style={{ shapeRendering: 'crispEdges' }}>
      <rect width={qrSize} height={qrSize} fill="white" />
      {modules.map((module, idx) => (
        <rect
          key={idx}
          x={module.col}
          y={module.row}
          width={1}
          height={1}
          fill="black"
        />
      ))}
    </svg>
  );
};

const GrowHiveIndiaReview = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // const websiteUrl = "https://search.google.com/local/writereview?placeid=ChIJrTLr-GyuEmsRBfy61i59si0";
  const websiteUrl = "https://www.growhiveindia.com/";

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting!');
      return;
    }
    
    // Store review data in memory
    const reviewData = {
      rating,
      text: reviewText,
      timestamp: new Date().toISOString(),
      website: websiteUrl
    };
    
    console.log('Review submitted:', reviewData);
    
    // Show thank you message
    setShowThankYou(true);
    
    // Redirect to Google review page after 2 seconds
    setTimeout(() => {
      window.open(websiteUrl, '_blank');
      // Reset form
      setReviewText('');
      setRating(0);
      setShowThankYou(false);
    }, 2000);
  };

  const handleQuickReview = () => {
    window.open(websiteUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 h-40 md:w-60 md:h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 md:bottom-32 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
              <img 
                src="/logo1.jpeg" 
                className="w-full h-full object-cover" 
                alt="GrowHiveIndia Logo" 
              />
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="text-white">Grow</span>
                <span className="text-purple-300">Hive</span>
                <span className="text-white">India</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Experience</span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Your feedback helps us grow and helps others discover quality learning
          </p>
          <a 
            href={websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm md:text-base text-purple-300 hover:text-purple-200 underline"
          >
            Visit www.growhiveindia.com
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Section - Review Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
            {showThankYou ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Thank You!</h3>
                <p className="text-gray-600">Redirecting to Google Reviews...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Write Your Review
                </h2>

                {/* Star Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Rate Your Experience
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <svg 
                          width="40" 
                          height="40" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:w-12 md:h-12"
                        >
                          <path 
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                            fill={star <= (hoverRating || rating) ? "#FBBF24" : "#E5E7EB"}
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-purple-600 mt-2 font-medium">
                      You rated: {rating} star{rating !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {/* Review Textarea */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Share Your Thoughts
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about your experience with GrowHiveIndia. What did you like? How did we help you?"
                    className="w-full h-32 md:h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none text-gray-700 placeholder-gray-400"
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {reviewText.length}/500 characters
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Submit Review on Google
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You'll be redirected to Google to post your review
                </p>
              </>
            )}
          </div>

          {/* Right Section - QR Code & Info */}
          <div className="flex flex-col gap-6">
            {/* Phone Display with QR */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                  Scan QR Code to Review
                </h3>
                
                {/* QR Code Display */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-30 scale-110"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                    <QRCodeSVG value={websiteUrl} size={200} />
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-4">
                  Scan with your phone camera to leave a quick review
                </p>

                <button
                  onClick={handleQuickReview}
                  className="bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Open Google Review
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Why Your Review Matters</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌟</span>
                  <p className="text-sm text-gray-600">Help others discover quality learning resources</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💪</span>
                  <p className="text-sm text-gray-600">Support us in improving our courses and services</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <p className="text-sm text-gray-600">Inspire others to start their learning journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/80 text-sm">
          <p>© 2024 GrowHiveIndia. Empowering learners across India.</p>
        </div>
      </div>
    </div>
  );
};

export default GrowHiveIndiaReview;