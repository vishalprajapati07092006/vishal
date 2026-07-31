import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaFilePdf,
  FaVideo,
  FaCalendarAlt,
  FaLeaf,
  FaLightbulb,
  FaBookOpen,
  FaBullseye,
  FaExternalLinkAlt,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

// Small reusable icon-badge used to the left of every section heading.
function SectionBadge({ icon, tone }) {
  const toneClasses = {
    cyan: "bg-cyan-500/10 border-cyan-400/30 text-cyan-600 dark:text-cyan-300",
    indigo: "bg-indigo-500/10 border-indigo-400/30 text-indigo-600 dark:text-indigo-300",
    amber: "bg-amber-500/10 border-amber-400/30 text-amber-600 dark:text-amber-300",
    emerald: "bg-emerald-500/10 border-emerald-400/30 text-emerald-600 dark:text-emerald-300",
    rose: "bg-rose-500/10 border-rose-400/30 text-rose-600 dark:text-rose-300",
    slate: "bg-slate-500/10 border-slate-400/30 text-slate-600 dark:text-slate-300",
  };
  return (
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center shrink-0 ${toneClasses[tone]}`}
    >
      <span className="text-lg sm:text-xl">{icon}</span>
    </div>
  );
}

function SectionHeading({ number, title, icon, tone }) {
  return (
    <div className="flex items-center gap-4">
      <SectionBadge icon={icon} tone={tone} />
      <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
        {number}. {title}
      </h2>
    </div>
  );
}

// Slow-drifting aurora glow adapted dynamically for both themes
function AuroraGlow() {
  return (
    <>
      <style>{`
        @keyframes auroraDriftA {
          0%   { transform: translate(-6%, -4%) scale(1); }
          50%  { transform: translate(4%, 6%) scale(1.15); }
          100% { transform: translate(-6%, -4%) scale(1); }
        }
        @keyframes auroraDriftB {
          0%   { transform: translate(5%, -6%) scale(1.05); }
          50%  { transform: translate(-5%, 4%) scale(0.95); }
          100% { transform: translate(5%, -6%) scale(1.05); }
        }
        @keyframes auroraDriftC {
          0%   { transform: translate(0%, 8%) scale(1); }
          50%  { transform: translate(-8%, -2%) scale(1.1); }
          100% { transform: translate(0%, 8%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="aurora-blob absolute -top-32 -left-24 w-[38rem] h-[38rem] rounded-full blur-[110px] opacity-25 dark:opacity-[0.18]"
          style={{
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            animation: "auroraDriftA 22s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute top-1/3 -right-32 w-[34rem] h-[34rem] rounded-full blur-[120px] opacity-20 dark:opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
            animation: "auroraDriftB 26s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute bottom-[-8rem] left-1/4 w-[40rem] h-[40rem] rounded-full blur-[130px] opacity-20 dark:opacity-[0.14]"
          style={{
            background: "radial-gradient(circle, #34d399 0%, transparent 70%)",
            animation: "auroraDriftC 30s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "activities", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setActivity({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Error fetching activity detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-slate-50 dark:bg-black transition-colors">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 animate-ping absolute" />
          <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-emerald-500 dark:border-emerald-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-center rounded-3xl space-y-4 shadow-xl">
        <p className="text-red-600 dark:text-red-400 font-bold text-lg">Activity submission not found.</p>
        <Link
          to="/activities"
          className="inline-flex items-center text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back to E-Portfolio Index
        </Link>
      </div>
    );
  }

  const reflection = activity.reflection || {};

  return (
    <div className="relative min-h-screen py-10 px-4 overflow-hidden flex flex-col justify-between bg-slate-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <AuroraGlow />

      {/* Top wave */}
      <div className="absolute top-0 inset-x-0 pointer-events-none opacity-10 dark:opacity-[0.08] overflow-hidden z-0">
        <svg
          className="w-full h-64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="topWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path
            fill="url(#topWaveGradient)"
            d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,197.3C672,224,768,256,864,250.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none opacity-10 dark:opacity-[0.08] overflow-hidden z-0 rotate-180">
        <svg
          className="w-full h-64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#topWaveGradient)"
            d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,197.3C672,224,768,256,864,250.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10 w-full flex-1">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/activities"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs hover:bg-emerald-500/20 transition duration-200 border border-emerald-500/20"
          >
            <FaArrowLeft className="mr-2" /> Back to E-Portfolio Index
          </Link>
        </motion.div>

        {/* Main Card */}
        <div className="relative rounded-[2rem] p-px bg-gradient-to-br from-emerald-500/30 via-teal-400/20 to-emerald-600/30 dark:from-emerald-400/40 dark:via-teal-400/20 dark:to-emerald-500/40 shadow-xl dark:shadow-[0_0_90px_-20px_rgba(16,185,129,0.45)]">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] p-6 sm:p-10 space-y-10 bg-white dark:bg-[#03110c] shadow-2xl dark:shadow-[0_30px_90px_-25px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-gray-200/80 dark:border-white/10"
          >
            {/* Header Section */}
            <header className="border-b border-gray-200 dark:border-white/10 pb-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 shadow-sm">
                  Activity #{activity.activityNumber || "1"}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-800 dark:text-teal-300 font-semibold">
                  <FaCalendarAlt /> {activity.date}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
                {activity.title}
              </h1>
            </header>

            {/* 1. Objective */}
            {activity.objective && (
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <SectionHeading number={1} title="Objective" icon={<FaBullseye />} tone="cyan" />
                <div className="p-6 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20">
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed font-medium">
                    {activity.objective}
                  </p>
                </div>
              </motion.section>
            )}

            {/* 2. Evidence & Attachments */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <SectionHeading number={2} title="Evidence" icon={<FaFileAlt />} tone="indigo" />

              {activity.imageURL && activity.imageURL.trim() !== "" && (
                <div className="overflow-hidden rounded-2xl border border-indigo-500/25 group relative shadow-xl bg-gray-100 dark:bg-slate-900">
                  <img
                    src={activity.imageURL}
                    alt={activity.title}
                    className="w-full max-h-[480px] object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                </div>
              )}

              {(activity.pdfURL || activity.videoURL) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {activity.pdfURL && (
                    <a
                      href={activity.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-rose-500/20 hover:-translate-y-0.5 transition duration-200"
                    >
                      <FaFilePdf className="text-base" /> Download Activity PDF Report
                      <FaExternalLinkAlt className="text-[10px] opacity-75" />
                    </a>
                  )}
                  {activity.videoURL && (
                    <a
                      href={activity.videoURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition duration-200"
                    >
                      <FaVideo className="text-base" /> Watch Demonstration Video
                      <FaExternalLinkAlt className="text-[10px] opacity-75" />
                    </a>
                  )}
                </div>
              )}
            </motion.section>

            {/* 3. What I Learned */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <SectionHeading number={3} title="What I Learned" icon={<FaLightbulb />} tone="amber" />
              <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 text-gray-700 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line font-normal">
                {activity.whatILearned || activity.description}
              </div>
            </motion.section>

            {/* 4. Sustainability Connection */}
            {activity.sustainabilityConnection && (
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <SectionHeading number={4} title="Sustainability Connection" icon={<FaLeaf />} tone="emerald" />
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 dark:from-emerald-950 dark:to-teal-950 text-white border border-emerald-500/30 shadow-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-400 pointer-events-none">
                    <FaLeaf className="text-8xl" />
                  </div>
                  <p className="text-emerald-100 text-sm leading-relaxed relative z-10">
                    {activity.sustainabilityConnection}
                  </p>
                </div>
              </motion.section>
            )}

            {/* 5. Reflection Grid */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <SectionHeading number={5} title="Reflection" icon={<FaUser />} tone="rose" />
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-2 hover:border-rose-500/40 transition">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-300">
                    What surprised me?
                  </h3>
                  <p className="text-xs text-gray-700 dark:text-rose-100 leading-relaxed font-medium">
                    {reflection.surprised || "N/A"}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-2 hover:border-rose-500/40 transition">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-300">
                    What challenge did I face?
                  </h3>
                  <p className="text-xs text-gray-700 dark:text-rose-100 leading-relaxed font-medium">
                    {reflection.challenge || "N/A"}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-2 hover:border-rose-500/40 transition">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-300">
                    What will I do differently?
                  </h3>
                  <p className="text-xs text-gray-700 dark:text-rose-100 leading-relaxed font-medium">
                    {reflection.differently || "N/A"}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 6. References */}
            {activity.references && (
              <section className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
                <SectionHeading number={6} title="References" icon={<FaBookOpen />} tone="slate" />
                <p className="text-xs text-slate-700 dark:text-slate-300 italic font-mono p-4 rounded-xl bg-slate-500/5 dark:bg-slate-500/10 border border-slate-500/10">
                  {activity.references}
                </p>
              </section>
            )}
          </motion.article>
        </div>
      </div>
    </div>
  );
}