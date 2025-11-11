import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";

import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";

export default function FeaturedCarSection() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    
    // const mockCars = [
    //   {
    //     id: 1,
    //     name: "Tesla Model 3",
    //     description: "Premium electric sedan with autopilot features.",
    //     category: "Electric",
    //     rentPricePerDay: 120,
    //     location: "Dhaka, Bangladesh",
    //     status:"Available",
    //     image:
    //       "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&h=250&fit=crop",
    //     providerName: "Elite Car Rentals",
    //     providerEmail: "contact@elitecars.com",
    //   },
    //   {
    //     id: 2,
    //     name: "BMW X5",
    //     description: "Luxury SUV perfect for family trips and adventures.",
    //     category: "SUV",
    //     rentPricePerDay: 150,
    //     status:"Available",
    //     location: "Chittagong, Bangladesh",
    //     image:
    //       "https://images.unsplash.com/photo-1606611281303-38d6bf0f04a9?w=300&h=250&fit=crop",
    //     providerName: "Luxury Drives BD",
    //     providerEmail: "info@luxurydrives.com",
    //   },
    //   {
    //     id: 3,
    //     name: "Mercedes-Benz C-Class",
    //     description: "Elegant sedan combining style and performance.",
    //     category: "Sedan",
    //     rentPricePerDay: 130,
    //     status:"Available",
    //     location: "Sylhet, Bangladesh",
    //     image:
    //       "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=250&fit=crop",
    //     providerName: "Prime Wheels",
    //     providerEmail: "prime@wheels.com",
    //   },
    //   {
    //     id: 4,
    //     name: "Audi A4",
    //     description: "German engineering meets modern luxury.",
    //     category: "Sedan",
    //     rentPricePerDay: 110,
    //     status:"Available",
    //     location: "Khulna, Bangladesh",
    //     image:
    //       "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=300&h=250&fit=crop",
    //     providerName: "SpeedLine Rentals",
    //     providerEmail: "support@speedline.com",
    //   },
    //   {
    //     id: 5,
    //     name: "Honda Civic",
    //     description: "Reliable and fuel-efficient for city driving.",
    //     category: "Hatchback",
    //     rentPricePerDay: 60,
    //     status:"Unavailable",
    //     location: "Rajshahi, Bangladesh",
    //     image:
    //       "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=250&fit=crop",
    //     providerName: "Smart Car Hub",
    //     providerEmail: "service@smartcarhub.com",
    //   },
    //   {
    //     id: 6,
    //     name: "Porsche 911",
    //     description: "High-performance sports car for thrill seekers.",
    //     category: "Luxury",
    //     rentPricePerDay: 280,
    //     status:"Available",
    //     location: "Dhaka, Bangladesh",
    //     image:
    //       "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=250&fit=crop",
    //     providerName: "Supercar Rentals BD",
    //     providerEmail: "hello@supercarbd.com",
    //   },
    // ];
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get("/");
        console.log(response.data);
        let data=response.data;
        if(data.length>6){
        data=data.slice(0, 6);
        }
        setFeaturedCars(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 mb-3"
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Featured Cars
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Choose from our top-rated, premium cars available today.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link
            to="/browse-cars"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
}
