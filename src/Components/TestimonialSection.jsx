import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
export default function TestimonialSection() {
      const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Business Executive',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'RentWheels made my business trip seamless. The car was pristine and delivery was on time!'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Adventure Enthusiast',
      image: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'Perfect fleet for road trips. Great customer service and reasonable prices. Highly recommended!'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Tourist',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'Exploring the city was so much easier with RentWheels. Best rental experience ever!'
    },
    {
      id: 4,
      name: 'David Williams',
      role: 'Wedding Planner',
      image: 'https://i.pravatar.cc/150?img=4',
      rating: 5,
      text: 'Used them for multiple client events. Consistently professional and reliable. 5 stars!'
    }
  ];
  return (
     
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold [data-theme=light_&]?text-secondary:text-gray-600 mb-4"
            >
              Customer <span className="text-primary">Testimonials</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="[data-theme=light_&]?text-secondary:text-gray-600"
            >
              What our satisfied customers say about us
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4 text-yellow-400">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
     
  )
}
