import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CarCard from '../Components/CarCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState(''); 
  const axiosSecure = useAxiosSecure();

  
  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get('/');
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, [axiosSecure]);

  
  useEffect(() => {
    let filtered = cars;

  
    if (filterCategory !== 'all') {
      filtered = filtered.filter(
        car => car.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }


    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(car =>
        car.car_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price_per_day - b.price_per_day);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price_per_day - a.price_per_day);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.car_name.localeCompare(b.car_name));
    }

    setFilteredCars(filtered);
  }, [filterCategory, sortBy, searchTerm, cars]);

  if (loading) return <LoadingSpinner />;

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

     
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
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

      
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Type a car name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Showing {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''}
        </motion.p>


        {filteredCars.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              No cars found matching your criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
