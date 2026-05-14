import React from 'react';
import styled from 'styled-components';
import { FiDatabase, FiUsers, FiFileText, FiCalendar, FiMessageSquare, FiPieChart } from 'react-icons/fi';

const FeaturesSection = styled.section`
  background-color: ${props => props.theme.background};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.text.primary};
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.primary};
    margin: 1rem auto 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px ${props => props.theme.shadow};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.primary};
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  line-height: 1.6;
`;

const Features = () => {
  const featuresData = [
    {
      id: 'case-management',
      icon: <FiDatabase />,
      title: 'Case Management',
      description: 'Centralize all case information, documents, and communications in one secure location for easy access and management.'
    },
    {
      id: 'client-communication',
      icon: <FiUsers />,
      title: 'Client Communication',
      description: 'Automate client updates, appointment reminders, and document requests to improve client satisfaction and save time.'
    },
    {
      id: 'document-management',
      icon: <FiFileText />,
      title: 'Document Management',
      description: 'Store, organize, and share case-related documents securely with built-in HIPAA-compliant document management.'
    },
    {
      id: 'task-automation',
      icon: <FiCalendar />,
      title: 'Task Automation',
      description: 'Create customizable workflows to automate routine tasks, deadlines, and follow-ups for increased efficiency.'
    },
    {
      id: 'lead-tracking',
      icon: <FiMessageSquare />,
      title: 'Lead Tracking',
      description: 'Track and manage potential clients from initial contact through case resolution with powerful lead management tools.'
    },
    {
      id: 'reporting-analytics',
      icon: <FiPieChart />,
      title: 'Reporting & Analytics',
      description: 'Gain valuable insights into your firm\'s performance with customizable reports and real-time analytics dashboards.'
    },
  ];

  return (
    <FeaturesSection id="features">
      <div className="container">
        <SectionTitle>Powerful Features</SectionTitle>
        <FeaturesGrid>
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </FeaturesSection>
  );
};

export default Features;
