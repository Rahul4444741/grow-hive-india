import React, { useState, useEffect } from 'react';

const GrowHiveReviewSystem = () => {
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(true);
  const [googlePlaceId, setGooglePlaceId] = useState('');
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [googleReviews, setGoogleReviews] = useState([]);
  const [loadingGoogleReviews, setLoadingGoogleReviews] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    loadReviews();
    loadGoogleSettings();
  }, []);

  const loadReviews = async () => {
    try {
      // Try window.storage first
      if (window.storage && typeof window.storage.list === 'function') {
        const result = await window.storage.list('', true); // Get all reviews (both website and Google)
        if (result && result.keys) {
          const allReviewsFromStorage = [];
          for (const key of result.keys) {
            const reviewData = await window.storage.get(key, true);
            if (reviewData && reviewData.value) {
              const review = JSON.parse(reviewData.value);
              allReviewsFromStorage.push(review);
            }
          }
          
          // Separate website reviews and Google reviews
          const websiteReviews = allReviewsFromStorage.filter(r => r.source === 'website');
          const googleReviewsFromStorage = allReviewsFromStorage.filter(r => r.source === 'google');
          
          websiteReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          googleReviewsFromStorage.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          
          setSubmittedReviews(websiteReviews);
          setGoogleReviews(googleReviewsFromStorage);
          return;
        }
      }
      
      // Fallback: Load from memory or show empty
      setSubmittedReviews([]);
      setGoogleReviews([]);
    } catch (error) {
      console.log('No existing reviews found', error);
      setSubmittedReviews([]);
      setGoogleReviews([]);
    }
  };

  const loadGoogleSettings = async () => {
    try {
      if (window.storage && typeof window.storage.get === 'function') {
        const placeIdResult = await window.storage.get('google-place-id', false);
        const apiKeyResult = await window.storage.get('google-api-key', false);
        
        if (placeIdResult && placeIdResult.value) {
          setGooglePlaceId(placeIdResult.value);
        }
        if (apiKeyResult && apiKeyResult.value) {
          setGoogleApiKey(apiKeyResult.value);
        }
      }
    } catch (error) {
      console.log('No Google settings found', error);
    }
  };

  const saveGoogleSettings = async () => {
    try {
      if (window.storage && typeof window.storage.set === 'function') {
        if (googlePlaceId) {
          await window.storage.set('google-place-id', googlePlaceId, false);
        }
        if (googleApiKey) {
          await window.storage.set('google-api-key', googleApiKey, false);
        }
        alert('Settings saved! Now you can fetch Google reviews.');
      } else {
        // Fallback: Just store in state
        alert('Settings saved temporarily. You can now fetch Google reviews.');
      }
      setShowSetup(false);
      if (googlePlaceId && googleApiKey) {
        fetchGoogleReviews();
      }
    } catch (error) {
      console.error('Settings save error:', error);
      alert('Settings saved temporarily. You can now fetch Google reviews.');
      setShowSetup(false);
    }
  };

  const fetchGoogleReviews = async () => {
    if (!googlePlaceId || !googleApiKey) {
      alert('Please setup Google Place ID and API Key first!');
      setShowSetup(true);
      return;
    }

    setLoadingGoogleReviews(true);
    try {
      // Using CORS proxy to fetch Google reviews
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=name,rating,reviews,user_ratings_total&key=${googleApiKey}`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const data = await response.json();
      
      if (data.status === 'OK' && data.result && data.result.reviews) {
        const formattedReviews = data.result.reviews.map(gr => ({
          id: `google-${gr.time}`,
          rating: gr.rating,
          text: gr.text,
          author: gr.author_name,
          timestamp: new Date(gr.time * 1000).toISOString(),
          source: 'google',
          profilePhoto: gr.profile_photo_url
        }));
        
        // Save each Google review to storage permanently
        if (window.storage && typeof window.storage.set === 'function') {
          for (const review of formattedReviews) {
            try {
              await window.storage.set(review.id, JSON.stringify(review), true);
            } catch (error) {
              console.log('Could not save review:', review.id);
            }
          }
        }
        
        setGoogleReviews(formattedReviews);
        alert(`Successfully loaded and saved ${formattedReviews.length} Google reviews!`);
      } else if (data.status === 'REQUEST_DENIED') {
        alert('API Key is invalid or Places API is not enabled. Please check your Google Cloud Console settings.');
      } else {
        alert('Could not fetch Google reviews. Error: ' + (data.status || 'Unknown error'));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error. CORS issue detected. You need a backend server to fetch Google reviews properly. Use "Load Demo Reviews" for testing.');
    } finally {
      setLoadingGoogleReviews(false);
    }
  };

  const loadDemoGoogleReviews = async () => {
    const demoReviews = [
      {
        id: 'google-demo-1',
        rating: 5,
        text: 'Excellent learning platform! The courses are well-structured and the instructors are very knowledgeable. Highly recommend GrowHiveIndia for anyone looking to upskill.',
        author: 'Priya Sharma',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
        profilePhoto: null
      },
      {
        id: 'google-demo-2',
        rating: 5,
        text: 'Great experience! The hands-on projects helped me land my dream job. Thank you GrowHiveIndia team!',
        author: 'Amit Kumar',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
        profilePhoto: null
      },
      {
        id: 'google-demo-3',
        rating: 4,
        text: 'Very good platform for learning. The content is up-to-date and relevant to industry needs. Would love to see more advanced courses.',
        author: 'Sneha Patel',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
        profilePhoto: null
      },
      {
        id: 'google-demo-4',
        rating: 5,
        text: 'Best decision to join GrowHiveIndia! The mentorship and support from instructors is outstanding. Career-changing experience!',
        author: 'Rajesh Verma',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
        profilePhoto: null
      },
      {
        id: 'google-demo-5',
        rating: 5,
        text: 'Impressive quality of education at affordable prices. The practical approach to teaching makes complex topics easy to understand.',
        author: 'Ananya Singh',
        timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
        profilePhoto: null
      }
    ];
    
    // Save demo reviews permanently to storage
    if (window.storage && typeof window.storage.set === 'function') {
      for (const review of demoReviews) {
        try {
          await window.storage.set(review.id, JSON.stringify(review), true);
        } catch (error) {
          console.log('Could not save demo review:', review.id);
        }
      }
    }
    
    setGoogleReviews(demoReviews);
    await loadReviews(); // Reload all reviews to show combined
    alert(`Loaded and saved ${demoReviews.length} demo reviews permanently!`);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert('Please select a rating before submitting!');
      return;
    }
    
    if (!reviewerName.trim()) {
      alert('Please enter your name!');
      return;
    }

    const reviewData = {
      id: `review:${Date.now()}`,
      rating,
      text: reviewText || 'No comment provided',
      author: reviewerName,
      timestamp: new Date().toISOString(),
      source: 'website'
    };
    
    try {
      // Try to save with window.storage
      if (window.storage && typeof window.storage.set === 'function') {
        await window.storage.set(reviewData.id, JSON.stringify(reviewData), true);
      } else {
        // Fallback: Add to state directly
        setSubmittedReviews(prev => [reviewData, ...prev]);
      }
      
      setShowThankYou(true);
      
      setTimeout(async () => {
        await loadReviews();
        setReviewText('');
        setReviewerName('');
        setRating(0);
        setShowThankYou(false);
      }, 2000);
      
    } catch (error) {
      console.error('Review submission error:', error);
      // Even on error, add to state so user sees their review
      setSubmittedReviews(prev => [reviewData, ...prev]);
      setShowThankYou(true);
      
      setTimeout(() => {
        setReviewText('');
        setReviewerName('');
        setRating(0);
        setShowThankYou(false);
      }, 2000);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={star <= rating ? "#FBBF24" : "none"}
            stroke={star <= rating ? "#FBBF24" : "#D1D5DB"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  const googleReviewUrl = googlePlaceId 
    ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
    : "https://www.growhiveindia.com/";
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(googleReviewUrl)}`;

  const allReviews = [
    ...submittedReviews,
    ...googleReviews
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden">
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 h-40 md:w-60 md:h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 md:bottom-32 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-2xl">🐝</div>
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
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <a 
              href="https://www.growhiveindia.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm md:text-base text-purple-300 hover:text-purple-200 underline"
            >
              Visit Website
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button
              onClick={() => setShowSetup(!showSetup)}
              className="inline-flex items-center gap-2 text-sm md:text-base text-yellow-300 hover:text-yellow-200 underline"
            >
              ⚙️ Setup Google Reviews
            </button>
          </div>

          {showSetup && (
            <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Google Reviews Setup</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Google Place ID
                  </label>
                  <input
                    type="text"
                    value={googlePlaceId}
                    onChange={(e) => setGooglePlaceId(e.target.value)}
                    placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get it from: <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Google Place ID Finder</a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Google API Key
                  </label>
                  <input
                    type="password"
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get it from: <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Google Cloud Console</a>
                  </p>
                </div>

                <button
                  onClick={saveGoogleSettings}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
                >
                  Save Settings
                </button>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold mb-2">📝 Quick Setup Guide:</p>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                  <li>Create a new project or select existing</li>
                  <li>Enable "Places API"</li>
                  <li>Create credentials → API Key</li>
                  <li>Find your business on Google Maps and get Place ID</li>
                </ol>
                <div className="mt-3 p-2 bg-yellow-100 rounded">
                  <p className="text-xs text-yellow-800">
                    <strong>⚠️ Note:</strong> Google Places API may have CORS restrictions. 
                    For production, you need a backend server to fetch reviews.
                    Local reviews will work without any backend.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
            {showThankYou ? (
              <div className="text-center py-12">
                <svg className="mx-auto mb-4 text-green-500" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your review has been submitted successfully!</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Write Your Review
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Rate Your Experience *
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
                          fill={star <= (hoverRating || rating) ? "#FBBF24" : "#E5E7EB"}
                          stroke={star <= (hoverRating || rating) ? "#FBBF24" : "#D1D5DB"}
                          strokeWidth="2"
                          className="md:w-12 md:h-12"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Share Your Thoughts (Optional)
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about your experience with GrowHiveIndia..."
                    className="w-full h-32 md:h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {reviewText.length}/500 characters
                  </div>
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Submit Review
                </button>

                {googlePlaceId && (
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Or Review on Google
                  </a>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                Scan to Review
              </h3>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-30 scale-110"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-xl flex items-center justify-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="w-52 h-52"
                  />
                </div>
              </div>

              <p className="text-gray-600 text-center text-sm mb-4">
                Scan with your phone camera to leave a quick review
              </p>

              {googlePlaceId && googleApiKey && (
                <div className="space-y-2">
                  <button
                    onClick={fetchGoogleReviews}
                    disabled={loadingGoogleReviews}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingGoogleReviews ? 'Loading...' : '🔄 Refresh Google Reviews'}
                  </button>
                  
                  <button
                    onClick={loadDemoGoogleReviews}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    📋 Load Demo Reviews (for testing)
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Why Your Review Matters</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌟</span>
                  <p className="text-sm text-gray-600">Help others discover quality learning</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💪</span>
                  <p className="text-sm text-gray-600">Support us in improving our services</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <p className="text-sm text-gray-600">Inspire others to start their journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Customer Reviews ({allReviews.length})
              </h2>
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {showReviews ? 'Hide' : 'Show'}
              </button>
            </div>

            {showReviews && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {allReviews.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  allReviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-4">
                        {review.profilePhoto ? (
                          <img src={review.profilePhoto} alt={review.author} className="w-12 h-12 rounded-full" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">{review.author}</p>
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                                <span className="text-xs text-gray-500">
                                  {formatDate(review.timestamp)}
                                </span>
                                {review.source === 'google' && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    Google
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12 text-white/80 text-sm">
          <p>© 2024 GrowHiveIndia. Empowering learners across India.</p>
        </div>
      </div>
    </div>
  );
};

export default GrowHiveReviewSystem;