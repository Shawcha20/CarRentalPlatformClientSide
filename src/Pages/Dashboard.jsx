import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, List, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Addcar from './Addcar';
import Mylisting from './Mylisting';
import Mybookings from './Mybookings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: null
    },
    {
      id: 'add-car',
      label: 'Add Car',
      icon: Plus,
      description: 'List a new vehicle for rent'
    },
    {
      id: 'my-listings',
      label: 'My Listings',
      icon: List,
      description: 'Manage your car listings'
    },
    {
      id: 'my-bookings',
      label: 'My Bookings',
      icon: Calendar,
      description: 'View your booking history'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-gray-600">
            Manage your car listings, bookings, and rental activity all in one place
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {dashboardTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {dashboardTabs.slice(1).map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.div
                  key={tab.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {tab.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tab.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Open <ArrowRight size={16} className="ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
        >
          {activeTab === 'add-car' && (
            <div className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add a New Car for Rental
              </h2>
              <Addcar />
            </div>
          )}

          {activeTab === 'my-listings' && (
            <div className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                My Car Listings
              </h2>
              <Mylisting />
            </div>
          )}

          {activeTab === 'my-bookings' && (
            <div className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                My Bookings
              </h2>
              <Mybookings />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
