import React, { useState, useEffect } from 'react';
import logo from '../../public/logo1.jpeg'; 

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
  const [isLoading, setIsLoading] = useState(true);
  const [reviewStats, setReviewStats] = useState({
    total: 0,
    average: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0
  });

  // Storage key constants
  const STORAGE_KEYS = {
    WEBSITE_REVIEWS: 'growhive_website_reviews',
    GOOGLE_REVIEWS: 'growhive_google_reviews',
    GOOGLE_PLACE_ID: 'growhive_google_place_id',
    GOOGLE_API_KEY: 'growhive_google_api_key',
    REVIEW_COUNTER: 'growhive_review_counter'
  };

  useEffect(() => {
    loadAllReviews();
  }, []);

  useEffect(() => {
    calculateReviewStats();
  }, [submittedReviews, googleReviews]);

  // Initialize storage if not exists
  const initializeStorage = () => {
    if (typeof window !== 'undefined') {
      // Initialize localStorage with proper structure
      if (!localStorage.getItem(STORAGE_KEYS.WEBSITE_REVIEWS)) {
        localStorage.setItem(STORAGE_KEYS.WEBSITE_REVIEWS, JSON.stringify([]));
      }
      if (!localStorage.getItem(STORAGE_KEYS.GOOGLE_REVIEWS)) {
        localStorage.setItem(STORAGE_KEYS.GOOGLE_REVIEWS, JSON.stringify([]));
      }
      if (!localStorage.getItem(STORAGE_KEYS.REVIEW_COUNTER)) {
        localStorage.setItem(STORAGE_KEYS.REVIEW_COUNTER, '0');
      }
    }
  };

  // Generate unique review ID
  const generateReviewId = () => {
    const counter = parseInt(localStorage.getItem(STORAGE_KEYS.REVIEW_COUNTER) || '0') + 1;
    localStorage.setItem(STORAGE_KEYS.REVIEW_COUNTER, counter.toString());
    return `review_${Date.now()}_${counter}`;
  };

  // Load all reviews from storage
  const loadAllReviews = async () => {
    setIsLoading(true);
    try {
      initializeStorage();
      
      // Load website reviews
      const websiteReviewsData = localStorage.getItem(STORAGE_KEYS.WEBSITE_REVIEWS);
      if (websiteReviewsData) {
        const parsedReviews = JSON.parse(websiteReviewsData);
        // Sort by date (newest first)
        const sortedReviews = parsedReviews.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        setSubmittedReviews(sortedReviews);
      }

      // Load Google reviews
      const googleReviewsData = localStorage.getItem(STORAGE_KEYS.GOOGLE_REVIEWS);
      if (googleReviewsData) {
        const parsedGoogleReviews = JSON.parse(googleReviewsData);
        const sortedGoogleReviews = parsedGoogleReviews.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        setGoogleReviews(sortedGoogleReviews);
      }

      // Load Google settings
      const savedPlaceId = localStorage.getItem(STORAGE_KEYS.GOOGLE_PLACE_ID);
      const savedApiKey = localStorage.getItem(STORAGE_KEYS.GOOGLE_API_KEY);
      
      if (savedPlaceId) setGooglePlaceId(savedPlaceId);
      if (savedApiKey) setGoogleApiKey(savedApiKey);

    } catch (error) {
      console.error('Error loading reviews:', error);
      // Initialize with empty arrays on error
      setSubmittedReviews([]);
      setGoogleReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate review statistics
  const calculateReviewStats = () => {
    const allReviews = [...submittedReviews, ...googleReviews];
    const total = allReviews.length;
    
    if (total === 0) {
      setReviewStats({
        total: 0,
        average: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0
      });
      return;
    }

    const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / total;
    
    const ratings = allReviews.map(review => review.rating);
    const fiveStar = ratings.filter(r => r === 5).length;
    const fourStar = ratings.filter(r => r === 4).length;
    const threeStar = ratings.filter(r => r === 3).length;
    const twoStar = ratings.filter(r => r === 2).length;
    const oneStar = ratings.filter(r => r === 1).length;

    setReviewStats({
      total,
      average: parseFloat(average.toFixed(1)),
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar
    });
  };

  // Save website review
  const saveWebsiteReview = (reviewData) => {
    try {
      const existingReviews = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.WEBSITE_REVIEWS) || '[]'
      );
      
      const updatedReviews = [reviewData, ...existingReviews];
      localStorage.setItem(STORAGE_KEYS.WEBSITE_REVIEWS, JSON.stringify(updatedReviews));
      
      return true;
    } catch (error) {
      console.error('Error saving review:', error);
      return false;
    }
  };

  // Save Google reviews
  const saveGoogleReviews = (reviews) => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOOGLE_REVIEWS, JSON.stringify(reviews));
      return true;
    } catch (error) {
      console.error('Error saving Google reviews:', error);
      return false;
    }
  };

  // Save Google settings
  const saveGoogleSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOOGLE_PLACE_ID, googlePlaceId);
      localStorage.setItem(STORAGE_KEYS.GOOGLE_API_KEY, googleApiKey);
      return true;
    } catch (error) {
      console.error('Error saving Google settings:', error);
      return false;
    }
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
      id: generateReviewId(),
      rating,
      text: reviewText.trim() || 'No comment provided',
      author: reviewerName.trim(),
      timestamp: new Date().toISOString(),
      source: 'website',
      verified: false,
      profilePhoto: null
    };
    
    try {
      // Save to localStorage
      const saved = saveWebsiteReview(reviewData);
      
      if (saved) {
        // Update state
        setSubmittedReviews(prev => [reviewData, ...prev]);
        setShowThankYou(true);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setReviewText('');
          setReviewerName('');
          setRating(0);
          setShowThankYou(false);
        }, 2000);
      } else {
        alert('Failed to save review. Please try again.');
      }
      
    } catch (error) {
      console.error('Review submission error:', error);
      alert('An error occurred while submitting your review. Please try again.');
    }
  };

  const handleGoogleSetup = () => {
    const saved = saveGoogleSettings();
    if (saved) {
      alert('Google settings saved successfully!');
      setShowSetup(false);
      if (googlePlaceId && googleApiKey) {
        fetchGoogleReviews();
      }
    } else {
      alert('Failed to save settings. Please try again.');
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
      // Note: For production, you should use a backend proxy due to CORS restrictions
      const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=name,rating,reviews,user_ratings_total&key=${googleApiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status === 'OK' && data.result && data.result.reviews) {
        const formattedReviews = data.result.reviews.map(gr => ({
          id: `google_${gr.time}`,
          rating: gr.rating,
          text: gr.text,
          author: gr.author_name,
          timestamp: new Date(gr.time * 1000).toISOString(),
          source: 'google',
          verified: true,
          profilePhoto: gr.profile_photo_url || null
        }));
        
        // Save Google reviews
        saveGoogleReviews(formattedReviews);
        setGoogleReviews(formattedReviews);
        
        alert(`Successfully loaded ${formattedReviews.length} Google reviews!`);
      } else if (data.status === 'REQUEST_DENIED') {
        alert('API Key is invalid or Places API is not enabled. Please check your Google Cloud Console settings.');
      } else {
        alert('Could not fetch Google reviews. Error: ' + (data.status || 'Unknown error'));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error. For security reasons, Google Places API requires a backend server. Please make sure you have a backend proxy setup or use a server-side implementation.');
    } finally {
      setLoadingGoogleReviews(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes < 1 ? 'Just now' : `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const renderStars = (rating, size = 'sm') => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    };
    
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={sizes[size]}
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

  const exportReviews = () => {
    const dataStr = JSON.stringify(allReviews, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `growhive-reviews-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearAllReviews = () => {
    if (window.confirm('Are you sure you want to clear all reviews? This action cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEYS.WEBSITE_REVIEWS);
      localStorage.removeItem(STORAGE_KEYS.GOOGLE_REVIEWS);
      localStorage.setItem(STORAGE_KEYS.REVIEW_COUNTER, '0');
      setSubmittedReviews([]);
      setGoogleReviews([]);
      alert('All reviews have been cleared.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden">
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 h-40 md:w-60 md:h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 md:bottom-32 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-2xl"><img src={logo} alt="GrowHiveIndia Logo" /></div>
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
          
          {/* Review Stats */}
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{reviewStats.total}</div>
                <div className="text-sm text-white/80">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{reviewStats.average}</div>
                <div className="text-sm text-white/80">Average Rating</div>
                <div className="flex justify-center mt-1">
                  {renderStars(Math.round(reviewStats.average), 'sm')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{reviewStats.fiveStar}</div>
                <div className="text-sm text-white/80">5 Star Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{submittedReviews.length}</div>
                <div className="text-sm text-white/80">Website Reviews</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
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
                  onClick={handleGoogleSetup}
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
                    For production, you need a backend server to fetch reviews properly.
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
                </div>
              )}

              {/* Admin Controls */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Admin Controls</h4>
                <div className="flex gap-2">
                  <button
                    onClick={exportReviews}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg text-sm"
                  >
                    Export Reviews
                  </button>
                  <button
                    onClick={clearAllReviews}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg text-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>
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
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Customer Reviews ({reviewStats.total})
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    {renderStars(Math.round(reviewStats.average), 'md')}
                    <span className="text-gray-700 font-semibold">{reviewStats.average}/5</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">
                    {reviewStats.fiveStar} five star reviews
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {showReviews ? 'Hide' : 'Show'}
              </button>
            </div>

            {showReviews && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {allReviews.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="mx-auto mb-4 text-gray-400" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p className="text-lg mb-2">No reviews yet</p>
                    <p className="text-sm">Be the first to share your experience!</p>
                  </div>
                ) : (
                  allReviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-4">
                        {review.profilePhoto ? (
                          <img src={review.profilePhoto} alt={review.author} className="w-12 h-12 rounded-full" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center font-bold text-lg">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">{review.author}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {renderStars(review.rating)}
                                <span className="text-xs text-gray-500">
                                  {formatDate(review.timestamp)}
                                </span>
                                {review.source === 'google' && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    Google
                                  </span>
                                )}
                                {review.source === 'website' && (
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                    Website
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
          <p className="mt-1">Total Reviews: {reviewStats.total} • Average Rating: {reviewStats.average}/5</p>
        </div>
      </div>
    </div>
  );
};

export default GrowHiveReviewSystem;