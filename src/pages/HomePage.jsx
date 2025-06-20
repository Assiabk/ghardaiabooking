import React from 'react';
import HeroSection from '../components/HeroSection';
import SearchFilter from '../components/SearchFilter';
import Navbar from '../components/Navbar';
import HotelListSection from '../components/HotelListSection';
import AgencyListSection from '../components/AgencyListSection';
import Footer from '../components/Footer'; 

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchFilter />
      <HotelListSection />
      <AgencyListSection />
      <Footer />  
    </>
  );
};

export default HomePage;
