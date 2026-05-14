import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiFileText, FiMessageSquare, FiDollarSign } from 'react-icons/fi';

const CaseContainer = styled.div``;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: ${props => props.theme.text.primary};
  margin-bottom: 0.5rem;
`;

const PageActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.primary ? props.theme.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.text.primary};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.divider}`};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.secondary : props.theme.background};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.divider};
  margin-bottom: 2rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 0;
  }
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? props.theme.primary : props.theme.text.secondary};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CaseDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 1rem;
`;

const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 0.3rem;
`;

const DetailValue = styled.div`
  color: ${props => props.theme.text.primary};
  font-weight: 500;
`;

const StageIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.theme.divider};
    z-index: 0;
  }
`;

const StageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const StagePoint = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.primary : props.completed ? props.theme.success : props.theme.background};
  border: 2px solid ${props => props.completed ? props.theme.success : props.active ? props.theme.primary : props.theme.divider};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active || props.completed) ? 'white' : props.theme.text.secondary};
  margin-bottom: 0.5rem;
`;

const StageName = styled.div`
  font-size: 0.8rem;
  color: ${props => props.active ? props.theme.primary : props.completed ? props.theme.success : props.theme.text.secondary};
  font-weight: ${props => props.active ? '600' : 'normal'};
  text-align: center;
  max-width: 80px;
`;

const TimelineContainer = styled.div`
  margin-top: 1.5rem;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 30px;
    bottom: -30px;
    left: 15px;
    width: 2px;
    background-color: ${props => props.theme.divider};
    z-index: 0;
  }
  
  &:last-child:before {
    display: none;
  }
`;

const TimelineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary}20;
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-right: 1rem;
  flex-shrink: 0;
  z-index: 1;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text.primary};
`;

const TimelineTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 0.5rem;
`;

const TimelineDescription = styled.div`
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
`;

