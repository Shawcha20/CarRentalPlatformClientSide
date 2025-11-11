import React from 'react'
import { motion } from 'framer-motion';
export default function WhyrentUs() {
      const benefits = [
    {
      icon: '⚡',
      title: 'Quick Booking',
      description: 'Reserve your car in minutes with our streamlined booking process'
    },
    {
      icon: '🛡️',
      title: 'Full Insurance Coverage',
      description: 'Drive with confidence - comprehensive coverage on all vehicles'
    },
    {
      icon: '💰',
      title: 'Best Prices Guaranteed',
      description: 'Competitive rates with transparent pricing, no hidden charges'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your rental needs'
    }
  ];
  return (
   
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Why Rent With <span className="text-primary">Us</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-8 text-center h-full flex flex-col"
              >
                <div className="text-6xl mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
  
  )
}
