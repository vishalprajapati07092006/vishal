import React from "react";
import {
  FaGlobeAmericas,
  FaRecycle,
  FaShieldAlt,
  FaIndustry,
} from "react-icons/fa";

export default function AboutSubject() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          E-Waste & Environmental Management
        </h1>
        <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
          Understanding the global crisis of electronic waste and sustainable
          solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-emerald-50 dark:bg-eco-cardDark p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            What is E-Waste?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            E-Waste (Electronic Waste) encompasses discarded electrical or
            electronic devices. Used electronics which are destined for
            refurbishment, reuse, resale, salvage recycling through material
            recovery, or disposal are also considered e-waste.
          </p>
        </div>

        <div className="bg-emerald-50 dark:bg-eco-cardDark p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Why is it Important?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            Electronics contain hazardous materials such as lead, cadmium,
            beryllium, and brominated flame retardants. Improper disposal
            pollutes ecosystems, contaminates groundwater, and releases harmful
            toxins into the atmosphere.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Core Pillars
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white dark:bg-eco-cardDark border border-gray-100 dark:border-emerald-900/20 rounded-xl shadow-sm text-center">
            <FaGlobeAmericas className="text-3xl text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold mb-1 dark:text-white">UN SDG Goals</h3>
            <p className="text-xs text-gray-500">
              Supports Responsible Consumption & Production (Goal 12).
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-eco-cardDark border border-gray-100 dark:border-emerald-900/20 rounded-xl shadow-sm text-center">
            <FaRecycle className="text-3xl text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold mb-1 dark:text-white">Circular Economy</h3>
            <p className="text-xs text-gray-500">
              Designing for durability, repairability, and resource recovery.
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-eco-cardDark border border-gray-100 dark:border-emerald-900/20 rounded-xl shadow-sm text-center">
            <FaShieldAlt className="text-3xl text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold mb-1 dark:text-white">Safe Recycling</h3>
            <p className="text-xs text-gray-500">
              Standardized dismantling preventing heavy metal exposure.
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-eco-cardDark border border-gray-100 dark:border-emerald-900/20 rounded-xl shadow-sm text-center">
            <FaIndustry className="text-3xl text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold mb-1 dark:text-white">
              Extended Producer Responsibility
            </h3>
            <p className="text-xs text-gray-500">
              Mandating manufacturer take-back policies globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
