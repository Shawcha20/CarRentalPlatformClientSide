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
    <section className="bg-gradient-to-br from-gray-50 via-white rounded-2xl to-gray-100 py-20">
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
            <CarCard key={car._id} car={car} />
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
