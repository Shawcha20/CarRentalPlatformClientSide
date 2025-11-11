import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { showSuccess, showError, showConfirm } from '../utils/notifications';
import LoadingSpinner from '../Components/LoadingSpinner';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {

    const mockBookings = [
      {
        id: 1,
        carName: 'Tesla Model 3',
        carImage: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&h=250&fit=crop',
        startDate: '2024-11-20',
        endDate: '2024-11-25',
        status: 'upcoming',
        totalPrice: 600,
        providerName: 'Premium Motors',
        days: 5
      },
      {
        id: 2,
        carName: 'BMW X5',
        carImage: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&h=250&fit=crop',
        startDate: '2024-11-10',
        endDate: '2024-11-15',
        status: 'completed',
        totalPrice: 750,
        providerName: 'Luxury Rentals',
        days: 5
      },
      {
        id: 3,
        carName: 'Mercedes-Benz C-Class',
        carImage: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=250&fit=crop',
        startDate: '2024-11-25',
        endDate: '2024-12-02',
        status: 'upcoming',
        totalPrice: 910,
        providerName: 'Premium Motors',
        days: 7
      },
      {
        id: 4,
        carName: 'Audi A4',
        carImage: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=300&h=250&fit=crop',
        startDate: '2024-11-05',
        endDate: '2024-11-08',
        status: 'cancelled',
        totalPrice: 330,
        providerName: 'Quick Rentals',
        days: 3
      }
    ];

    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const handleCancelBooking = async (id) => {
    const booking = bookings.find(b => b.id === id);
    const result = await showConfirm(
      `Cancel booking for ${booking.carName}? This action cannot be undone.`,
      'Cancel Booking'
    );

    if (result.isConfirmed) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
      showSuccess('Booking cancelled successfully', 'Cancelled');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'badge-info';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600 text-lg">View and manage your car rentals</p>
        </motion.div>

   
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {['all', 'upcoming', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`btn ${
                filter === status
                  ? 'btn-primary text-white'
                  : 'btn-outline'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-12 text-center"
          >
            <p className="text-gray-600 text-lg">No {filter !== 'all' ? filter : ''} bookings found.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                  
                  <div className="md:col-span-1">
                    <img
                      src={booking.carImage}
                      alt={booking.carName}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                 
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{booking.carName}</h3>
                      <p className="text-gray-600">From {booking.providerName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Check-in Date</p>
                        <p className="font-semibold text-gray-800">{booking.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Check-out Date</p>
                        <p className="font-semibold text-gray-800">{booking.endDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-800">{booking.days} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <div className={`badge ${getStatusColor(booking.status)} text-white`}>
                          {getStatusLabel(booking.status)}
                        </div>
                      </div>
                    </div>
                  </div>

                
                  <div className="md:col-span-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-3xl font-bold text-primary">${booking.totalPrice}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ${booking.totalPrice / booking.days}/day
                      </p>
                    </div>

                    {booking.status === 'upcoming' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="btn btn-error text-white mt-4"
                      >
                        Cancel Booking
                      </button>
                    )}

                    {booking.status === 'completed' && (
                      <button className="btn btn-ghost mt-4">
                        Leave Review
                      </button>
                    )}

                    {booking.status === 'cancelled' && (
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        This booking was cancelled
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
