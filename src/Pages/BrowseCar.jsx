import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CarCard from '../Components/CarCard';
import LoadingSpinner from '../Components/LoadingSpinner';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Mock data
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
      },
      {
        id: 2,
        name: 'BMW X5',
        category: 'SUV',
        description: 'Luxury SUV perfect for family trips',
        year: 2024,
        mileage: '3,000 miles',
        pricePerDay: 150,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1606611281303-38d6bf0f04a9?w=300&h=250&fit=crop',
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
      },
      {
        id: 7,
        name: 'Toyota Camry',
        category: 'Sedan',
        description: 'Dependable family sedan with great safety features',
        year: 2023,
        mileage: '12,000 miles',
        pricePerDay: 75,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1515355152591-314e2b4e5fbb?w=300&h=250&fit=crop',
      },
      {
        id: 8,
        name: 'Jeep Wrangler',
        category: 'SUV',
        description: 'Off-road ready adventure vehicle',
        year: 2024,
        mileage: '4,000 miles',
        pricePerDay: 140,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1492312368677-8d93c4312e49?w=300&h=250&fit=crop',
      },
      {
        id: 9,
        name: 'Tesla Model X',
        category: 'Electric',
        description: 'Futuristic electric SUV with falcon wing doors',
        year: 2024,
        mileage: '2,000 miles',
        pricePerDay: 180,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65b?w=300&h=250&fit=crop',
      }
    ];

    setCars(mockCars);
    setFilteredCars(mockCars);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = cars;

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(car => car.category.toLowerCase() === filterCategory.toLowerCase());
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCars(filtered);
  }, [filterCategory, sortBy, cars]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const categories = ['all', ...new Set(cars.map(car => car.category))];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Browse Our Fleet</h1>
          <p className="text-gray-600 text-lg">Find the perfect car for your needs</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Car Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Showing {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No cars found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
