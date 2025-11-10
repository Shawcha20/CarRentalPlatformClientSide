import { div } from 'framer-motion/client'
import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../hooks/useAuth';
export default function FeaturedCarSection() {
  const {user}=useAuth();
  return (
    <div>
        <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              <span className="text-gradient">Featured Cars</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              Discover our newest additions to the fleet
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/browse-cars" className="btn btn-primary text-white">
              View All Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
