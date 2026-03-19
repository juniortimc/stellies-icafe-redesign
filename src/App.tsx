import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SpecialsBanner } from './components/SpecialsBanner';
import { OperatingHours } from './components/OperatingHours';
import { ServicesGrid } from './components/ServicesGrid';
import { PriceCalculator } from './components/PriceCalculator';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100 transition-colors">
        <Header />
        <main>
          <HeroSection />
          <OperatingHours />
          <SpecialsBanner />
          <ServicesGrid />
          <PriceCalculator />
          <TestimonialCarousel />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
