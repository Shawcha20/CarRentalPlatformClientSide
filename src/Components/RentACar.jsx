import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

export default function RentACar() {
  return (
    
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Rent?</h2>
            <p className="text-lg mb-8 opacity-90">
              Browse our full fleet and find your perfect car today
            </p>
            <Link to="/browse-cars" className="btn btn-light text-primary font-bold">
              Browse Cars Now
            </Link>
          </motion.div>
        </div>
    
  )
}
