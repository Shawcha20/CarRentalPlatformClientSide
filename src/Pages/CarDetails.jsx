import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { showSuccess, showError, showConfirm } from '../utils/notifications';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock car data
  const car = {
    id: id,
    name: 'Tesla Model 3',
    category: 'Electric',
    description: 'Premium electric sedan with advanced autopilot features',
    year: 2024,
    mileage: '5,000 miles',
    pricePerDay: 120,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=600&h=400&fit=crop',
    features: ['Autopilot', 'Supercharger Compatible', 'Premium Sound System', 'Glass Roof', 'Advanced Safety', '310 Mile Range'],
    providerName: 'Premium Motors',
    providerEmail: 'contact@premiummotors.com',
    providerPhone: '+1-555-0123',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    doors: 4,
    engineCC: 'N/A',
    condition: 'Excellent'
  };

  const handleBooking = async (e) => {
    e.preventDefault();



    if (!startDate || !endDate) {
      showError('Please select start and end dates', 'Incomplete Form');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      showError('End date must be after start date', 'Invalid Dates');
      return;
    }

    const result = await showConfirm(
      `Book ${car.name} from ${startDate} to ${endDate}?\nTotal: $${(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) * car.pricePerDay}`,
      'Confirm Booking'
    );

    if (result.isConfirmed) {
      setLoading(true);
      try {
      
        await new Promise(resolve => setTimeout(resolve, 1500));
        showSuccess('Booking confirmed! Check your email for details.', 'Booking Successful');
        navigate('/my-bookings');
      } catch (error) {
        showError('Failed to complete booking', 'Error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </motion.div>

           
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{car.name}</h1>
                <p className="text-xl text-primary font-semibold mb-4">{car.category}</p>
                <p className="text-gray-700 mb-6 text-lg">{car.description}</p>

         
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Year', value: car.year },
                      { label: 'Transmission', value: car.transmission },
                      { label: 'Fuel Type', value: car.fuel },
                      { label: 'Seats', value: car.seats },
                      { label: 'Doors', value: car.doors },
                      { label: 'Condition', value: car.condition },
                      { label: 'Mileage', value: car.mileage }
                    ].map((spec, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{spec.label}</p>
                        <p className="text-lg font-semibold text-gray-800">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-primary mr-2 text-xl">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

               
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Provider Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-semibold text-gray-700">Provider:</span> {car.providerName}</p>
                    <p><span className="font-semibold text-gray-700">Email:</span> {car.providerEmail}</p>
                    <p><span className="font-semibold text-gray-700">Phone:</span> {car.providerPhone}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-8 h-fit"
            >
              <div className="bg-gray-50 rounded-lg shadow-md p-6 border-2 border-primary">
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-2">Price per day</p>
                  <p className="text-4xl font-bold text-primary">${car.pricePerDay}</p>
                </div>

                <div className="mb-2">
                  <span className={`badge ${car.status === 'available' ? 'badge-success' : 'badge-warning'} text-white`}>
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </span>
                </div>

                <form onSubmit={handleBooking} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {startDate && endDate && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Total Cost</p>
                      <p className="text-2xl font-bold text-primary">
                        ${(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) * car.pricePerDay}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)} day(s)
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || car.status !== 'available'}
                    className="btn btn-primary w-full text-white font-bold"
                  >
                    {loading ? 'Booking...' : 'Book Now'}
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  ✓ Free cancellation up to 24 hours before pickup
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetails;
