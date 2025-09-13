import React from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionVision from '@/components/MissionVision'
import BenefitsSection from '@/components/BenefitsSection'
import DownloadProfile from '@/components/DownloadProfile'
import TestimonialsSection from '@/components/TestimonialsSection'
import FleetSection from '@/components/FleetSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <MissionVision />
      <BenefitsSection />
      <DownloadProfile />
      <TestimonialsSection />
      <FleetSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default HomePage