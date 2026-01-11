import React, { useState, useEffect, useRef } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaUserGraduate,
  FaBriefcase,
  FaChartLine,
  FaAward,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaShare,
  FaCalendar,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBuilding,
  FaRocket
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

const SuccessStories = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedStory, setSelectedStory] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedStories, setLikedStories] = useState({});
  const scrollContainerRef = useRef(null);
  const storiesPerPage = 3;

  // Enhanced success stories data with more details
  const successStories = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Digital Marketing Expert",
      company: "Amazon India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      story: "After completing the Digital Marketing Masterclass at GrowHiveIndia, I secured a senior position at Amazon with a 300% salary hike. The practical training and real-world projects were exactly what recruiters were looking for. The mentorship program helped me build a strong portfolio that stood out.",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "digital-marketing",
      stats: { 
        salary: "₹18 LPA", 
        growth: "300%", 
        duration: "6 months",
        beforeSalary: "₹6 LPA",
        location: "Bangalore",
        course: "Digital Marketing Pro"
      },
      achievements: ["Top Performer Award", "Certified Expert", "Mentored 50+ students"],
      tags: ["Career Change", "Executive Level", "International Placement"]
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Financial Analyst",
      company: "Goldman Sachs",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      story: "The Business & Finance course completely transformed my career trajectory. Within 8 months, I went from an entry-level position to leading my own team. The industry connections and interview preparation sessions were invaluable. Today, I'm managing portfolios worth millions!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "business-finance",
      stats: { 
        salary: "₹25 LPA", 
        growth: "250%", 
        duration: "8 months",
        beforeSalary: "₹10 LPA",
        location: "Mumbai",
        course: "MBA Finance Accelerator"
      },
      achievements: ["Fast Track Promotion", "Stock Market Champion", "Risk Management Expert"],
      tags: ["Rapid Growth", "Leadership Role", "Global Exposure"]
    },
    {
      id: 3,
      name: "Arjun Kumar",
      role: "Full Stack Developer",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      story: "Coming from a non-technical background, I never thought I could become a software engineer. GrowHiveIndia's structured curriculum and hands-on projects made the impossible possible. The capstone project was featured in Microsoft's innovation showcase!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "technology",
      stats: { 
        salary: "₹32 LPA", 
        growth: "∞", 
        duration: "12 months",
        beforeSalary: "0",
        location: "Hyderabad",
        course: "Full Stack Development Bootcamp"
      },
      achievements: ["Microsoft Innovator", "Open Source Contributor", "Hackathon Winner"],
      tags: ["Career Starter", "Tech Innovator", "Silicon Valley"]
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Social Media Strategist",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      story: "Fresh out of college with no direction, GrowHiveIndia showed me the path to success. The social media marketing course taught me cutting-edge strategies that I now implement for Fortune 500 companies. My campaign went viral with 10M+ impressions!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "digital-marketing",
      stats: { 
        salary: "₹21 LPA", 
        growth: "400%", 
        duration: "9 months",
        beforeSalary: "₹5.25 LPA",
        location: "Delhi",
        course: "Social Media Mastery"
      },
      achievements: ["Viral Campaign", "Brand Ambassador", "Content Strategy Lead"],
      tags: ["Fresher Success", "Viral Marketing", "Brand Building"]
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Entrepreneur & Founder",
      company: "EcoTech Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      story: "The entrepreneurship program gave me the confidence and skills to start my own venture. From business plan to funding to scaling, every step was covered. Today, we're a team of 50+ employees solving environmental challenges!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "entrepreneurship",
      stats: { 
        revenue: "₹5 Cr", 
        growth: "500%", 
        duration: "2 years",
        beforeSalary: "₹12 LPA",
        location: "Chennai",
        course: "Startup Launchpad"
      },
      achievements: ["Forbes 30 Under 30", "Seed Funding Secured", "Sustainable Business Award"],
      tags: ["Entrepreneur", "Funding Success", "Sustainable Tech"]
    },
    {
      id: 6,
      name: "Ananya Gupta",
      role: "Data Scientist",
      company: "Google",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      story: "Transitioning from traditional engineering to AI/ML seemed daunting, but GrowHiveIndia made it seamless. The hands-on projects with real datasets were exactly what Google recruiters were looking for. I now lead AI initiatives impacting billions!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "technology",
      stats: { 
        salary: "₹40 LPA", 
        growth: "350%", 
        duration: "10 months",
        beforeSalary: "₹11.4 LPA",
        location: "Bangalore",
        course: "AI & Machine Learning Pro"
      },
      achievements: ["Google Innovator", "Research Paper Published", "Patent Filed"],
      tags: ["AI Expert", "Research", "Global Impact"]
    },
    {
      id: 7,
      name: "Rohan Mehta",
      role: "Product Manager",
      company: "Uber",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      story: "The product management course taught me to think like a CEO. From user research to launch strategy, every module was practical and industry-relevant. I now manage products used by millions daily!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "product-management",
      stats: { 
        salary: "₹35 LPA", 
        growth: "280%", 
        duration: "11 months",
        beforeSalary: "₹12.5 LPA",
        location: "San Francisco",
        course: "Product Management Masterclass"
      },
      achievements: ["Product Launch Success", "User Growth 200%", "Team Lead"],
      tags: ["Global Role", "Product Strategy", "UX Focus"]
    },
    {
      id: 8,
      name: "Kavya Nair",
      role: "UI/UX Designer",
      company: "Apple",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      story: "As a designer, I needed to upskill to compete globally. GrowHiveIndia's design thinking approach and industry mentorship helped me land my dream job at Apple. My designs now impact millions of users worldwide!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "design",
      stats: { 
        salary: "₹28 LPA", 
        growth: "320%", 
        duration: "7 months",
        beforeSalary: "₹8.75 LPA",
        location: "Cupertino",
        course: "UI/UX Design Pro"
      },
      achievements: ["Design Award", "Apple Design Team", "Portfolio Excellence"],
      tags: ["Creative", "International", "Design Leadership"]
    }
  ];

  // Stats for overall success
  const overallStats = [
    { value: "5000+", label: "Success Stories", icon: <FaUserGraduate />, color: "from-blue-500 to-cyan-500" },
    { value: "₹15L", label: "Avg. Salary Hike", icon: <FaChartLine />, color: "from-green-500 to-emerald-500" },
    { value: "98%", label: "Placement Rate", icon: <FaBriefcase />, color: "from-purple-500 to-pink-500" },
    { value: "50+", label: "Top Companies", icon: <FaBuilding />, color: "from-orange-500 to-red-500" },
    { value: "24/7", label: "Mentor Support", icon: <FaGraduationCap />, color: "from-indigo-500 to-blue-500" },
    { value: "100%", label: "Satisfaction", icon: <FaHeart />, color: "from-pink-500 to-rose-500" }
  ];

  // Filter stories based on category
  const filteredStories = activeFilter === "all" 
    ? successStories 
    : successStories.filter(story => story.category === activeFilter);

  // Calculate visible stories for pagination
  const visibleStories = filteredStories.slice(currentIndex * storiesPerPage, (currentIndex + 1) * storiesPerPage);

  // Toggle like for a story
  const toggleLike = (storyId) => {
    setLikedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
  };

  // Share story
  const shareStory = async (story) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.name}'s Success Story - GrowHiveIndia`,
          text: `Check out how ${story.name} transformed their career with GrowHiveIndia!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    }
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
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(Math.ceil(filteredStories.length / storiesPerPage) - 1, prev + 1));
  };

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Auto-rotate stories
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6">
                <FaRocket className="animate-pulse" />
                <span className="text-sm font-semibold">TRANSFORMING CAREERS SINCE 2015</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Success Stories
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                Real journeys of learners who transformed their careers and lives with GrowHiveIndia
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3"
                  onClick={() => document.getElementById('stories-grid').scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Explore Stories</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-3"
                >
                  {isPlaying ? (
                    <>
                      <div className="w-2 h-6 bg-purple-500 mx-[1px] animate-pulse"></div>
                      <div className="w-2 h-8 bg-pink-500 mx-[1px] animate-pulse"></div>
                      <div className="w-2 h-6 bg-blue-500 mx-[1px] animate-pulse"></div>
                      <span>Stop Auto-Play</span>
                    </>
                  ) : (
                    <>
                      <FaPlay />
                      <span>Auto-Play Stories</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 lg:grid-cols-6 gap-4"
            >
              {overallStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group`}
                >
                  <div className="text-4xl text-white mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {[
                { id: 'all', label: '✨ All Stories' },
                { id: 'digital-marketing', label: '📱 Digital Marketing' },
                { id: 'technology', label: '💻 Technology' },
                { id: 'business-finance', label: '📊 Business & Finance' },
                { id: 'entrepreneurship', label: '🚀 Entrepreneurship' },
                { id: 'product-management', label: '🎯 Product Management' },
                { id: 'design', label: '🎨 Design' }
              ].map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/30'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Success Stories Carousel */}
        <section id="stories-grid" className="py-20 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          
          <div className="container mx-auto px-4">
            {/* Header with Controls */}
            <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left mb-6 lg:mb-0"
              >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-3">
                  Featured Success Stories
                </h2>
                <p className="text-gray-400">
                  Showing {currentIndex * storiesPerPage + 1}-{Math.min((currentIndex + 1) * storiesPerPage, filteredStories.length)} of {filteredStories.length} incredible journeys
                </p>
              </motion.div>
              
              {/* Navigation Controls */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentIndex === 0
                        ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-110'
                    }`}
                  >
                    <FaArrowLeft />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={currentIndex >= Math.ceil(filteredStories.length / storiesPerPage) - 1}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentIndex >= Math.ceil(filteredStories.length / storiesPerPage) - 1
                        ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-110'
                    }`}
                  >
                    <FaArrowRight />
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {currentIndex + 1}<span className="text-gray-400 text-lg">/{Math.ceil(filteredStories.length / storiesPerPage)}</span>
                  </div>
                  <div className="text-xs text-gray-400">Page</div>
                </div>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 bg-gray-800 rounded-full mb-12 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${((currentIndex + 1) / Math.ceil(filteredStories.length / storiesPerPage)) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Stories Grid - Fixed Height Container */}
            <div className="relative">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

              {/* Fixed Height Scroll Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 px-4"
                style={{
                  height: '580px',
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <AnimatePresence mode="wait">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      exit="hidden"
                      className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)] min-w-[320px] md:min-w-[400px]"
                    >
                      <div className="h-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                        
                        {/* Story Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              <FaStar className="text-yellow-400" />
                              <span className="text-white font-bold">{story.rating}.0</span>
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                <FaBuilding className="text-white text-sm" />
                              </div>
                              <div>
                                <div className="text-white font-bold">{story.company}</div>
                                <div className="text-gray-300 text-sm">{story.stats.location}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Story Content */}
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                {story.name}
                              </h3>
                              <p className="text-purple-300 font-medium">{story.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleLike(story.id)}
                                className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                              >
                                <FaHeart className={`${likedStories[story.id] ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                              </button>
                              <button
                                onClick={() => shareStory(story)}
                                className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                              >
                                <FaShare className="text-gray-400 hover:text-blue-400" />
                              </button>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-gray-800/30 rounded-xl p-3 text-center">
                              <div className="text-lg font-bold text-white mb-1">{story.stats.salary}</div>
                              <div className="text-xs text-gray-400">Current Package</div>
                              <div className="text-xs text-green-400">+{story.stats.growth}</div>
                            </div>
                            <div className="bg-gray-800/30 rounded-xl p-3 text-center">
                              <div className="text-lg font-bold text-white mb-1">{story.stats.duration}</div>
                              <div className="text-xs text-gray-400">Journey Time</div>
                              <div className="text-xs text-blue-400">Accelerated</div>
                            </div>
                            <div className="bg-gray-800/30 rounded-xl p-3 text-center">
                              <div className="text-lg font-bold text-white mb-1">{story.stats.course}</div>
                              <div className="text-xs text-gray-400">Course Taken</div>
                              <div className="text-xs text-purple-400">Completed</div>
                            </div>
                          </div>

                          {/* Story Excerpt */}
                          <div className="mb-6">
                            <div className="flex items-start mb-3">
                              <FaQuoteLeft className="text-purple-400 text-xl mr-3 mt-1 flex-shrink-0" />
                              <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">
                                {story.story}
                              </p>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {story.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setSelectedStory(story)}
                              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                            >
                              <span>Read full story</span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              >
                                →
                              </motion.div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStory(story);
                                setIsVideoModalOpen(true);
                              }}
                              className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600/40 hover:to-pink-600/40 transition-all"
                            >
                              <FaPlay className="text-xs" />
                              Watch Story
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(filteredStories.length / storiesPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  Video Testimonials
                </span>
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Watch our learners share their transformative journeys in their own words
              </p>
            </motion.div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              spaceBetween={30}
              slidesPerView="auto"
              centeredSlides={true}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="!pb-12"
            >
              {successStories.slice(0, 4).map((story) => (
                <SwiperSlide key={story.id} className="!w-auto !h-[500px]">
                  <div className="relative h-full w-[350px] rounded-3xl overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{story.name}</h3>
                        <p className="text-purple-300">{story.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedStory(story);
                          setIsVideoModalOpen(true);
                        }}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:scale-110 transition-transform mx-auto mb-8 group-hover:scale-110"
                      >
                        <FaPlay className="text-white text-xl" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <div className="max-w-6xl mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-4xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 text-center overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <h2 className="text-5xl md:text-6xl font-bold mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-pink-300">
                      Ready to Write Your
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                      Success Story?
                    </span>
                  </h2>
                  <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of ambitious learners who transformed their careers with GrowHiveIndia
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Start Your Journey
                        <FaRocket className="group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-700/50 transition-all duration-300"
                    >
                      Book Free Career Consultation
                    </motion.button>
                  </div>
                  <p className="text-gray-400 mt-8 text-sm">
                    Join 50,000+ successful professionals who transformed with us
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative w-full max-w-6xl bg-gray-900 rounded-3xl overflow-hidden border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors text-xl"
                >
                  ✕
                </button>
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0"
                    title="Success Story"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-t-3xl"
                  ></iframe>
                </div>
                {selectedStory && (
                  <div className="p-8">
                    <div className="flex items-center gap-6 mb-6">
                      <img
                        src={selectedStory.image}
                        alt={selectedStory.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-purple-500"
                      />
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{selectedStory.name}</h3>
                        <p className="text-xl text-purple-300">{selectedStory.role} at {selectedStory.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      "{selectedStory.story}"
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Detail Modal */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedStory(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-gray-700 my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors text-xl"
                >
                  ✕
                </button>
                
                <div className="p-8">
                  {/* Hero Section */}
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-purple-500">
                        <img
                          src={selectedStory.image}
                          alt={selectedStory.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold">
                        {selectedStory.rating}.0 ★
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-4xl font-bold text-white mb-3">{selectedStory.name}</h3>
                      <p className="text-2xl text-purple-300 mb-2">{selectedStory.role}</p>
                      <div className="flex items-center gap-4 text-gray-400 mb-4">
                        <span className="flex items-center gap-2">
                          <FaBuilding /> {selectedStory.company}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt /> {selectedStory.stats.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaCalendar /> {selectedStory.stats.duration} Journey
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedStory.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800/30 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{selectedStory.stats.salary}</div>
                      <div className="text-sm text-gray-400">Current Package</div>
                      <div className="text-sm text-green-400">+{selectedStory.stats.growth}</div>
                    </div>
                    <div className="bg-gray-800/30 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{selectedStory.stats.beforeSalary}</div>
                      <div className="text-sm text-gray-400">Before Joining</div>
                      <div className="text-sm text-yellow-400">Starting Point</div>
                    </div>
                    <div className="bg-gray-800/30 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{selectedStory.stats.duration}</div>
                      <div className="text-sm text-gray-400">Transformation Time</div>
                      <div className="text-sm text-blue-400">Accelerated Growth</div>
                    </div>
                    <div className="bg-gray-800/30 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{selectedStory.stats.course}</div>
                      <div className="text-sm text-gray-400">Program Completed</div>
                      <div className="text-sm text-purple-400">Certified Expert</div>
                    </div>
                  </div>

                  {/* Full Story */}
                  <div className="bg-gray-800/20 rounded-2xl p-8 mb-8">
                    <div className="flex items-start mb-6">
                      <FaQuoteLeft className="text-purple-400 text-4xl mr-6 flex-shrink-0" />
                      <p className="text-xl text-gray-200 leading-relaxed italic">
                        "{selectedStory.story}"
                      </p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-white mb-6">Key Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedStory.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-4 border border-purple-500/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                              <FaAward className="text-white" />
                            </div>
                            <span className="text-white font-medium">{achievement}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-gray-700">
                    <button
                      onClick={() => {
                        setSelectedStory(null);
                        setIsVideoModalOpen(true);
                      }}
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                    >
                      <FaPlay /> Watch Video Testimonial
                    </button>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(selectedStory.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaHeart className={`${likedStories[selectedStory.id] ? 'text-red-500 fill-red-500' : ''}`} />
                        <span>{likedStories[selectedStory.id] ? 'Liked' : 'Like'}</span>
                      </button>
                      <button
                        onClick={() => shareStory(selectedStory)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaShare /> Share Story
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #8b5cf6, #ec4899) !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #8b5cf6 !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #ec4899 !important;
        }
      `}</style>
    </div>
  );
};

export default SuccessStories;