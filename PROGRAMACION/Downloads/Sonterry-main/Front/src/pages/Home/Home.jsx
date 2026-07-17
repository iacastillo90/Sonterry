import React from 'react';
import HeroTV from '../../components/home/HeroTV';
import HeroSeparator from '../../components/home/HeroSeparator';
import {
  FeaturedProducts,
  PromoBanner,
  AboutStore,
  CTASection,
  AboutPreview,
  ProductCarousel,
  ContactPreview
} from './components';
import fondoImg from '../../assets/img/fondo.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="w-full">
      <HeroTV />
      <HeroSeparator />
      <AboutPreview />
      <ContactPreview />
      <PromoBanner />
      <FeaturedProducts />
      <AboutStore />
      <ProductCarousel />
      <CTASection />
    </div>
  );
};

export default Home;
