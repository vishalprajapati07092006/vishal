import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaIdCard,
  FaUniversity,
  FaChalkboardTeacher,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Add your form submission logic here (e.g., EmailJS or Firebase)
  };

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden flex flex-col justify-between">
      {/* 🌊 Top Subtle Neon Green Wave Background Overlay */}
      <div className="absolute top-0 inset-x-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] overflow-hidden z-0">
        <svg
          className="w-full h-64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-emerald-400"
            d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,197.3C672,224,768,256,864,250.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* 🌊 Bottom Symmetric Neon Green Wave Background Overlay */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] overflow-hidden z-0 rotate-180">
        <svg
          className="w-full h-64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-emerald-400"
            d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,197.3C672,224,768,256,864,250.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10 w-full flex-1">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-black text-xs uppercase tracking-widest shadow-sm">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Contact & Student Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto font-medium">
            Feel free to reach out for inquiries, academic collaborations, or project discussions.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-2xl space-y-6 bg-slate-950/40 backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h2 className="text-lg font-black text-gray-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                Student Details
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <FaUserGraduate className="text-emerald-400 text-lg mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Full Name</span>
                    <span className="font-extrabold text-gray-900 dark:text-white">Vishal R. Prajapati</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <FaIdCard className="text-emerald-400 text-lg mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Roll Number</span>
                    <span className="font-extrabold text-gray-900 dark:text-white">24101B0047</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <FaUniversity className="text-emerald-400 text-lg mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Program</span>
                    <span className="font-extrabold text-gray-900 dark:text-white">B.Tech in Information Technology</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <FaChalkboardTeacher className="text-emerald-400 text-lg mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Class</span>
                    <span className="font-extrabold text-gray-900 dark:text-white">SEM 5 - INFT B</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <FaMapMarkerAlt className="text-emerald-400 text-lg mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Institution</span>
                    <span className="font-extrabold text-gray-900 dark:text-white">Vidyalankar Institute of Technology, Wadala</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Mediums */}
            <div className="pt-6 border-t border-emerald-500/10 space-y-3 text-xs font-semibold text-gray-300">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-400" />
                <span>vishal.prajapati@vit.edu.in</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-2xl bg-slate-950/40 backdrop-blur-xl flex flex-col justify-center"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-4 py-12"
              >
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-black text-white">Message Sent Successfully!</h3>
                <p className="text-gray-400 text-xs">
                  Thank you for reaching out. I will get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-black text-gray-900 dark:text-white border-l-4 border-emerald-500 pl-3 mb-4">
                  Send a Message
                </h2>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition duration-200"
                >
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}