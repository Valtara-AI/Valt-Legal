import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
