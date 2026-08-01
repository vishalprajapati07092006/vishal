import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaLeaf,
  FaExternalLinkAlt,
  FaAward,
  FaLayerGroup,
} from "react-icons/fa";

// 🌿 15 Unique, high-quality fallback images (E-Waste & Green Tech)
const DEFAULT_ACTIVITY_IMAGES = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80", // 1. Soft pastel rainbow fluid gradient
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // 2. Vibrant mint & emerald fluid wave
  "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=800&q=80", // 3. Clean white & sage green 3D wave
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80", // 4. Vibrant bright geometric mesh grid
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80", // 5. Soft light teal & cyan abstract gradient
  "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=800&q=80", // 6. Light emerald glowing abstract backdrop
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80", // 7. Light pastel smoke & fluid blend
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80", // 8. Bright vibrant abstract splash
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80", // 9. Soft cream & gold 3D abstract curve
  "https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&w=800&q=80", // 10. Multi-color pastel mesh gradient
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80", // 11. Light holographic 3D ribbon wave
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=80", // 12. Soft glowing tech light grid
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // 13. Radiant cyan & green fluid wave
  "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", // 14. Bright light neon geometric lines
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80", // 15. Light lilac & soft teal gradient wave
];

export default function Home() {
  const [latestActivities, setLatestActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),
          orderBy("activityNumber", "desc"),
          limit(15),
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestActivities(docs);
      } catch (error) {
        console.error("Error fetching live activities for home page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeActivities();
  }, []);

  return (
    <div className="space-y-24 py-12">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm"
            >
              <FaAward className="text-emerald-500" /> Academic E-Portfolio •
              E-Waste Management
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight"
            >
              Pioneering Sustainable <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Electronic Waste Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Comprehensive practical activities, device dissections, and
              sustainability reflections evaluated under institutional rubric
              standards.
            </motion.p>

            {/* Dynamic Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex flex-wrap gap-4"
            >
              {latestActivities.length > 0 ? (
                <Link
                  to={`/activities/${latestActivities[0].id}`}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition transform hover:-translate-y-1 active:scale-95"
                >
                  Explore Latest Activity #{latestActivities[0].activityNumber}
                  <FaArrowRight className="ml-2.5 text-xs" />
                </Link>
              ) : (
                <Link
                  to="/activities"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition transform hover:-translate-y-1 active:scale-95"
                >
                  Explore Activities
                  <FaArrowRight className="ml-2.5 text-xs" />
                </Link>
              )}

              <Link
                to="/activities"
                className="inline-flex items-center px-8 py-4 glass-card border border-emerald-500/20 dark:border-emerald-500/30 text-gray-800 dark:text-gray-200 font-extrabold rounded-2xl text-sm hover:border-emerald-500/50 transition transform hover:-translate-y-1"
              >
                <FaLayerGroup className="mr-2 text-emerald-500" /> Browse
                Archive
              </Link>
            </motion.div>
          </div>

          {/* Right Hero Image Blend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                alt="Greenery surrounding sustainable tech recycling"
                className="w-full h-full object-cover saturate-125 brightness-105 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 opacity-90" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC SHOWCASE WITH SMART IMAGE FALLBACK */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-emerald-500/10 dark:border-emerald-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <FaLeaf /> Live Practical Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Recent Submissions & Evidence
            </h2>
          </div>
          <Link
            to="/activities"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 group"
          >
            <span>View All Activities</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition duration-300" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
          </div>
        ) : latestActivities.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-dashed border-emerald-500/20 text-gray-500 text-sm font-semibold">
            No activities published yet. Use the Admin Dashboard to add entries!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestActivities.map((act, index) => {
              const displayImage =
                act.imageURL && act.imageURL.trim() !== ""
                  ? act.imageURL
                  : DEFAULT_ACTIVITY_IMAGES[
                      (Number(act.activityNumber) || index) %
                        DEFAULT_ACTIVITY_IMAGES.length
                    ];

              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card rounded-3xl border border-emerald-500/10 dark:border-emerald-500/20 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden group relative"
                >
                  {/* Card Image Header */}
                  <div className="h-48 overflow-hidden relative bg-emerald-950/20">
                    <img
                      src={displayImage}
                      alt={act.title || "Activity preview"}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.classList.add(
                          "bg-gradient-to-br",
                          "from-emerald-600/30",
                          "to-teal-900/50",
                        );
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition duration-300" />
                  </div>

                  {/* Badge Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-md border border-white/10 text-[10px] font-extrabold tracking-wider uppercase text-emerald-400">
                    Activity #{act.activityNumber || index + 1}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <FaCalendarAlt className="mr-1.5 opacity-80" />{" "}
                        {act.date || "Recent"}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-500 transition duration-300 line-clamp-1">
                        {act.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {act.objective || act.whatILearned || act.description}
                      </p>
                    </div>

                    <Link
                      to={`/activities/${act.id}`}
                      className="inline-flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-400 pt-3 border-t border-emerald-500/10 dark:border-emerald-500/20 transition-all duration-300"
                    >
                      <span>View Submission</span>
                      <FaExternalLinkAlt className="text-[10px] opacity-70 group-hover:opacity-100" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
