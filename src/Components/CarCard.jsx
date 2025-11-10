import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DollarSign, User, MapPin, CarFront } from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-2xl bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
 
      <figure className="relative h-52 overflow-hidden">
        <img
          src={car.image || "https://via.placeholder.com/300x200?text=Car"}
          alt={car.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </figure>

    
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h2>
          <p className="text-sm text-gray-500 mb-3">{car.category}</p>

        
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {car.description}
          </p>


          <div className="flex items-center text-gray-600 text-sm mb-2 gap-2">
            <MapPin size={16} className="text-blue-500" />
            <span>{car.location}</span>
          </div>

    
          <div className="flex items-center text-gray-600 text-sm mb-4 gap-2">
            <User size={16} className="text-blue-500" />
            <span>Provider: {car.providerName}</span>
          </div>

    
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
              <DollarSign size={18} className="text-blue-600" />
              <span>${car.rentPricePerDay}/day</span>
            </div>
            <CarFront size={20} className="text-gray-400" />
          </div>
             <div className="mt-6">
          <Link
            to={`/car-details/${car.id}`}
            className="w-full block text-center bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            View Details
          </Link>
        </div>
        </div>

 
     
      </div>
    </motion.div>
  );
};

export default CarCard;
