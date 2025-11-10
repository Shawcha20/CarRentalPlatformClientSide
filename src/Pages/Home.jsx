import React from 'react'
import HeroCarousel from '../Components/HeroCarousel'
import FeaturedCarSection from '../Components/FeaturedCarSection'

export default function Home() {
  return (
   <div className='min-h-screen'>
    <section>
        <HeroCarousel></HeroCarousel>
    </section>
    <section>
        {/* <FeaturedCarSection></FeaturedCarSection> */}
    </section>
   </div>
  )
}
