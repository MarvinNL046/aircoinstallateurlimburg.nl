import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import StickyMobileCTA from './components/ui/StickyMobileCTA'

const HeroOptimized = lazy(() => import('./components/sections/HeroOptimized'))
const ServicesOptimized = lazy(() => import('./components/sections/ServicesOptimized'))
const WhyUs = lazy(() => import('./components/sections/WhyUs'))
const BrandLogos = lazy(() => import('./components/sections/BrandLogos'))
const Contact = lazy(() => import('./components/sections/Contact'))
const CTABanner = lazy(() => import('./components/sections/CTABanner'))
const Products = lazy(() => import('./components/sections/Products'))
const FAQ = lazy(() => import('./components/sections/FAQ'))

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>}>
        <HeroOptimized />
        <ServicesOptimized />
        <WhyUs />
        <CTABanner />
        <BrandLogos />
        <Products />
        <FAQ />
        <Contact />
      </Suspense>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}

export default App