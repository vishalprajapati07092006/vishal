import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCode,
  FaServer,
  FaNetworkWired,
  FaBullseye,
  FaGraduationCap,
  FaLaptopCode,
} from "react-icons/fa";

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

function SectionBadge({ icon, tone }) {
  const toneClasses = {
    cyan: "bg-cyan-500/10 border-cyan-400/30 text-cyan-600 dark:text-cyan-300",
    indigo: "bg-indigo-500/10 border-indigo-400/30 text-indigo-600 dark:text-indigo-300",
    emerald: "bg-emerald-500/10 border-emerald-400/30 text-emerald-600 dark:text-emerald-300",
    amber: "bg-amber-500/10 border-amber-400/30 text-amber-600 dark:text-amber-300",
  };
  return (
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center shrink-0 ${toneClasses[tone]}`}
    >
      <span className="text-lg sm:text-xl">{icon}</span>
    </div>
  );
}

export default function AboutMe() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FaCode />,
      tone: "cyan",
      skills: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "HTML5 & CSS3", "Framer Motion"],
    },
    {
      title: "Backend & Database",
      icon: <FaServer />,
      tone: "indigo",
      skills: ["Node.js", "Express.js", "MySQL", "RESTful APIs", "Firebase Firestore"],
    },
    {
      title: "Computer Science Core",
      icon: <FaNetworkWired />,
      tone: "emerald",
      skills: ["Operating Systems", "Computer Networks", "Theory of Computation", "Data Structures"],
    },
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden flex flex-col justify-between bg-slate-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <AuroraGlow />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10 w-full flex-1">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-widest shadow-sm">
            Profile Overview
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
            About Me
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
            Passionate developer, student, and educator dedicated to building robust applications and exploring core computer science concepts.
          </p>
        </motion.div>

        {/* Main Card Container */}
        <div className="relative rounded-[2rem] p-px bg-gradient-to-br from-emerald-500/30 via-teal-400/20 to-emerald-600/30 dark:from-emerald-400/40 dark:via-teal-400/20 dark:to-emerald-500/40 shadow-xl dark:shadow-[0_0_90px_-20px_rgba(16,185,129,0.45)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] p-6 sm:p-10 space-y-10 bg-white dark:bg-[#03110c] shadow-2xl dark:shadow-[0_30px_90px_-25px_rgba(0,0,0,0.65)] border border-gray-200/80 dark:border-white/10"
          >
            {/* Bio Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <SectionBadge icon={<FaUser />} tone="emerald" />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  Introduction & Background
                </h2>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-4">
                <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  Hi everyone, myself <strong className="text-emerald-600 dark:text-emerald-400">Vishal Prajapati</strong>. I'm from INFT, B roll number <strong className="text-emerald-600 dark:text-emerald-400">24101B0047</strong>, studying in <strong className="text-emerald-600 dark:text-emerald-400">Vidyalankar Institute of Technology</strong>.
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  As an Information Technology student and tech enthusiast, I specialize in building full-stack applications, problem-solving, and maintaining a high standard of academic and technical rigor. This e-portfolio serves as a showcase of my technical projects, live practical submissions, and sustainable engineering initiatives.
                </p>
              </div>
            </section>

            {/* Qualifications Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <SectionBadge icon={<FaGraduationCap />} tone="indigo" />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  Qualifications & Academic Details
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 space-y-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                    Bachelor of Engineering (INFT)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Vidyalankar Institute of Technology | Roll No: 47 (UID: 24101B0047)
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 space-y-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                    Full-Stack & Systems Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Hands-on expertise developing full-stack web applications using React, Node.js, and database systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Skill Sets Grid */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <SectionBadge icon={<FaLaptopCode />} tone="cyan" />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  Technical Skill Sets
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {skillCategories.map((cat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 space-y-4 shadow-sm hover:border-emerald-500/40 transition duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-lg">
                        {cat.icon}
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                        {cat.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {cat.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Goals & Aspirations */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <SectionBadge icon={<FaBullseye />} tone="amber" />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  Goals & Aspirations
                </h2>
              </div>
              <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-3">
                <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  My primary objective is to engineer high-performance web systems and contribute to impactful software products. Academically, I aim to master advanced systems architecture and algorithms, continuously refining code quality to meet rigorous production standards.
                </p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}