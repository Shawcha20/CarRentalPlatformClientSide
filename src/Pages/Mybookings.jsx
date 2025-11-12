import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { showSuccess, showError, showConfirm } from "../utils/notifications";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../hooks/useAuth";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const response = await axiosSecure.get(`/my-bookings/?email=${user.email}`);
        console.log("Bookings response:", response.data);
      
        setBookings(response.data.result || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        showError("Failed to load bookings", "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user, axiosSecure]);

 
  const handleCancelBooking = async (id) => {
    const booking = bookings.find((b) => b._id === id);
    if (!booking) return;

    const result = await showConfirm(
      `Cancel booking for ${booking.car_name}? This action cannot be undone.`,
      "Cancel Booking"
    );

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await axiosSecure.patch(`/my-bookings/${id}`);
        console.log("Cancel booking response:", response.data);

        if (response.status === 200 || response.status === 201) {
          setBookings((prev) => prev.filter((b) => b._id !== id));
          showSuccess("Booking cancelled successfully", "Cancelled");
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        showError("Failed to cancel booking", "Error");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

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

        {/* If no bookings found */}
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-12 text-center"
          >
            <p className="text-gray-600 text-lg">No bookings found.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                  
                  <div className="md:col-span-1">
                    <img
                      src={booking.image_url}
                      alt={booking.car_name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Car Info */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{booking.car_name}</h3>
                      <p className="text-gray-600">From {booking.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <div
                          className={`badge ${
                            booking.status.toLowerCase() === "available"
                              ? "badge-success"
                              : "badge-warning"
                          } text-white`}
                        >
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="md:col-span-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-3xl font-bold text-primary">
                        ${booking.price_per_day}
                      </p>
                    </div>

                    {booking.status.toLowerCase() === "booked" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn btn-error text-white mt-4"
                      >
                        Cancel Booking
                      </button>
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
