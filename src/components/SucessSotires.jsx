import React, { useState, useEffect } from "react";
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
  FaYoutube
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Footer from "../components/Footer"; // Assuming Footer is imported

const SuccessStories = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedStory, setSelectedStory] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Enhanced success stories data
  const successStories = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Digital Marketing Expert",
      company: "Amazon India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      story: "After completing the Digital Marketing course, I secured a position at Amazon with a 300% salary hike. The practical training was invaluable!",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/example1",
      category: "digital-marketing",
      stats: { salary: "₹18 LPA", growth: "300%", duration: "6 months" }
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Financial Analyst",
      company: "Goldman Sachs",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w-400",
      story: "The Business & Finance course transformed my career. I went from an entry-level position to leading my own team in just 8 months.",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/example2",
      category: "business-finance",
      stats: { salary: "₹25 LPA", growth: "250%", duration: "8 months" }
    },
    {
      id: 3,
      name: "Arjun Kumar",
      role: "Full Stack Developer",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      story: "Zero coding background to Microsoft engineer in 1 year! The structured curriculum and mentor support made it possible.",
      rating: 4,
      videoUrl: "https://www.youtube.com/embed/example3",
      category: "technology",
      stats: { salary: "₹32 LPA", growth: "∞", duration: "12 months" }
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Social Media Strategist",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      story: "From being a college graduate with no direction to heading social media campaigns at Meta - GrowHiveIndia showed me the path.",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/example4",
      category: "digital-marketing",
      stats: { salary: "₹21 LPA", growth: "400%", duration: "9 months" }
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Entrepreneur",
      company: "EcoTech Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      story: "The personal development course gave me the confidence to start my own venture. Today we're a team of 50+ employees.",
      rating: 4,
      videoUrl: "https://www.youtube.com/embed/example5",
      category: "personal-development",
      stats: { revenue: "₹5 Cr", employees: "50+", duration: "2 years" }
    },
    {
      id: 6,
      name: "Ananya Gupta",
      role: "Data Scientist",
      company: "Google",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      story: "Transitioned from a traditional engineering background to AI/ML. The hands-on projects were exactly what recruiters were looking for.",
      rating: 5,
      videoUrl: "https://www.youtube.com/embed/example6",
      category: "technology",
      stats: { salary: "₹40 LPA", growth: "350%", duration: "10 months" }
    }
  ];

  // Stats for overall success
  const overallStats = [
    { value: "5000+", label: "Success Stories", icon: <FaUserGraduate /> },
    { value: "₹15L", label: "Avg. Salary Hike", icon: <FaChartLine /> },
    { value: "98%", label: "Placement Rate", icon: <FaBriefcase /> },
    { value: "50+", label: "Top Companies", icon: <FaAward /> }
  ];

  // Filter stories based on category
  const filteredStories = activeFilter === "all" 
    ? successStories 
    : successStories.filter(story => story.category === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-gray-900 to-gray-800 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Real stories from learners who transformed their careers with GrowHiveIndia
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              onClick={() => document.getElementById('stories-grid').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Stories
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {overallStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="text-4xl text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['all', 'digital-marketing', 'business-finance', 'personal-development', 'technology'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter === 'all' ? 'All Stories' : filter.replace('-', ' ').toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section id="stories-grid" className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < story.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                      <p className="text-purple-400 font-medium">{story.role}</p>
                      <p className="text-gray-400 text-sm">{story.company}</p>
                    </div>
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <FaPlay className="text-white" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{story.stats.salary}</div>
                      <div className="text-xs text-gray-400">Salary</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{story.stats.growth}</div>
                      <div className="text-xs text-gray-400">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{story.stats.duration}</div>
                      <div className="text-xs text-gray-400">Duration</div>
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <FaQuoteLeft className="text-purple-400 text-xl mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 italic">{story.story}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                      {story.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Video Testimonials</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Watch our learners share their journey in their own words
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            effect="fade"
            className="rounded-2xl overflow-hidden"
          >
            {successStories.slice(0, 3).map((story) => (
              <SwiperSlide key={story.id}>
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-gray-900/90 z-10"></div>
                  <div className="absolute inset-0 z-0">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                  <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-400 mb-6">
                      <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">{story.name}</h3>
                    <p className="text-xl text-purple-300 mb-6">{story.role} at {story.company}</p>
                    <div className="max-w-2xl mx-auto">
                      <p className="text-lg text-gray-200 mb-8 italic">"{story.story}"</p>
                    </div>
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
                    >
                      <FaPlay /> Watch Full Testimonial
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful learners and transform your career today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              >
                Explore Courses
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 border border-gray-700 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-700 transition-all"
              >
                Book Free Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video
                title="Success Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-2xl"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Success Story: Rahul Sharma</h3>
              <p className="text-gray-300">From beginner to Digital Marketing Expert at Amazon India</p>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

export default SuccessStories;