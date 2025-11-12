import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { showSuccess, showError, showConfirm } from '../utils/notifications';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../Components/LoadingSpinner';


const CarDetails = () => {
  const { id } = useParams();
  const {user}=useAuth();
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [car,setCar]=useState(null);

  const handleBooking = async (e) => {
    e.preventDefault();
  const result= await showConfirm(`Book ${car.car_name}  for ${car.price_per_day}`,'Confirm Booking')
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const booked_by=user.email;
        const patchData={booked_by}
        const response= await axiosSecure.patch(`/car-book/${id}`,patchData);
        console.log(response);
        showSuccess('Booking confirmed! Check your email for details.', 'Booking Successful');
        navigate('/my-bookings');
      } catch (error) {
        showError('Failed to complete booking', 'Error');
      } finally {
        setLoading(false);
      }
    }
  };

useEffect(() => {
  const getCarDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(`car-details/${id}`);
      setCar(response.data);
    } catch (error) {
      showError('Failed to fetch car details', 'Error');
    } finally {
      setLoading(false);
    }
  };
  getCarDetails();
}, [id]);
  if (!car) {
    return (
     <LoadingSpinner></LoadingSpinner>
    );
  }
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
                  src={car.image_url}
                  alt={car.car_name}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </motion.div>

           
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{car.car_name}</h1>
                <p className="text-xl text-primary font-semibold mb-4">{car.category}</p>
                <p className="text-gray-700 mb-6 text-lg">{car.description}</p>

         
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Year', value: car.year },
                      { label: 'Transmission', value: car.transmission },
                      { label: 'Fuel Type', value: car.fuel_type },
                      { label: 'Seats', value: car.seats },
                      { label: 'Doors', value: car.doors },
                      {label: 'Location'}
                    ].map((spec, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{spec.label}</p>
                        <p className="text-lg font-semibold text-gray-800">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

              

               
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Provider Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-semibold text-gray-700">Provider:</span> {car.name}</p>
                    <p><span className="font-semibold text-gray-700">Email:</span> {car.email}</p>
                    {/* <p><span className="font-semibold text-gray-700">Phone:</span> {car.providerPhone}</p> */}
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
                  <p className="text-4xl font-bold text-primary">${car.price_per_day}</p>
                </div>

                <div className="mb-2">
                  <span className={`badge ${car.status === 'Available' ? 'badge-success' : 'badge-warning'} text-white`}>
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </span>
                </div>

               
                  <button onClick={handleBooking} type="submit" disabled={loading || car.status !== 'Available'} className="btn btn-primary w-full text-white font-bold"  >
                    {loading ? 'Booking...' : 'Book Now'}
                  </button>
                

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