const CaseView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for a personal injury case
  const caseData = {
    id: 'PI-2025-042',
    title: 'Johnson v. ABC Corporation',
    client: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 94103'
    },
    incident: {
      date: 'January 15, 2025',
      type: 'Slip and Fall',
      location: 'ABC Corporation Headquarters',
      description: 'Client slipped on wet floor in lobby with no warning signs present.'
    },
    status: 'Active',
    stage: 'Negotiation',
    attorney: 'John Doe',
    paralegal: 'Jane Smith',
    insuranceInfo: {
      company: 'XYZ Insurance',
      policyNumber: 'POL-12345-XYZ',
      adjuster: 'Michael Brown',
      adjusterPhone: '(555) 987-6543'
    },
    medicalInfo: {
      providers: [
        'City General Hospital',
        'Dr. Robert Williams (Orthopedic)',
        'Physical Therapy Center'
      ],
      injuries: 'Fractured wrist, back strain, bruising',
      treatment: 'Surgery, physical therapy (ongoing)',
      expenses: '$28,750'
    },
    timeline: [
      {
        date: 'Apr 15, 2025',
        title: 'Settlement offer received',
        description: 'Initial offer of $75,000 received from XYZ Insurance.',
        icon: <FiDollarSign />
      },
      {
        date: 'Apr 10, 2025',
        title: 'Demand letter sent',
        description: 'Demand letter for $150,000 sent to XYZ Insurance.',
        icon: <FiFileText />
      },
      {
        date: 'Mar 25, 2025',
        title: 'Medical records received',
        description: 'Final medical records and bills received from all providers.',
        icon: <FiFileText />
      },
      {
        date: 'Mar 15, 2025',
        title: 'Client meeting',
        description: 'Met with client to discuss case strategy and timeline.',
        icon: <FiMessageSquare />
      },
      {
        date: 'Feb 20, 2025',
        title: 'Investigation completed',
        description: 'Witness statements collected, photos of accident scene obtained.',
        icon: <FiFileText />
      },
      {
        date: 'Jan 20, 2025',
        title: 'Case intake',
        description: 'Initial consultation with client, case opened.',
        icon: <FiUser />
      }
    ]
  };
  
  // Pipeline stages for personal injury cases
  const stages = [
    { name: 'Intake', completed: true },
    { name: 'Investigation', completed: true },
    { name: 'Treatment', completed: true },
    { name: 'Negotiation', active: true },
    { name: 'Litigation', completed: false },
    { name: 'Settlement', completed: false },
    { name: 'Closed', completed: false }
  ];
  
  return (
    <CaseContainer>
      <PageHeader>
        <div>
          <PageTitle>{caseData.title}</PageTitle>
          <div>Case #{caseData.id} • {caseData.status}</div>
        </div>
        
        <PageActions>
          <Button>Edit Case</Button>
          <Button primary>Add Note</Button>
        </PageActions>
      </PageHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Tab>
        <Tab 
          active={activeTab === 'documents'} 
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </Tab>
        <Tab 
          active={activeTab === 'notes'} 
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </Tab>
        <Tab 
          active={activeTab === 'tasks'} 
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </Tab>
        <Tab 
          active={activeTab === 'calendar'} 
          onClick={() => setActiveTab('calendar')}
        >
          Calendar
        </Tab>
        <Tab 
          active={activeTab === 'messages'} 
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </Tab>
        <Tab 
          active={activeTab === 'billing'} 
          onClick={() => setActiveTab('billing')}
        >
          Billing
        </Tab>
      </TabsContainer>
      
      {activeTab === 'overview' && (
        <GridContainer>
          <div>
            <Card>
              <CardTitle>Case Progress</CardTitle>
              <StageIndicator>
                {stages.map((stage, index) => (
                  <StageItem key={index}>
                    <StagePoint active={stage.active} completed={stage.completed}>
                      {stage.completed ? '✓' : index + 1}
                    </StagePoint>
                    <StageName active={stage.active} completed={stage.completed}>
                      {stage.name}
                    </StageName>
                  </StageItem>
                ))}
              </StageIndicator>
            </Card>
            
            <Card>
              <CardTitle>Case Details</CardTitle>
              <CaseDetails>
                <DetailItem>
                  <DetailLabel>Incident Type</DetailLabel>
                  <DetailValue>{caseData.incident.type}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Incident Date</DetailLabel>
                  <DetailValue>{caseData.incident.date}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Incident Location</DetailLabel>
                  <DetailValue>{caseData.incident.location}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Attorney</DetailLabel>
                  <DetailValue>{caseData.attorney}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Paralegal</DetailLabel>
                  <DetailValue>{caseData.paralegal}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Current Stage</DetailLabel>
                  <DetailValue>{caseData.stage}</DetailValue>
                </DetailItem>
              </CaseDetails>
            </Card>
            
            <Card>
              <CardTitle>Incident Description</CardTitle>
              <p>{caseData.incident.description}</p>
            </Card>
            
            <Card>
              <CardTitle>Medical Information</CardTitle>
              <DetailItem>
                <DetailLabel>Injuries</DetailLabel>
                <DetailValue>{caseData.medicalInfo.injuries}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Treatment</DetailLabel>
                <DetailValue>{caseData.medicalInfo.treatment}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Medical Expenses</DetailLabel>
                <DetailValue>{caseData.medicalInfo.expenses}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Medical Providers</DetailLabel>
                <DetailValue>
                  <ul>
                    {caseData.medicalInfo.providers.map((provider, index) => (
                      <li key={index}>{provider}</li>
                    ))}
                  </ul>
                </DetailValue>
              </DetailItem>
            </Card>
            
            <Card>
              <CardTitle>Insurance Information</CardTitle>
              <DetailItem>
                <DetailLabel>Insurance Company</DetailLabel>
                <DetailValue>{caseData.insuranceInfo.company}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Policy Number</DetailLabel>
                <DetailValue>{caseData.insuranceInfo.policyNumber}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Adjuster</DetailLabel>
                <DetailValue>{caseData.insuranceInfo.adjuster}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Adjuster Phone</DetailLabel>
                <DetailValue>{caseData.insuranceInfo.adjusterPhone}</DetailValue>
              </DetailItem>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardTitle>Client Information</CardTitle>
              <DetailItem>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>{caseData.client.name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{caseData.client.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{caseData.client.phone}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Address</DetailLabel>
                <DetailValue>{caseData.client.address}</DetailValue>
              </DetailItem>
            </Card>
            
            <Card>
              <CardTitle>Case Timeline</CardTitle>
              <TimelineContainer>
                {caseData.timeline.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineIcon>{item.icon}</TimelineIcon>
                    <TimelineContent>
                      <TimelineTitle>{item.title}</TimelineTitle>
                      <TimelineTime>{item.date}</TimelineTime>
                      <TimelineDescription>{item.description}</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </TimelineContainer>
            </Card>
          </div>
        </GridContainer>
      )}
    </CaseContainer>
  );
};

export default CaseView;
