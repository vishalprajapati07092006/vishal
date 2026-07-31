import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AboutSubject from "./pages/AboutSubject";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Gallery from "./pages/Gallery";
import TimelinePage from "./pages/TimelinePage";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          
<div className="min-h-screen bg-mesh-light dark:bg-mesh-dark text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-subject" element={<AboutSubject />} />
                <Route path="/activities" element={<Activities />} />
                {/* Fixed path below to /activities/:id */}
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
