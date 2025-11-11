import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

export default function TopRatedSection() {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [topRatedCars, setTopRatedCars] = useState([]);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
    // Mock data - In real app, fetch from Firebase
    const mockCars = [
      {
        id: 1,
        name: 'Tesla Model 3',
        category: 'Electric',
        description: 'Premium electric sedan with advanced autopilot features',
        year: 2024,
        mileage: '5,000 miles',
        pricePerDay: 120,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&h=250&fit=crop',
        rating: 4.9
      },
      {
        id: 2,
        name: 'BMW X5',
        category: 'SUV',
        description: 'Luxury SUV perfect for family trips and adventures',
        year: 2024,
        mileage: '3,000 miles',
        pricePerDay: 150,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1606611281303-38d6bf0f04a9?w=300&h=250&fit=crop',
        rating: 4.8
      },
      {
        id: 3,
        name: 'Mercedes-Benz C-Class',
        category: 'Sedan',
        description: 'Elegant sedan combining style and performance',
        year: 2024,
        mileage: '2,000 miles',
        pricePerDay: 130,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=250&fit=crop',
        rating: 4.7
      },
      {
        id: 4,
        name: 'Audi A4',
        category: 'Sedan',
        description: 'German engineering meets modern luxury',
        year: 2023,
        mileage: '8,000 miles',
        pricePerDay: 110,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=300&h=250&fit=crop',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Honda Civic',
        category: 'Compact',
        description: 'Reliable and fuel-efficient for city driving',
        year: 2023,
        mileage: '15,000 miles',
        pricePerDay: 60,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=250&fit=crop',
        rating: 4.5
      },
      {
        id: 6,
        name: 'Porsche 911',
        category: 'Sports',
        description: 'High-performance sports car for thrill seekers',
        year: 2024,
        mileage: '1,000 miles',
        pricePerDay: 280,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=250&fit=crop',
        rating: 5.0
      }
    ];

    setFeaturedCars(mockCars.slice(0, 6));
    setTopRatedCars(mockCars.sort((a, b) => b.rating - a.rating).slice(0, 4));
    setLoading(false);
  }, []);

  return (
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Top Rated Cars
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 font-semibold"
            >
              Trusted by thousands of customers worldwide
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {topRatedCars.map((car) => (
              <motion.div
                key={car.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <div className="text-yellow-400">⭐ {car.rating}</div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{car.category}</p>
                  <Tooltip title="View full details" placement="top">
                    <Link
                      to={`/car-details/${car.id}`}
                      className="btn btn-sm btn-primary text-white w-full"
                    >
                      View Details
                    </Link>
                  </Tooltip>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      
  )
}
