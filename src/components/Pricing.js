import React from 'react';
import styled from 'styled-components';
import { FiCheck } from 'react-icons/fi';

const PricingSection = styled.section`
  background-color: ${props => props.theme.background};
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, ${props => props.theme.primary}20 0%, ${props => props.theme.secondary}20 100%);
    z-index: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.primary};
  position: relative;
  z-index: 1;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.primary};
    margin: 1rem auto 0;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: ${props => props.theme.text.secondary};
  position: relative;
  z-index: 1;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const PricingCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  
  ${props => props.popular && `
    transform: scale(1.05);
    border: 2px solid ${props.theme.primary};
    
    @media (max-width: 992px) {
      transform: scale(1);
    }
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => props.theme.shadow};
  }
`;

const PricingHeader = styled.div`
  text-align: center;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.divider};
`;

const PricingTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
`;

const PricingPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-bottom: 0.5rem;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.text.secondary};
  }
`;

const PricingDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  flex: 1;
  padding: 0;
`;

const PricingFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.text.primary};
  
  svg {
    color: ${props => props.theme.success};
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

const PricingButton = styled.a`
  display: block;
  text-align: center;
  padding: 1rem;
  background-color: ${props => props.popular ? props.theme.primary : 'transparent'};
  color: ${props => props.popular ? 'white' : props.theme.primary};
  border: 2px solid ${props => props.theme.primary};
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  background-color: ${props => props.theme.primary};
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: 20px;
`;

const Pricing = () => {
  const pricingData = [
    {
      title: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for solo practitioners and small firms',
      features: [
        'Case Management',
        'Client Communication',
        'Document Storage',
        'Basic Reporting',
        'Email Support',
        'Up to 3 Users'
      ],
      popular: false,
      buttonText: 'Get Started'
    },
    {
      title: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Ideal for growing law firms',
      features: [
        'Everything in Starter',
        'Lead Tracking',
        'Task Automation',
        'Advanced Reporting',
        'Priority Support',
        'Up to 10 Users',
        'API Access'
      ],
      popular: true,
      buttonText: 'Get Started'
    },
    {
      title: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For established firms with complex needs',
      features: [
        'Everything in Professional',
        'Custom Workflows',
        'White Labeling',
        'Dedicated Account Manager',
        'Unlimited Users',
        'Advanced Security Features',
        'Custom Integrations'
      ],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <PricingSection id="pricing">
      <div className="container">
        <SectionTitle>Simple, Transparent Pricing</SectionTitle>
        <SectionSubtitle>
          Choose the plan that fits your firm's needs. All plans include a 14-day free trial with no credit card required.
        </SectionSubtitle>
        
        <PricingGrid>
          {pricingData.map((plan, index) => (
            <PricingCard key={index} popular={plan.popular}>
              {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
              
              <PricingHeader>
                <PricingTitle>{plan.title}</PricingTitle>
                <PricingPrice>
                  {plan.price} <span>{plan.period}</span>
                </PricingPrice>
                <PricingDescription>{plan.description}</PricingDescription>
              </PricingHeader>
              
              <PricingFeatures>
                {plan.features.map((feature, i) => (
                  <PricingFeature key={i}>
                    <FiCheck /> {feature}
                  </PricingFeature>
                ))}
              </PricingFeatures>
              
              <PricingButton href="/signup" popular={plan.popular}>
                {plan.buttonText}
              </PricingButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </div>
    </PricingSection>
  );
};

export default Pricing;