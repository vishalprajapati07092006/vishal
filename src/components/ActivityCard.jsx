import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaFilePdf,
  FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-eco-cardDark rounded-2xl shadow-lg border border-gray-100 dark:border-emerald-900/20 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {activity.imageURL && (
          <div className="h-48 w-full overflow-hidden relative">
            <img
              src={activity.imageURL}
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Activity #{activity.activityNumber}
            </span>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
            <FaCalendarAlt className="mr-1.5" />
            {activity.date}
            <span className="ml-auto bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              {activity.category || "General"}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {activity.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {activity.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-gray-100 dark:border-emerald-900/10 mt-auto">
        <div className="flex items-center justify-between pt-4">
          <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
            {activity.pdfURL && (
              <FaFilePdf
                className="text-red-500 text-lg"
                title="PDF Report Attached"
              />
            )}
            {activity.videoURL && (
              <FaVideo
                className="text-blue-500 text-lg"
                title="Video Available"
              />
            )}
          </div>
          <Link
            to={`/activity/${activity.id}`}
            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
          >
            View Details <FaExternalLinkAlt className="ml-1.5 text-xs" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
