import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from '../Components/HeroCarousel';
import FeaturedCarSection from '../Components/FeaturedCarSection';
import WhyrentUs from '../Components/WhyrentUs';
import TopRatedSection from '../Components/TopRatedSection';
import TestimonialSection from '../Components/TestimonialSection';
import ServicesSection from '../Components/ServicesSection';
import BlogSection from '../Components/BlogSection';
import RentACar from '../Components/RentACar';
import FAQSection from '../Components/FAQSection';
import StatisticsSection from '../Components/StatisticsSection';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse-cars?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate(`/browse-cars`);
    }
  };

  return (
    <div>
      <section className='mt-10'>
        <HeroCarousel />
      </section>

      <section className="mt-10 flex justify-center">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search for a car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow outline-none text-gray-700 px-2"
          />
          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/80 transition"
          >
            Search
          </button>
        </form>
      </section>

      <section className='mt-10'>
        <FeaturedCarSection />
      </section>
      <section className='mt-10'>
        <WhyrentUs />
      </section>
      <section className='mt-10'>
        <ServicesSection />
      </section>
      <section className='mt-10'>
        <StatisticsSection />
      </section>
      <section className='mt-10'>
        <TopRatedSection />
      </section>
      <section className='mt-10'>
        <TestimonialSection />
      </section>
      <section className='mt-10'>
        <BlogSection />
      </section>
      <section className='mt-10'>
        <FAQSection></FAQSection>
      </section>
      <section className='py-20 bg-primary text-white mt-10 rounded-2xl my-5'>
        <RentACar />
      </section>
    </div>
  );
}
