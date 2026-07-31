import React from "react";
import { FaLeaf, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white dark:bg-eco-dark border-t border-emerald-100 dark:border-emerald-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <FaLeaf className="text-emerald-500 text-xl" />
          <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
            E-Waste & Environmental Management Portfolio
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2026 Academic Submission. All rights reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition"
          title="Back to top"
        >
          <FaArrowUp className="text-xs" />
        </button>
      </div>
    </footer>
  );
}
