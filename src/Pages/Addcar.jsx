import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { showSuccess, showError } from "../utils/notifications";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    category: "Sedan",
    year: new Date().getFullYear(),
    pricePerDay: "",
    description: "",
    imageUrl: "",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 4,
    mileage: "0 miles",
    location: "Dhaka",
  });

  const categories = ["Sedan", "SUV", "Sports", "Compact", "Electric", "Luxury"];
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image_url") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const [
      name,
      email,
      car_name,
      category,
      year,
      price_per_day,
      transmission,
      fuel_type,
      seats,
      doors,
      description,
      image_url,
      location,
      status,
    ] = [
      form.name.value,
      form.email.value,
      form.car_name.value,
      form.category.value,
      form.year.value,
      form.price_per_day.value,
      form.transmission.value,
      form.fuel.value,
      form.seats.value,
      form.doors.value,
      form.description.value,
      form.image_url.value,
      form.location.value,
      "Available",
    ];

    if (!name || !price_per_day || !image_url || !location) {
      showError("Please fill in all required fields", "Incomplete Form");
      return;
    }

    setLoading(true);
    const CarDetails = {
      name,
      email,
      car_name,
      category,
      year,
      price_per_day,
      transmission,
      fuel_type,
      seats,
      doors,
      description,
      image_url,
      location,
      status,
    };

    try {
      const response = await axiosSecure.post("/add-car", CarDetails);
      showSuccess("Car added successfully!", "Success");
      navigate("/my-listings");
    } catch (error) {
      showError("Failed to add car", "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add a New Car</h1>
          <p className="text-gray-600 mb-8">List your vehicle on RentWheels</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Provider info section */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Provider Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    name="name"
                    className="input input-bordered w-full bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    name="email"
                    className="input input-bordered w-full bg-gray-100"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Car details section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Car Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Name *
                  </label>
                  <input
                    type="text"
                    name="car_name"
                    onChange={handleChange}
                    placeholder="e.g., Tesla Model 3"
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
                    value={formData.category}
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

                {/* New location field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location (City) *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
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
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price per Day ($) *
                  </label>
                  <input
                    type="number"
                    name="price_per_day"
                    onChange={handleChange}
                    placeholder="e.g., 120"
                    min="1"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    name="transmission"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="fuel"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    min="2"
                    max="9"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doors
                  </label>
                  <input
                    type="number"
                    name="doors"
                    value={formData.doors}
                    onChange={handleChange}
                    min="2"
                    max="6"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  placeholder="Describe your car's features and condition..."
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>
            </div>

            {/* Image section remains same */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Car Image</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image_url"
                  onChange={handleChange}
                  placeholder="https://example.com/car.jpg"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                    onError={() => setImagePreview("")}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-white flex-1 font-bold"
              >
                {loading ? "Adding Car..." : "Add Car to Fleet"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-listings")}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCar;
