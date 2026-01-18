import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import qr from '../../public/qr.jpeg';
import { 
  Star, 
  MessageCircle, 
  Users, 
  Award, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Filter,
  Calendar,
  ExternalLink,
  Quote,
  Sparkles,
  Heart,
  BookOpen,
  GraduationCap,
  Trophy,
  Target,
  Zap,
  Globe,
  Bookmark,
  Shield,
  Clock,
  ThumbsUp,
  MousePointerClick,
  BarChart3,
  CheckCircle,
  TrendingDown,
  Percent
} from 'lucide-react';

const GrowHiveGoogleReviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredReview, setHoveredReview] = useState(null);
  const [activeStat, setActiveStat] = useState(null);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0
  });
  const containerRef = useRef(null);

  // Sample reviews data
  const allReviews = [
    {
      id: 1,
      author: "Priya Sharma",
      rating: 5,
      text: "Excellent coaching institute! The faculty is very knowledgeable and supportive. My daughter's performance improved significantly after joining GrowHive. Highly recommended for competitive exam preparation!",
      timestamp: new Date('2024-01-10').toISOString(),
      role: "Parent of JEE Aspirant",
      achievement: "Secured AIR 450 in JEE",
      verified: true
    },
    {
      id: 2,
      author: "Rajesh Kumar",
      rating: 5,
      text: "Best institute in Varanasi for IIT-JEE preparation. The teaching methodology is outstanding and teachers are always available for doubt clearing sessions.",
      timestamp: new Date('2024-01-08').toISOString(),
      role: "Student",
      achievement: "98% in Board Exams",
      verified: true
    },
    {
      id: 3,
      author: "Anita Verma",
      rating: 4,
      text: "Very good learning environment. The study material provided is comprehensive and well-structured. My son is doing much better in physics and mathematics now.",
      timestamp: new Date('2024-01-05').toISOString(),
      role: "Parent",
      achievement: "Improved by 40% in Maths",
      verified: true
    },
    {
      id: 4,
      author: "Vikram Singh",
      rating: 5,
      text: "GrowHive has been instrumental in my NEET preparation. The mock tests and regular assessments help track progress effectively. Teachers are passionate and dedicated!",
      timestamp: new Date('2023-12-28').toISOString(),
      role: "NEET Aspirant",
      achievement: "NEET Score: 685/720",
      verified: true
    },
    {
      id: 5,
      author: "Sneha Gupta",
      rating: 5,
      text: "Amazing experience! The personalized attention given to each student is commendable. The doubt clearing sessions are very helpful. Thank you GrowHive team!",
      timestamp: new Date('2023-12-22').toISOString(),
      role: "Student",
      achievement: "District Topper",
      verified: true
    },
    {
      id: 6,
      author: "Amit Pandey",
      rating: 4,
      text: "Good coaching center with experienced faculty. The infrastructure is also quite good. Would recommend for students preparing for competitive exams.",
      timestamp: new Date('2023-12-15').toISOString(),
      role: "Parent",
      achievement: "Scholar Award Winner",
      verified: true
    },
    {
      id: 7,
      author: "Neha Mishra",
      rating: 5,
      text: "Joined GrowHive for foundation course and it's been an excellent decision. The teachers explain concepts very clearly and the study material is top-notch!",
      timestamp: new Date('2023-12-10').toISOString(),
      role: "Student",
      achievement: "Perfect 100 in Maths",
      verified: true
    },
    {
      id: 8,
      author: "Sanjay Tiwari",
      rating: 5,
      text: "Outstanding coaching institute! My son's confidence has improved tremendously. The regular parent-teacher meetings keep us updated on his progress.",
      timestamp: new Date('2023-12-05').toISOString(),
      role: "Parent",
      achievement: "State Rank Holder",
      verified: true
    },
    {
      id: 9,
      author: "Pooja Yadav",
      rating: 4,
      text: "Very satisfied with the teaching quality. The batch size is perfect which ensures individual attention. The teachers are very approachable and helpful.",
      timestamp: new Date('2023-11-28').toISOString(),
      role: "Student",
      achievement: "International Olympiad",
      verified: true
    },
    {
      id: 10,
      author: "Rahul Dubey",
      rating: 5,
      text: "Best decision to enroll in GrowHive! The competitive environment motivates you to perform better. Regular tests and detailed analysis help identify weak areas.",
      timestamp: new Date('2023-11-20').toISOString(),
      role: "JEE Aspirant",
      achievement: "AIIMS MBBS Selected",
      verified: true
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
    
    // Calculate stats
    const calculateStats = () => {
      const total = allReviews.length;
      const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
      const average = (sum / total).toFixed(1);
      
      const fiveStar = allReviews.filter(r => r.rating === 5).length;
      const fourStar = allReviews.filter(r => r.rating === 4).length;
      const threeStar = allReviews.filter(r => r.rating === 3).length;
      const twoStar = allReviews.filter(r => r.rating === 2).length;
      const oneStar = allReviews.filter(r => r.rating === 1).length;

      return { total, average, fiveStar, fourStar, threeStar, twoStar, oneStar };
    };

    setStats(calculateStats());
    
    // Generate floating educational icons
    const icons = [
      { icon: BookOpen, color: 'text-blue-400', x: 10, y: 20 },
      { icon: GraduationCap, color: 'text-purple-400', x: 85, y: 30 },
      { icon: Trophy, color: 'text-yellow-400', x: 15, y: 70 },
      { icon: Target, color: 'text-red-400', x: 75, y: 65 },
      { icon: Zap, color: 'text-cyan-400', x: 40, y: 85 },
      { icon: Globe, color: 'text-green-400', x: 60, y: 15 },
    ];
    setFloatingIcons(icons);
  }, []);

  const filteredReviews = filterRating === 'all' 
    ? allReviews 
    : allReviews.filter(r => r.rating === parseInt(filterRating));

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 6);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderStars = (rating, size = 'md') => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    };
    
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizes[size]} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getRatingPercentage = (count) => {
    return ((count / stats.total) * 100).toFixed(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const ratingData = [
    { rating: 5, label: "Excellent", count: stats.fiveStar, color: "from-green-400 to-emerald-500" },
    { rating: 4, label: "Very Good", count: stats.fourStar, color: "from-blue-400 to-cyan-500" },
    { rating: 3, label: "Good", count: stats.threeStar, color: "from-yellow-400 to-orange-500" },
    { rating: 2, label: "Average", count: stats.twoStar, color: "from-orange-400 to-red-500" },
    { rating: 1, label: "Poor", count: stats.oneStar, color: "from-red-400 to-pink-500" }
  ];

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-24 h-24 mb-8 relative"
          >
            <div className="absolute inset-0 border-4 border-transparent border-t-white border-r-white rounded-full" />
            <div className="absolute inset-4 border-4 border-transparent border-b-purple-400 border-l-purple-400 rounded-full" />
            <div className="absolute inset-8 border-4 border-transparent border-t-pink-400 border-r-pink-400 rounded-full" />
          </motion.div>
          
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="text-center"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent mb-4">
              Loading Excellence...
            </h2>
            <p className="text-white/70">Preparing your success stories</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        {floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            variants={floatVariants}
            animate="float"
            style={{
              left: `${Icon.x}%`,
              top: `${Icon.y}%`,
            }}
            className="absolute"
          >
            <Icon.icon className={`w-8 h-8 ${Icon.color} opacity-20`} />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Particle Container */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16 relative"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center gap-3 mb-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-lg px-8 py-4 rounded-2xl border border-white/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-pink-500/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="w-6 h-6 text-yellow-300 relative z-10" />
            <span className="text-white font-bold text-xl tracking-wider relative z-10">
              GOOGLE REVIEWS
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-yellow-300 rounded-full relative z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative inline-block"
          >
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent relative">
                GrowHive India
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-2 -right-2 text-4xl"
                >
                  ✨
                </motion.span>
              </span>
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full mx-auto mb-6"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-2xl md:text-3xl text-white/90 font-light tracking-wide"
            >
              Where <span className="font-bold text-yellow-300">Dreams</span> Transform into{' '}
              <span className="font-bold text-cyan-300">Reality</span>
            </motion.p>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1
            }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-6 mt-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl px-10 py-6 rounded-3xl border border-white/20 shadow-2xl"
          >
            <div className="text-center">
              <div className="flex items-baseline gap-2">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-7xl font-black text-white"
                >
                  {stats.average}
                </motion.span>
                <span className="text-white/70 text-2xl">/5.0</span>
              </div>
              {renderStars(Math.round(stats.average), 'xl')}
            </div>
            
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white font-bold">Verified Reviews</span>
              </div>
              <p className="text-white/80 text-lg">
                <span className="text-yellow-300 font-bold text-2xl">{stats.total}+</span> Success Stories
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white/60 text-sm">Updated Daily</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* Left Panel - Stats & QR */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Enhanced Performance Analytics Card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Performance Analytics</h3>
              </motion.div>
              
              {/* Rating Distribution with Fixed Counts */}
              <div className="space-y-6">
                {ratingData.map((item, index) => {
                  const percentage = getRatingPercentage(item.count);
                  return (
                    <motion.div
                      key={item.rating}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {renderStars(1, 'sm')}
                            <span className="font-bold text-gray-800 text-lg">{item.rating}.0</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{item.count}</span>
                          <span className="text-sm text-gray-500">reviews</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                        >
                          <motion.div
                            animate={{ 
                              x: ["0%", "100%"] 
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{percentage}% of total</span>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Overall Satisfaction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-bold text-gray-800 text-lg">Overall Satisfaction</div>
                      <div className="text-sm text-gray-600">Based on {stats.total} verified reviews</div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="text-right"
                  >
                    <div className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      99%
                    </div>
                    <div className="text-sm text-gray-600">Excellent</div>
                  </motion.div>
                </div>
                
                {/* Satisfaction Meter */}
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "99%" }}
                    transition={{ duration: 2, delay: 1.2 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
                  >
                    <motion.div
                      animate={{ 
                        x: ["0%", "100%"] 
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-6 h-6 bg-white border-4 border-green-500 rounded-full shadow-lg"
                    />
                  </div>
                </div>
                
                {/* Satisfaction Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Positive Growth</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">+12.5%</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Monthly Reviews</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">+24</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* QR Code Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4"
                  >
                    <MousePointerClick className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan to Share Your Journey</h2>
                  <p className="text-gray-600 mb-6">Help others discover excellence</p>
                </div>

                {/* QR Code */}
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  className="relative mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-inner"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-md" />
                  <div className="relative">
                    <img 
                      src={qr} 
                      alt="Scan to Review" 
                      className="w-full h-auto rounded-xl border-8 border-white shadow-2xl"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-3 -right-3"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Call to Action Button */}
                <motion.a
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="https://g.page/r/..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    Share Your Success Story
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, type: "spring" }}
            className="lg:col-span-2"
          >
            {/* Reviews Container */}
            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl"
                  >
                    <Bookmark className="w-8 h-8 text-purple-600" />
                  </motion.div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800">Success Stories</h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <span>Real experiences from our achievers</span>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-yellow-500"
                      >
                        ★
                      </motion.span>
                    </p>
                  </div>
                </div>

                {/* Filter */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-600 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                  <select 
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="relative pl-12 pr-10 py-4 bg-white/80 backdrop-blur-lg border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 font-semibold text-gray-700 appearance-none cursor-pointer text-lg"
                  >
                    <option value="all">🎯 All Success Stories</option>
                    <option value="5">🏆 Top Achievers (5★)</option>
                    <option value="4">⭐ Excellent Performers (4★)</option>
                    <option value="3">👍 Satisfied Learners (3★)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
                </motion.div>
              </div>

              {/* Reviews Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6 mb-10 max-h-[800px] overflow-y-auto pr-2"
              >
                <AnimatePresence>
                  {displayedReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ 
                        scale: 1.03,
                        transition: { duration: 0.3 }
                      }}
                      onHoverStart={() => setHoveredReview(review.id)}
                      onHoverEnd={() => setHoveredReview(null)}
                      className="relative group cursor-pointer"
                    >
                      {/* Card Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Main Card */}
                      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-7 border-2 border-transparent group-hover:border-purple-200 transition-all duration-300 shadow-lg group-hover:shadow-2xl overflow-hidden">
                        {/* Achievement Badge */}
                        {review.achievement && (
                          <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-4 right-4"
                          >
                            <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                              <span className="font-bold text-white text-sm flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                {review.achievement}
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {/* Author Section */}
                        <div className="flex items-start gap-5 mb-5">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="relative"
                          >
                            <div className="relative w-16 h-16">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-spin-slow" />
                              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                  {review.author.charAt(0)}
                                </span>
                              </div>
                            </div>
                            
                            {review.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </motion.div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-gray-800 text-xl mb-1">{review.author}</h3>
                                <div className="flex items-center gap-2">
                                  <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                                    <span className="text-sm font-medium text-purple-700">{review.role}</span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                                <span className="font-bold text-gray-800 text-lg">{review.rating}.0</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{formatDate(review.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Review Content */}
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-purple-300 opacity-50" />
                          <motion.p
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-700 text-lg leading-relaxed pl-6 italic"
                          >
                            "{review.text}"
                          </motion.p>
                          <Quote className="absolute -bottom-2 -right-2 w-6 h-6 text-purple-300 opacity-50 rotate-180" />
                        </div>
                        
                        {/* Interactive Elements */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                            >
                              <ThumbsUp className="w-5 h-5" />
                              <span className="text-sm font-medium">Helpful</span>
                            </motion.button>
                          </div>
                          
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"
                          >
                            <MessageCircle className="w-5 h-5 text-purple-600" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Load More Button */}
              {filteredReviews.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                  </div>
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-4 text-lg">
                      {showAllReviews ? (
                        <>
                          Show Less Stories
                          <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Load More Success Stories ({filteredReviews.length - 6} More)
                          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </>
                      )}
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="relative overflow-hidden rounded-3xl mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 backdrop-blur-lg" />
          <div className="absolute inset-0">
            <div className="w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl absolute -top-32 -left-32" />
            <div className="w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl absolute -bottom-32 -right-32" />
          </div>
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-12">
            {[
              { 
                icon: Users, 
                value: `${stats.total}+`, 
                label: "Transformed Lives",
                color: "from-blue-500 to-cyan-500",
                description: "Students & Parents"
              },
              { 
                icon: Trophy, 
                value: `${stats.fiveStar}+`, 
                label: "Top Achievers",
                color: "from-yellow-500 to-orange-500",
                description: "5-Star Success Stories"
              },
              { 
                icon: TrendingUp, 
                value: "99.8%", 
                label: "Success Rate",
                color: "from-green-500 to-emerald-500",
                description: "Career Advancement"
              },
              { 
                icon: Award, 
                value: `${stats.average}/5`, 
                label: "Excellence Score",
                color: "from-purple-500 to-pink-500",
                description: "Average Rating"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center group cursor-pointer"
                onHoverStart={() => setActiveStat(index)}
                onHoverEnd={() => setActiveStat(null)}
              >
                <motion.div
                  animate={activeStat === index ? { rotateY: 360 } : {}}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${stat.color} mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <stat.icon className="w-12 h-12 text-white relative z-10" />
                </motion.div>
                <div className="text-5xl font-black bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-bold text-xl mb-2">{stat.label}</div>
                <div className="text-white/70 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center relative"
        >
          {/* Animated Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400"
            />
            <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
          
          <motion.h3
            variants={pulseVariants}
            animate="pulse"
            className="text-2xl font-bold text-white mb-4"
          >
            🚀 Join India's Most Trusted Learning Community
          </motion.h3>
          
          <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
            Where every student's potential is nurtured, every dream is valued, 
            and every success story begins with quality education.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-lg rounded-2xl border border-white/20"
          >
            <Heart className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
            <span className="text-white font-medium">
              Proudly shaping futures since 2020 • 5000+ successful alumni
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-cyan-400"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for Additional Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default GrowHiveGoogleReviews;