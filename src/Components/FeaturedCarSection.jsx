import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";

export default function FeaturedCarSection() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockCars = [
      {
        id: 1,
        name: "Tesla Model 3",
        rentPricePerDay: 120,
        type: "Electric Sedan",
        provider: "Tesla Rentals",
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1b?w=300&h=250&fit=crop",
        detailsLink: "/car-details/1",
      },
      {
        id: 2,
        name: "BMW X5",
        rentPricePerDay: 150,
        type: "Luxury SUV",
        provider: "BMW Drive",
        image:
          "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=250&fit=crop",
        detailsLink: "/car-details/2",
      },
      {
        id: 3,
        name: "Mercedes-Benz C-Class",
        rentPricePerDay: 130,
        type: "Premium Sedan",
        provider: "Benz Mobility",
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=250&fit=crop",
        detailsLink: "/car-details/3",
      },
      {
        id: 4,
        name: "Audi A4",
        rentPricePerDay: 110,
        type: "Executive Sedan",
        provider: "Audi Fleet",
        image:
          "https://images.unsplash.com/photo-1542365887-3655edaa4d4e?w=300&h=250&fit=crop",
        detailsLink: "/car-details/4",
      },
      {
        id: 5,
        name: "Honda Civic",
        rentPricePerDay: 60,
        type: "Compact Car",
        provider: "City Rentals",
        image:
          "https://images.unsplash.com/photo-1549921296-3e92f2c9d5c1?w=300&h=250&fit=crop",
        detailsLink: "/car-details/5",
      },
      {
        id: 6,
        name: "Porsche 911",
        rentPricePerDay: 280,
        type: "Sports Coupe",
        provider: "Elite Drives",
        image:
          "https://images.unsplash.com/photo-1603386329225-868f9dcefa86?w=300&h=250&fit=crop",
        detailsLink: "/car-details/6",
      },
    ];

    setFeaturedCars(mockCars);
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center py-16">Loading cars...</p>;

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
