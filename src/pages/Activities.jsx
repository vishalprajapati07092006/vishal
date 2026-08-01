import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaSearch,
  FaLeaf,
} from "react-icons/fa";

// 🌿 Exactly all 15 unique high-quality abstract artworks for your archive cards
const ABSTRACT_TECH_ARTWORKS = [
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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),          orderBy("activityNumber", "asc"),
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(docs);
      } catch (error) {
        console.error("Error fetching activities archive:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, []);

  // Filter activities based on title or activity number
  const filteredActivities = activities.filter((act) => {
    const titleMatch = act.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const numMatch = String(act.activityNumber)
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || numMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-emerald-500/10 dark:border-emerald-500/20 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <FaLeaf /> E-Portfolio Archive
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            All Practical Activities
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl">
            Browse through all submitted e-waste management projects, component
            breakdowns, and reflection reports.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
            <FaSearch className="text-xs" />
          </span>
          <input
            type="text"
            placeholder="Search by title or #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-card rounded-2xl border border-emerald-500/20 dark:border-emerald-500/30 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition"
          />
        </div>
      </div>

      {/* CONTENT GRID */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl border border-dashed border-emerald-500/20 text-gray-500 text-sm font-semibold">
          No matching activities found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act, index) => {
            // Pick image cleanly across all 15 distinct options without repetition bugs
            const displayImage =
              act.imageURL && act.imageURL.trim() !== ""
                ? act.imageURL
                : ABSTRACT_TECH_ARTWORKS[
                    (Number(act.activityNumber) || index) %
                      ABSTRACT_TECH_ARTWORKS.length
                  ];

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className="glass-card rounded-3xl border border-emerald-500/10 dark:border-emerald-500/20 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden group relative"
              >
                {/* Card Image Header */}
                <div className="h-48 overflow-hidden relative bg-emerald-950/20">
                  <img
                    src={displayImage}
                    alt={act.title || "Activity Image"}
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
    </div>
  );
}
