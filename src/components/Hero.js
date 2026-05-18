import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';

const HeroSection = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.secondary} 100%);
  color: white;
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 2rem;
  
  @media (max-width: 992px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    object-fit: cover;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  max-width: 500px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  text-align: center;
  padding: 2rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  color: ${props => props.theme.primary};
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    background-color: white;
    color: ${props => props.theme.primary};
  }
`;

const FeatureList = styled.div`
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <HeroSection>
      <div className="container">
        <HeroContainer>
          <HeroContent>
            <HeroTitle>Streamline Your Personal Injury Case Management</HeroTitle>
            <HeroSubtitle>
              An all-in-one CRM solution designed specifically for personal injury law firms to manage cases, track leads, and improve client communication.
            </HeroSubtitle>
            
            <FeatureList>
              <FeatureItem>
                <FiCheckCircle /> Centralized Case Management
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> Automated Client Communication
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> Customizable Workflows
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> HIPAA Compliant Security
              </FeatureItem>
            </FeatureList>
            
            <HeroButtons>
              <PrimaryButton href="/signup">Start Free Trial</PrimaryButton>
              <SecondaryButton href="#demo">Watch Demo</SecondaryButton>
            </HeroButtons>
          </HeroContent>
          
          <HeroImage>
            {!imageError ? (
              <img 
                src="/dashboard-preview.png" 
                alt="Personal Injury CRM Dashboard" 
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <PlaceholderImage>
                Dashboard preview image not found
              </PlaceholderImage>
            )}
          </HeroImage>
        </HeroContainer>
      </div>
    </HeroSection>
  );
};

export default Hero;
