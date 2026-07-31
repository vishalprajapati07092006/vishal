import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaExternalLinkAlt, FaSearch, FaLayerGroup } from "react-icons/fa";

// 🎨 Sleek, eco-tech abstract artwork fallbacks (Matches Home & ActivityDetail)
const ABSTRACT_TECH_ARTWORKS = [
  
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop", // 1. Soft pastel rainbow fluid gradient
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // 2. Vibrant mint & emerald fluid wave
  "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1000&auto=format&fit=crop", // 3. Clean white & sage green 3D wave
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", // 4. Vibrant bright geometric mesh grid
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop", // 5. Soft light teal & cyan abstract gradient
  "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1920&auto=format&fit=crop", // 6. Light emerald glowing abstract backdrop
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000&auto=format&fit=crop", // 7. Light pastel smoke & fluid blend
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop", // 8. Bright vibrant abstract splash
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1000&auto=format&fit=crop", // 9. Soft cream & gold 3D abstract curve
  "https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1000&auto=format&fit=crop", // 10. Multi-color pastel mesh gradient
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", // 11. Light holographic 3D ribbon wave
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2400&auto=format&fit=crop", // 12. Soft glowing tech light grid
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // 13. Radiant cyan & green fluid wave
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop", // 14. Bright light neon geometric lines
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop", // 15. Light lilac & soft teal gradient wave

];

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const q = query(collection(db, "activities"), orderBy("activityNumber", "desc"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(docs);
      } catch (error) {
        console.error("Error fetching activities index:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities by title or objective search
  const filteredActivities = activities.filter(
    (act) =>
      act.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.objective?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.activityNumber?.toString().includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-500/10 dark:border-emerald-500/20 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FaLayerGroup /> E-Portfolio Repository
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Practical Activities & Evidence
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xl">
            Explore all practical submissions, hardware dissections, and sustainability evaluations.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-card border border-emerald-500/20 dark:border-emerald-500/30 text-xs font-medium text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl border border-dashed border-emerald-500/20 text-gray-500 text-sm font-semibold">
          {searchTerm ? "No matching activities found for your search query." : "No activities available."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act, index) => {
            // 💡 Matching Image Logic: Uses custom imageURL if provided, else falls back to index-matched abstract artwork
            const displayImage =
              act.imageURL && act.imageURL.trim() !== ""
                ? act.imageURL
                : ABSTRACT_TECH_ARTWORKS[
                    (Number(act.activityNumber) || index) % ABSTRACT_TECH_ARTWORKS.length
                  ];

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-3xl border border-emerald-500/10 dark:border-emerald-500/20 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group relative"
              >
                {/* Abstract Artwork or Custom Image Container */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={displayImage}
                    alt={act.title}
                    onError={(e) => {
                      e.target.src = ABSTRACT_TECH_ARTWORKS[0];
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition duration-300" />
                </div>

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-md border border-white/10 text-[10px] font-extrabold tracking-wider uppercase text-emerald-400">
                  Activity #{act.activityNumber || "1"}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <FaCalendarAlt className="mr-1.5 opacity-80" /> {act.date}
                    </div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-500 transition duration-300 line-clamp-1">
                      {act.title}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {act.objective || act.whatILearned || act.description}
                    </p>
                  </div>

                  <Link
                    to={`/activities/${act.id}`}
                    className="inline-flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-400 pt-3 border-t border-emerald-500/10 dark:border-emerald-500/20 transition-all duration-300"
                  >
                    <span>View Submission Details</span>
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