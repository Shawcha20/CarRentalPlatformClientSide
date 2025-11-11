import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { showSuccess, showError, showConfirm } from '../utils/notifications';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../Components/LoadingSpinner';

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    // Mock data - In real app, fetch from Firebase
    const mockListings = [
      {
        id: 1,
        name: 'Tesla Model 3',
        category: 'Electric',
        year: 2024,
        pricePerDay: 120,
        image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&h=250&fit=crop',
        status: 'available',
        bookings: 5,
        description: 'Premium electric sedan with advanced autopilot features'
      },
      {
        id: 2,
        name: 'BMW X5',
        category: 'SUV',
        year: 2024,
        pricePerDay: 150,
        image: 'https://images.unsplash.com/photo-1606611281303-38d6bf0f04a9?w=300&h=250&fit=crop',
        status: 'booked',
        bookings: 3,
        description: 'Luxury SUV perfect for family trips'
      },
      {
        id: 3,
        name: 'Mercedes-Benz C-Class',
        category: 'Sedan',
        year: 2024,
        pricePerDay: 130,
        image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=250&fit=crop',
        status: 'available',
        bookings: 8,
        description: 'Elegant sedan combining style and performance'
      }
    ];

    setListings(mockListings);
    setLoading(false);
  }, []);

  const handleEdit = (listing) => {
    setEditingId(listing.id);
    setEditFormData({ ...listing });
  };

  const handleSaveEdit = async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setListings(listings.map(l => l.id === id ? editFormData : l));
      setEditingId(null);
      setEditFormData(null);
      showSuccess('Listing updated successfully!', 'Success');
    } catch (error) {
      showError('Failed to update listing', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm(
      'Are you sure you want to delete this listing? This action cannot be undone.',
      'Delete Listing'
    );

    if (result.isConfirmed) {
      try {
        setListings(listings.filter(l => l.id !== id));
        showSuccess('Listing deleted successfully!', 'Success');
      } catch (error) {
        showError('Failed to delete listing', 'Error');
      }
    }
  };

  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'booked' : 'available';
    const result = await showConfirm(
      `Mark this car as ${newStatus}?`,
      'Change Status'
    );

    if (result.isConfirmed) {
      setListings(listings.map(l => l.id === id ? { ...l, status: newStatus } : l));
      showSuccess(`Status updated to ${newStatus}`, 'Success');
    }
  };

  if (loading && listings.length === 0) {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Listings</h1>
          <p className="text-gray-600 text-lg">Manage your rental cars</p>
        </motion.div>

        {listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-12 text-center"
          >
            <p className="text-gray-600 text-lg mb-6">You haven't added any cars yet.</p>
            <Link to="/add-car" className="btn btn-primary text-white">
              Add Your First Car
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {listings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-equal-height"
              >
                <figure className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                </figure>

                {editingId === listing.id ? (
                  <div className="p-4 space-y-3">
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="input input-bordered w-full"
                    />
                    <input
                      type="number"
                      value={editFormData.pricePerDay}
                      onChange={(e) => setEditFormData({ ...editFormData, pricePerDay: Number(e.target.value) })}
                      className="input input-bordered w-full"
                    />
                    <textarea
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="textarea textarea-bordered w-full"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(listing.id)}
                        disabled={loading}
                        className="btn btn-success text-white flex-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-ghost flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="card-body flex flex-col">
                    <div className="flex-1">
                      <h2 className="card-title text-lg">{listing.name}</h2>
                      <p className="text-sm text-gray-600 mb-2">{listing.category} • {listing.year}</p>
                      <p className="text-gray-700 text-sm mb-3">{listing.description}</p>
                      
                      <div className="space-y-2 my-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price per day:</span>
                          <span className="font-semibold">${listing.pricePerDay}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total bookings:</span>
                          <span className="font-semibold">{listing.bookings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`badge ${listing.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card-actions flex flex-col gap-2 mt-4">
                      <button
                        onClick={() => handleChangeStatus(listing.id, listing.status)}
                        className="btn btn-sm btn-outline w-full"
                      >
                        Mark as {listing.status === 'available' ? 'Booked' : 'Available'}
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(listing)}
                          className="btn btn-sm btn-secondary text-white flex-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="btn btn-sm btn-error text-white flex-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
