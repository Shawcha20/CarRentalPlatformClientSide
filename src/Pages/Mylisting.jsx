import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { showSuccess, showError, showConfirm } from "../utils/notifications";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ErrorPage from "./ErrorPage";

const MyListings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  // fetching car data
  useEffect(() => {
    const fetchMylist = async () => {
      try {
        console.log(user.email);
        const response = await axiosSecure.get(`/mylisting/?email=${user.email}`);
        if (!response.data || response.data.length === 0) {
          setError(true);
        } else {
          console.log(response.data);
          setListings(response.data);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMylist();
  }, [user.email, axiosSecure]);

  

const handleDelete = async (id) => {
  const result = await showConfirm(
    "Are you sure you want to delete this listing? This action cannot be undone.",
    "Delete Listing"
  );

  if (result.isConfirmed) {
    try {
      setLoading(true);
      const response=await axiosSecure.delete(`/mylisting/${id}`); 
      console.log(response);
      setListings(listings.filter((l) => l._id !== id)); 
      showSuccess("Listing deleted successfully!", "Success");
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error(error);
      showError("Failed to delete listing", "Error");
      
    }
  }
};

  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "booked" : "Available";
    console.log(newStatus);
    const result = await showConfirm(`Mark this car as ${newStatus}?`, "Change Status");
    if (result.isConfirmed) {
      const updatedStatus={newStatus};
      const response= await axiosSecure.patch(`/mylisting/${id}`,updatedStatus);
      setListings(listings.map((l) => (l._id === id ? { ...l, status: newStatus } : l)));
      showSuccess(`Status updated to ${newStatus}`, "Success");
    }
  };

  if (loading) return <LoadingSpinner />;

  // if (error) return <Navigate to="/errorpage"></Navigate>;

  return (
    <div className="min-h-screen bg-white py-16 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Listings</h1>
          <p className="text-gray-600 text-lg">Manage your rental cars</p>
        </motion.div>

        {listings.length === 0 ? 
                  (<motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg shadow-md p-12 text-center"
                  >
                    <p className="text-gray-600 text-lg">No  cars added.</p>
                  </motion.div>
                ): (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {listings.map((listing) => (
              <motion.div
                key={listing._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-equal-height"
              >
                <figure className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={listing.image_url}
                    alt={listing.car_name}
                    className="w-full h-full object-cover"
                  />
                </figure>

                  <div className="card-body flex flex-col">
                    <div className="flex-1">
                      <h2 className="card-title text-lg">{listing.car_name}</h2>
                      <p className="text-sm text-gray-600 mb-2">
                        {listing.category} • {listing.year}
                      </p>
                      <p className="text-gray-700 text-sm mb-3">{listing.description}</p>

                      <div className="space-y-2 my-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price per day:</span>
                          <span className="font-semibold">${listing.price_per_day}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total bookings:</span>
                          <span className="font-semibold">{listing?.bookings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span
                            className={`badge ${
                              listing.status === "Available"
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* updating status  */}
                    <div className="card-actions flex flex-col gap-2 mt-4">
                      <button
                        onClick={() => handleChangeStatus(listing._id, listing.status)}
                        className="btn btn-sm btn-outline w-full"
                      >
                        Mark as {listing.status === "Available" ? "Booked" : "Available"}
                      </button>
                      <div className="flex gap-2">
                       {/* updating car data */}
                           <Link to={`/car-edit/${listing._id}`}
                          className="btn btn-sm btn-secondary text-white flex-1">
                        Edit</Link>
                
                        <button
                          onClick={() => handleDelete(listing._id)}
                          className="btn btn-sm btn-error text-white flex-1">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
          
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <Link to="/add-car" className="btn btn-primary text-white">
            Add Another Car
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyListings;
