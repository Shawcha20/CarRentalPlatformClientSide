import React from 'react'
import HeroCarousel from '../Components/HeroCarousel'
import FeaturedCarSection from '../Components/FeaturedCarSection'
import WhyrentUs from '../Components/WhyrentUs'
import TopRatedSection from '../Components/TopRatedSection'
import TestimonialSection from '../Components/TestimonialSection'
import RentACar from '../Components/RentACar'

export default function Home() {
  return (
   <div>
    <section className='mt-10'>
        <HeroCarousel></HeroCarousel>
    </section>
    <section className='mt-10'>
        <FeaturedCarSection></FeaturedCarSection>
    </section>
    <section className='mt-10'>
      <WhyrentUs></WhyrentUs>
    </section>
    <section className='mt-10'>
      <TopRatedSection></TopRatedSection>
    </section>
    <section className='mt-10'>
      <TestimonialSection></TestimonialSection>
    </section>
    <section className='py-20 bg-primary text-white mt-10'>
      <RentACar></RentACar>
    </section>
   </div>
  )
}
