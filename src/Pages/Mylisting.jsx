import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { showSuccess, showError, showConfirm } from "../utils/notifications";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyListings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const categories = [
    "Sedan",
    "SUV",
    "Sports",
    "Compact",
    "Electric",
    "Luxury",
  ];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Gazipur",
    "Narayanganj",
    "Cox's Bazar",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
  setSelectedCar((prev) => ({ ...prev, [name]: value }));
    if (name === "image_url") {
      setImagePreview(value);
    }
  };
  useEffect(() => {
    const fetchMylist = async () => {
      try {
        const response = await axiosSecure.get(
          `/mylisting/?email=${user.email}`
        );
        setListings(response.data);
      } catch (error) {
        showError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    fetchMylist();
  }, [user.email, axiosSecure]);

  const handleDelete = async (id) => {
    const result = await showConfirm(
      "Are you sure you want to delete this listing?"
    );
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/mylisting/${id}`);
        setListings((prev) => prev.filter((item) => item._id !== id));
        showSuccess("Listing deleted successfully");
      } catch {
        showError("Failed to delete listing");
      }
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      car_name: form.car_name.value,
      category: form.category.value,
      price_per_day: form.price_per_day.value,
      year: form.year.value,
      image_url: form.image_url.value,
      description: form.description.value,
    };

    try {
      await axiosSecure.put(`/car-details/${selectedCar._id}`, updatedCar);
      setListings((prev) =>
        prev.map((item) =>
          item._id === selectedCar._id ? { ...item, ...updatedCar } : item
        )
      );
      showSuccess("Car updated successfully!");
      setShowEditModal(false);
    } catch {
      showError("Failed to update car");
    }
  };
  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "booked" : "Available";
    console.log(newStatus);
    const result = await showConfirm(
      `Mark this car as ${newStatus}?`,
      "Change Status"
    );
    if (result.isConfirmed) {
      const updatedStatus = { newStatus };
      const response = await axiosSecure.patch(
        `/mylisting/${id}`,
        updatedStatus
      );
      setListings(
        listings.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
      );
      showSuccess(`Status updated to ${newStatus}`, "Success");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">My Listings</h1>

        {listings.length === 0 ? (
          <p className="text-gray-500 text-center">No cars listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between"
              >
                <img
                  src={listing.image_url}
                  alt={listing.car_name}
                  className="rounded-lg h-48 w-full object-cover"
                />
                <h2 className="text-xl font-semibold mt-3">
                  {listing.car_name}
                </h2>
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mb-2">
                    {listing.category}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Year: {listing.year}
                  </p>
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
                    {" "}
                    {listing.status}{" "}
                  </span>{" "}
                </div>
                <p className="text-gray-700 mb-3">{listing.description}</p>
                <p className="font-semibold">
                  Price: ${listing.price_per_day}/day
                </p>
                <button
                  onClick={() =>
                    handleChangeStatus(listing._id, listing.status)
                  }
                  className="btn btn-sm btn-outline w-full"
                >
                  Mark as{" "}
                  {listing.status === "Available" ? "Booked" : "Available"}
                </button>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="btn btn-sm btn-secondary text-white flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="btn btn-sm btn-error text-white flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEditModal && selectedCar && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-11/12 md:w-1/2 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Car</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Car Name
                </label>
                <input
                  type="text"
                  name="car_name"
                  defaultValue={selectedCar.car_name}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={selectedCar.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  name="location"
                  value={selectedCar.location}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={selectedCar.transmission}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {transmissions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={selectedCar.seats}
                    onChange={handleChange}
                    min="2"
                    max="9"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doors
                  </label>
                  <input
                    type="number"
                    name="doors"
                    value={selectedCar.doors}
                    onChange={handleChange}
                    min="2"
                    max="6"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select
                  name="fuel"
                  value={selectedCar.fuel}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Price/day
                  </label>
                  <input
                    type="number"
                    name="price_per_day"
                    defaultValue={selectedCar.price_per_day}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    defaultValue={selectedCar.year}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={selectedCar.image_url}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Preview:
                    </p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedCar.description}
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 text-white"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
