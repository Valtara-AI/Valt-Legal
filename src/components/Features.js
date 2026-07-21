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
      description: 'Every case moves through a defined pipeline — Intake, Investigation, Treatment, Negotiation, Litigation, Settlement — with a status flag (Urgent, Active, Pending) so nothing sits unattended.'
    },
    {
      id: 'client-communication',
      icon: <FiUsers />,
      title: 'Client & Lead Tracking',
      description: 'Filter contacts by Active Clients, Leads, or Inactive Clients, and see case count, contact details, and status at a glance for each one.'
    },
    {
      id: 'document-management',
      icon: <FiFileText />,
      title: 'Document Management',
      description: 'Organize case files into folders, track templates, and see which documents are signed versus pending signature — all in one place.'
    },
    {
      id: 'task-automation',
      icon: <FiCalendar />,
      title: 'Task & Deadline Tracking',
      description: 'Every task is tied to a case and a due date, with overdue items flagged in red — so demand letters and depositions don\'t slip past deadline.'
    },
    {
      id: 'lead-tracking',
      icon: <FiMessageSquare />,
      title: 'Activity Feed',
      description: 'A running log of what changed and when — settlement offers, new intakes, court hearings, and incoming messages — so nothing gets missed between check-ins.'
    },
    {
      id: 'reporting-analytics',
      icon: <FiPieChart />,
      title: 'Reporting & Analytics',
      description: 'See active case counts, new cases this month, settlements closed, and average settlement value, plus a breakdown of case types and recent settlements.'
    },
  ];

  return (
    <FeaturesSection id="features">
      <div className="container">
        <SectionTitle>What's Inside</SectionTitle>
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
