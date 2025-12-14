import React, { useRef, useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import CourseCard from "../components/CourseCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import FAQItem from "../components/FAQItem.jsx";
import { courses, products } from "../data/sampleData.js";
import { FaArrowRight, FaGraduationCap } from "react-icons/fa6";
import {
  FaPlay,
  FaCertificate,
  FaHeadset,
  FaMobileAlt,
  FaPlayCircle,
  FaCheck,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMedal,
} from "react-icons/fa";
import arushi from "../../public/arushi.jpeg";
import GrowHiveIndiaReview from "../components/GrowHiveIndiaReview.jsx";
import SuccessStories from "../components/SucessSotires.jsx";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Try to play video with audio when component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = false; // Unmute the video
          await videoRef.current.play();
        } catch (error) {
          // If autoplay with audio fails, fallback to muted autoplay
          console.log(
            "Autoplay with audio failed, falling back to muted:",
            error
          );
          videoRef.current.muted = true;
          videoRef.current
            .play()
            .catch((e) => console.log("Autoplay failed:", e));
        }
      }
    };

    playVideo();
  }, []);

  return (
    <>
      {/* Hero (simple) */}
      <section className="bg-gradient-to-br from-purple-700 to-emerald-500 text-white py-20 md:py-28 relative overflow-hidden">
        {/* <!-- Animated floating shapes --> */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-white opacity-10 floating-shape animate-float"></div>
          <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-white opacity-10 floating-shape animate-float-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-lg bg-white opacity-10 floating-shape animate-float"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-white opacity-10 floating-shape animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-10 w-16 h-16 rounded-lg bg-white opacity-10 floating-shape animate-float"></div>
        </div>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Launch Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                Learning Journey
              </span>{" "}
              Today
            </h1>

            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-xl">
              Explore premium courses & products to unlock your potential and
              achieve success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#courses"
                className="px-8 py-3 flex items-center gap-[10px] bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg text-center"
              >
                Browse Courses <FaArrowRight />
              </a>
              <a
                href="#products"
                className="px-8 py-3 flex items-center gap-[10px] border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 transition text-center"
              >
                Start Learning <FaPlay />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative animate-float">
              <video
                ref={videoRef}
                src="../../../video.mp4"
                autoPlay
                loop
                playsInline
                muted={true} // Start with audio enabled
                controls={true}
                className="rounded-2xl shadow-2xl max-w-md w-full h-[50%] border-8 border-white/20 rotate-2 cursor-pointer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FaMedal className="text-purple-700 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold">Bestseller Course</p>
                    <p className="text-sm text-gray-600">
                      Digital Marketing Masterclass
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Grow Faster With {" "}
              <span className="gradient-text">GrowHiveIndia</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our unique approach combines cutting-edge courses with premium
              products to accelerate your success journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaGraduationCap />,
                title: "Expert-Led Courses",
                text: "Learn from industry professionals with real-world experience.",
                clr: "bg-purple-100 text-purple-700",
              },
              {
                icon: <FaCertificate />,
                title: "Certification",
                text: "Get recognized certificates to boost your career profile.",
                clr: "bg-emerald-100 text-emerald-700",
              },
              {
                icon: <FaHeadset />,
                title: "24/7 Support",
                text: "Dedicated support team to help you anytime.",
                clr: "bg-amber-100 text-amber-700",
              },
              {
                icon: <FaMobileAlt />,
                title: "Premium Products",
                text: "Quality accessories to complement your learning.",
                clr: "bg-purple-100 text-purple-700",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-xl p-8 text-center text-[1rem] font-semibold hover:shadow-xl transition cursor-pointer card-glow"
              >
                <div
                  className={`w-20 h-20 ${f.clr} text-[2rem] rounded-2xl grid place-items-center mx-auto mb-6`}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {f.title}
                </h3>
                <p className="text-gray-600 font-medium">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white card-glow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: "50K+", t: "Students Enrolled", c: "text-purple-300" },
              { n: "100+", t: "Courses Available", c: "text-emerald-300" },
              { n: "25+", t: "Expert Instructors", c: "text-amber-300" },
              { n: "10K+", t: "Products Sold", c: "text-fuchsia-300" },
            ].map((s) => (
              <div key={s.t} className="hover:scale-105 transition-transform">
                <div
                  className={`text-4xl md:text-5xl font-extrabold mb-2 ${s.c}`}
                >
                  {s.n}
                </div>
                <p className="text-gray-300">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      {/* <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Learn & Grow"
            title="Featured"
            highlight="Courses"
            subTitle="Our unique approach combines cutting-edge courses with premium products to accelerate your success journey."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition font-bold inline-flex items-center"
            >
              View All Courses <i className="fas fa-arrow-right ml-2" />
            </a>
          </div>
        </div>
      </section> */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-2 animate-pulse">
                Learn & Grow
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 animate-fade-in">
                Featured <span className="gradient-text">Courses</span>
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:scale-105 transition-transform btn-hover">
                All
              </button>
              <button className="px-4 py-2 bg-white text-dark-700 rounded-lg hover:bg-gray-100 hover:scale-105 transition-transform">
                Business
              </button>
              <button className="px-4 py-2 bg-white text-dark-700 rounded-lg hover:bg-gray-100 hover:scale-105 transition-transform">
                Marketing
              </button>
              <button className="px-4 py-2 bg-white text-dark-700 rounded-lg hover:bg-gray-100 hover:scale-105 transition-transform">
                Tech
              </button>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl overflow-hidden shadow-md course-card hover-3d card-glow">
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Digital Marketing Course" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">Bestseller</div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center text-yellow-400 mb-1">
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star-half-alt hover:text-yellow-300"></i>
                                <span className="text-white text-sm ml-1">(1,245)</span>
                            </div>
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">4.9/5 Rating</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-dark-900">Digital Marketing MasterclassName</h3>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold hover:rotate-12 transition-transform">New</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Learn SEO, Social Media, PPC and more from industry experts</p>
                        <div className="flex items-center mb-4">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor" className="w-8 h-8 rounded-full mr-2 hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-600">By Rohan Sharma</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-lg font-bold text-dark-900">₹1,999</span>
                                <span className="text-sm text-gray-500 line-through ml-2">₹4,999</span>
                            </div>
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition transform hover:scale-105 btn-hover">
                                Enroll Now <i className="fas fa-arrow-right ml-1 icon-hover"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md course-card hover-3d card-glow">
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Business Course" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-secondary-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">Trending</div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center text-yellow-400 mb-1">
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="far fa-star hover:text-yellow-300"></i>
                                <span className="text-white text-sm ml-1">(892)</span>
                            </div>
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">4.0/5 Rating</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-dark-900">Startup Business Guide</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold hover:rotate-12 transition-transform">Free</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Step-by-step guide to launch your business in India</p>
                        <div className="flex items-center mb-4">
                            <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Instructor" className="w-8 h-8 rounded-full mr-2 hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-600">By Priya Patel</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-lg font-bold text-green-600">FREE</span>
                                <span className="text-sm text-gray-500 line-through ml-2">₹2,499</span>
                            </div>
                            <button className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition transform hover:scale-105 btn-hover">
                                Enroll Now <i className="fas fa-arrow-right ml-1 icon-hover"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md course-card hover-3d card-glow">
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Social Media Course" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">Popular</div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center text-yellow-400 mb-1">
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <i className="fas fa-star hover:text-yellow-300"></i>
                                <span className="text-white text-sm ml-1">(2,134)</span>
                            </div>
                            <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition">5.0/5 Rating</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-dark-900">Social Media Growth Hacking</h3>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-bold hover:rotate-12 transition-transform">Limited Seats</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Grow your Instagram, YouTube & Facebook organically</p>
                        <div className="flex items-center mb-4">
                            <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Instructor" className="w-8 h-8 rounded-full mr-2 hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-600">By Arjun Mehta</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-lg font-bold text-dark-900">₹2,499</span>
                                <span className="text-sm text-gray-500 line-through ml-2">₹5,999</span>
                            </div>
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition transform hover:scale-105 btn-hover">
                                Enroll Now <i className="fas fa-arrow-right ml-1 icon-hover"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition font-bold transform hover:scale-105 inline-flex items-center btn-hover"
            >
              View All Courses{" "}
              <i className="fas fa-arrow-right ml-2 icon-hover"></i>
            </a>
          </div>
        </div>
      </section>
      {/* Video Preview (static poster) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Preview
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Experience Our{" "}
              <span className="gradient-text">Teaching Style</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Get a taste of our premium courses with this free lesson from our
              Digital Marketing Masterclass.
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full grid place-items-center mr-3">
                  <FaCheck />
                </div>
                Practical, real-world examples
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full grid place-items-center mr-3">
                  <FaCheck />
                </div>
                Interactive assignments
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full grid place-items-center mr-3">
                  <FaCheck />
                </div>
                Downloadable resources
              </li>
            </ul>
            <a
              href="#"
              className="px-8 py-3 gap-[10px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold inline-flex items-center"
            >
              Start Free Trial <FaPlayCircle />
            </a>
          </div>
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1470&q=80"
                alt="Course Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 grid place-items-center">
                <button className="w-16 h-16 md:w-20 md:h-20 bg-white/80 text-purple-600 rounded-[25px] text-[1.5rem] hover:text-purple-700 rounded-full grid place-items-center hover:bg-white transition">
                  <FaPlay />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Premium Quality
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Featured
              <span className="gradient-text ms-[10px]">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your learning experience with our high-quality accessories
              and gadgets.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition font-bold inline-flex items-center"
            >
              View All Products <FaArrowRight className="ms-2" />
            </a>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-purple-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Transform Your{" "}
            <span className="text-amber-300">Skills & Career</span>?
          </h2>
          <p className="text-xl mb-8">
            Join over 50,000 learners who have accelerated their careers with
            GrowHiveIndia
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-8 py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg inline-flex items-center justify-center"
            >
              <FaGraduationCap className="text-xl mr-3" /> Start Learning Now
            </a>
            <a
              href="#products"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 transition inline-flex items-center justify-center"
            >
              <FaMobileAlt className="text-xl mr-3" /> Shop Smart Accessories
            </a>
          </div>
        </div>
      </section>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Hero Section */}
        <section className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Welcome to{" "}
              <span className="text-purple-700">Our Learning Hub</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Explore our curated courses designed to help you achieve your
              goals and enhance your skills with ease.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
              Get Started
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img
                src={arushi}
                alt="Learning Banner"
                className="rounded-2xl shadow-2xl w-full max-w-md h-auto border-8 border-white/20"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mt-20 w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <div className="relative hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img
                src="../../../sunny.jpeg"
                alt="About Learning"
                className="rounded-2xl shadow-xl w-full max-w-md h-auto"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About Our Platform
            </h2>
            <p className="text-gray-600 mb-4">
              We provide industry-focused learning materials and video tutorials
              crafted by experienced mentors. Our platform helps you stay ahead
              with up-to-date content in technology and innovation.
            </p>
            <p className="text-gray-600">
              Join thousands of learners already benefiting from our courses and
              take your career to the next level.
            </p>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="mt-20 w-full max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Meet Your Instructors
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img
                src="../../../arushi2.jpeg"
                alt="Instructor"
                className="rounded-2xl shadow-lg w-72 h-80 object-cover border-4 border-white"
              />
              <h3 className="text-xl font-semibold mt-4">Expert Mentor</h3>
              <p className="text-gray-600">Specialist in Web Development</p>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Need Help?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our courses and
              products.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQItem question="How do I enroll in a course?">
              Enrolling is simple! Browse the catalog, select a course and click
              "Enroll Now". Pay via card/UPI/net banking and get instant access.
            </FAQItem>
            <FAQItem question="Can I get a refund if I'm not satisfied?">
              Yes, 14-day money-back guarantee. Contact support within 14 days
              of enrollment.
            </FAQItem>
            <FAQItem question="Do you provide certificates after course completion?">
              All premium courses include verifiable certificates. Complete
              modules and pass final assessment with ≥ 70%.
            </FAQItem>
            <FAQItem question="How long do I have access to the courses?">
              Lifetime access to purchased courses, including future updates.
            </FAQItem>
            <FAQItem question="What payment methods do you accept?">
              Cards, UPI, net banking, wallets. COD available for most product
              orders in India.
            </FAQItem>
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition font-bold inline-flex items-center"
            >
              View All FAQs
              <FaArrowRight className="fas fa-arrow-right ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                  Stay Updated
                </h2>
                <p className="text-gray-600 mb-4">
                  Subscribe for course updates, exclusive discounts, and
                  learning tips.
                </p>
                <div className="flex gap-4 text-gray-700">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full grid place-items-center hover:bg-purple-600 hover:text-white transition"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full grid place-items-center hover:bg-sky-500 hover:text-white transition"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full grid place-items-center hover:bg-pink-600 hover:text-white transition"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full grid place-items-center hover:bg-red-600 hover:text-white transition"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 w-full">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition font-bold"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Review */}
      <section>
        <GrowHiveIndiaReview />
      </section>
      <section>
        <SuccessStories />
      </section>
    </>
  );
}
