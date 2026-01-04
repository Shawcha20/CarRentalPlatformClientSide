import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Car, Award } from 'lucide-react';

export default function StatisticsSection() {
  const statistics = [
    {
      id: 1,
      icon: Car,
      number: '2,500+',
      label: 'Vehicles Available',
      description: 'Premium cars in our fleet'
    },
    {
      id: 2,
      icon: Users,
      number: '50,000+',
      label: 'Happy Customers',
      description: 'Satisfied clients worldwide'
    },
    {
      id: 3,
      icon: Award,
      number: '4.9/5',
      label: 'Average Rating',
      description: 'Based on customer reviews'
    },
    {
      id: 4,
      icon: TrendingUp,
      number: '100K+',
      label: 'Successful Bookings',
      description: 'Completed rentals annually'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const CountUp = ({ end, duration = 2 }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      let start = 0;
      const increment = end / (duration * 60);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [end, duration]);

    return count;
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-white to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="  text-4xl font-bold mb-4 text-black">
            Our <span className="text-primary">Success</span> by the Numbers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best car rental service
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statistics.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* Background Blur Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card */}
                <div className="relative p-8 bg-white rounded-xl border border-gray-200 hover:border-primary transition-all duration-300 text-center">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors"
                  >
                    <Icon size={32} className="text-primary" />
                  </motion.div>

                  {/* Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                    className="mb-3"
                  >
                    <h3 className="text-4xl font-bold text-primary">
                      {stat.number}
                    </h3>
                  </motion.div>

                  {/* Label */}
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-primary/10 border border-primary/30 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Growing Every Day
          </h3>
          <p className="text-gray-700">
            Our numbers continue to grow as more customers trust us for their car rental needs. 
            Join our community and experience exceptional service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
