import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion";
import { FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TimelinePage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      const q = query(
        collection(db, "activities"),
        where("published", "==", true),
        orderBy("activityNumber", "asc"),
      );
      const snap = await getDocs(q);
      setActivities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchTimeline();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Semester Progress Timeline
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sequential roadmap of practical submissions
        </p>
      </div>

      <div className="relative border-l-2 border-emerald-500/30 ml-4 md:ml-32 space-y-12">
        {activities.map((act, idx) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-eco-dark">
              {act.activityNumber}
            </div>

            <div className="bg-white dark:bg-eco-cardDark p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/20 space-y-2">
              <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <FaCalendarCheck className="mr-1.5" />
                {act.date}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {act.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {act.description}
              </p>
              <Link
                to={`/activity/${act.id}`}
                className="inline-block text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
              >
                Read Full Entry →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
