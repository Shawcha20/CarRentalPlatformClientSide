import React from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Shield,
  Clock,
  MapPin,
  Headphones,
  CreditCard,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: Car,
      title: 'Wide Vehicle Selection',
      description:
        'Choose from our diverse fleet of well-maintained vehicles, from economy cars to luxury SUVs, all available at competitive prices.'
    },
    {
      id: 2,
      icon: Shield,
      title: 'Comprehensive Insurance',
      description:
        'All cars come with basic insurance coverage. Upgrade to full coverage for complete peace of mind during your rental period.'
    },
    {
      id: 3,
      icon: Clock,
      title: '24/7 Availability',
      description:
        'Book a car anytime, day or night. Our platform is available 24/7 for your convenience with flexible pickup and drop-off times.'
    },
    {
      id: 4,
      icon: MapPin,
      title: 'Multiple Locations',
      description:
        'Pick up and drop off your rental at any of our convenient locations across the city or airport terminals.'
    },
    {
      id: 5,
      icon: Headphones,
      title: 'Expert Support',
      description:
        'Our dedicated customer support team is always ready to assist you with any questions or concerns during your rental.'
    },
    {
      id: 6,
      icon: CreditCard,
      title: 'Easy Payment Options',
      description:
        'We accept all major credit cards, digital wallets, and bank transfers for your convenience and security.'
    },
    {
      id: 7,
      icon: Users,
      title: 'Host Your Car',
      description:
        'Want to earn extra income? List your vehicle on our platform and start earning from your unused car today.'
    },
    {
      id: 8,
      icon: Zap,
      title: 'Quick Booking Process',
      description:
        'Book your car in just 3 steps. Fast, simple, and secure process gets you on the road in minutes.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the best car rental services with our comprehensive solutions designed for your comfort and convenience
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon Container */}
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon size={32} className="text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Ready to rent your perfect car?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="browse-cars" className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Browse Cars
            </Link>
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
