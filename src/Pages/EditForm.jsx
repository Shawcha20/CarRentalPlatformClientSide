import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { showSuccess, showError } from "../utils/notifications";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function EditForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    car_name: "",
    category: "Sedan",
    year: new Date().getFullYear(),
    price_per_day: "",
    description: "",
    image_url: "",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 4,
    location: "Dhaka",
  });

  const categories = ["Sedan", "SUV", "Sports", "Compact", "Electric", "Luxury"];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const cities = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal",
    "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj", "Cox's Bazar",
  ];

  // Fetch car data when component mounts
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/car-details/${id}`);
        const data = response.data;
        setCar(data);

        // Prefill form data
        setFormData({
          car_name: data.car_name || "",
          category: data.category || "Sedan",
          year: data.year || new Date().getFullYear(),
          price_per_day: data.price_per_day || "",
          description: data.description || "",
          image_url: data.image_url || "",
          transmission: data.transmission || "Automatic",
          fuel: data.fuel || "Petrol",
          seats: data.seats || 5,
          doors: data.doors || 4,
          location: data.location || "Dhaka",
        });
        setImagePreview(data.image_url || "");
      } catch (err) {
        console.error(err);
        showError("Failed to fetch car data", "Error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCarData();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "image_url") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.car_name || !formData.price_per_day || !formData.image_url || !formData.location) {
      showError("Please fill in all required fields", "Incomplete Form");
      return;
    }

    try {
      setLoading(true);
      const updatedCar = {
        ...formData,
        email: user.email,
      };

      await axiosSecure.put(`/car-details/${id}`, updatedCar); 
      showSuccess("Car updated successfully!", "Success");
      navigate("/my-listings");
    } catch (err) {
      console.error(err);
      showError("Failed to update car", "Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!car) return <p className="text-center mt-8">No car data found.</p>;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Update Car</h1>
          <p className="text-gray-600 mb-8">Edit your car listing</p>

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
                
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Name *
                  </label>
                  <input
                    type="text"
                    name="car_name"
                    value={formData.car_name}
                    onChange={handleChange}
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
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
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
                    value={formData.price_per_day}
                    onChange={handleChange}
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
                    value={formData.transmission}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    {transmissions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    {fuelTypes.map((f) => (
                      <option key={f} value={f}>{f}</option>
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
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>
            </div>

            {/* Image section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

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
                {loading ? "Updating..." : "Update Car"}
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
}
