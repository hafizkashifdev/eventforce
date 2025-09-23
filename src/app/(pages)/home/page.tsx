import React, { Suspense } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionVision from '@/components/MissionVision'
import DownloadProfile from '@/components/DownloadProfile'
import Footer from '@/components/Footer'
import { 
  SuspenseBenefitsSection, 
  SuspenseTestimonialsSection, 
  SuspenseFleetSection, 
  SuspenseContactSection 
} from '@/components/LazyComponents'

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <MissionVision />
      <SuspenseBenefitsSection />
      <DownloadProfile />
      <SuspenseTestimonialsSection />
      <SuspenseFleetSection />
      <SuspenseContactSection />
      <Footer />
    </>
  )
}

export default HomePage