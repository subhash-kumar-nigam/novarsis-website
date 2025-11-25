import React from 'react'
import HeroSection from './HeroSection'


import ServiceSection from './ServiceSection'
import AboutSection from './AboutSection'
import ScrollingBanner from './ScrollingBanner'
import ServiceItems from './ServiceItems'
import PremiumServices from './PremiumServices'
import StatsSection from './StatsSection'
import SecuritySection from './SecuritySection'
import BlogSection from './BlogSection'
import TestimonialsSection from './TestimonialsSection'
import ChooseUsSection from './ChooseUsSection'
import Section from './Section'




const Home = () => {
  return (
    <div>
      
      <HeroSection />
      <ServiceSection/>
      <AboutSection/>
      <ScrollingBanner/>
      <ServiceItems/>
      <PremiumServices/>
      <StatsSection/>
      <SecuritySection/>
      <Section/>
      <ChooseUsSection/>
      <TestimonialsSection/>
      <BlogSection/>
    </div>
  )
}

export default Home
