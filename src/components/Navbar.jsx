import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaLeaf,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUserLock,
  FaChartLine,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About Subject", path: "/about-subject" },
    { name: "Activities", path: "/activities" },
    
    { name: "About Me", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-emerald-500/10 dark:border-emerald-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:scale-110 transition duration-300">
            <FaLeaf className="text-lg animate-pulse" />
          </div>
          <span className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight">
            E-Waste
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent ml-0.5">
              Portfolio
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl border border-emerald-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}

          <div className="h-4 w-px bg-emerald-500/20 mx-2" />

          {/* Admin Dashboard / Login Icon */}
          {currentUser ? (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition duration-200"
            >
              <FaChartLine /> Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition duration-200"
              title="Admin Login"
            >
              <FaUserLock className="text-sm" />
            </Link>
          )}

          {/* Dark / Light Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-amber-500 dark:text-emerald-400 hover:scale-105 active:scale-95 transition duration-200"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-emerald-500/10 text-amber-500 dark:text-emerald-400"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="p-2 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {navOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-card border-t border-emerald-500/10 px-4 pt-2 pb-6 space-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setNavOpen(false)}
                className={`block py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === link.path
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-emerald-500/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to={currentUser ? "/admin" : "/login"}
                onClick={() => setNavOpen(false)}
                className="block text-center w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                {currentUser ? "Admin Dashboard" : "Admin Login"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}