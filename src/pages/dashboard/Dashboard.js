import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FiUsers, FiFileText, FiCalendar, FiMessageSquare, FiPieChart, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div``;

const WelcomeCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
`;

const WelcomeTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
`;

const WelcomeSubtitle = styled.p`
  color: ${props => props.theme.text.secondary};
  margin-bottom: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const StatContent = styled.div``;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.text.primary};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.primary};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
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

const ViewAllLink = styled.a`
  font-size: 0.9rem;
  color: ${props => props.theme.primary};
  font-weight: normal;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TaskList = styled.div``;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.divider};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TaskCheckbox = styled.input`
  margin-right: 1rem;
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.primary};
  cursor: pointer;
`;

const TaskContent = styled.div`
  flex: 1;
`;

const TaskTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text.primary};
`;

const TaskMeta = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
`;

const TaskCase = styled.span`
  margin-right: 1rem;
`;

const TaskDue = styled.span`
  color: ${props => props.overdue ? props.theme.error : props.theme.text.secondary};
`;

const CaseList = styled.div``;

const CaseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.divider};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const CaseContent = styled.div`
  flex: 1;
`;

const CaseTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text.primary};
`;

const CaseMeta = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
`;

const CaseStage = styled.span`
  margin-right: 1rem;
`;

const CaseDate = styled.span``;

const CaseStatus = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'Urgent':
        return props.theme.error + '20';
      case 'Active':
        return props.theme.success + '20';
      case 'Pending':
        return props.theme.warning + '20';
      default:
        return props.theme.text.secondary + '20';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'Urgent':
        return props.theme.error;
      case 'Active':
        return props.theme.success;
      case 'Pending':
        return props.theme.warning;
      default:
        return props.theme.text.secondary;
    }
  }};
  margin-left: 1rem;
`;

const ActivityList = styled.div``;

const ActivityItem = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.divider};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text.primary};
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
`;

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <DashboardContainer>
      <WelcomeCard>
        <WelcomeTitle>Welcome back, John!</WelcomeTitle>
        <WelcomeSubtitle>Here's what's happening with your cases today.</WelcomeSubtitle>
      </WelcomeCard>
      
      <StatsGrid>
        <StatCard>
          <StatIcon color="#673ab7">
            <FiUsers />
          </StatIcon>
          <StatContent>
            <StatValue>42</StatValue>
            <StatLabel>Active Clients</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#2196f3">
            <FiFileText />
          </StatIcon>
          <StatContent>
            <StatValue>38</StatValue>
            <StatLabel>Open Cases</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#4caf50">
            <FiCalendar />
          </StatIcon>
          <StatContent>
            <StatValue>12</StatValue>
            <StatLabel>Upcoming Events</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#f44336">
            <FiAlertCircle />
          </StatIcon>
          <StatContent>
            <StatValue>7</StatValue>
            <StatLabel>Urgent Tasks</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>
      
      <GridContainer>
        <div>
          <SectionTitle>Recent Activity</SectionTitle>
          
          <Card>
            <CardTitle>
              Tasks Due Soon
              <ViewAllLink href="/dashboard/tasks">View All</ViewAllLink>
            </CardTitle>
            
            <TaskList>
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskContent>
                  <TaskTitle>Call client to discuss settlement offer</TaskTitle>
                  <TaskMeta>
                    <TaskCase>Johnson v. ABC Corp</TaskCase>
                    <TaskDue>Due Today</TaskDue>
                  </TaskMeta>
                </TaskContent>
              </TaskItem>
              
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskContent>
                  <TaskTitle>Review medical records for Rodriguez case</TaskTitle>
                  <TaskMeta>
                    <TaskCase>Rodriguez v. XYZ Insurance</TaskCase>
                    <TaskDue>Due Tomorrow</TaskDue>
                  </TaskMeta>
                </TaskContent>
              </TaskItem>
              
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskContent>
                  <TaskTitle>Prepare demand letter for Smith case</TaskTitle>
                  <TaskMeta>
                    <TaskCase>Smith v. City Transit</TaskCase>
                    <TaskDue overdue={true}>Overdue by 2 days</TaskDue>
                  </TaskMeta>
                </TaskContent>
              </TaskItem>
              
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskContent>
                  <TaskTitle>Schedule deposition for Williams case</TaskTitle>
                  <TaskMeta>
                    <TaskCase>Williams v. General Hospital</TaskCase>
                    <TaskDue>Due in 3 days</TaskDue>
                  </TaskMeta>
                </TaskContent>
              </TaskItem>
            </TaskList>
          </Card>
          
          <Card>
            <CardTitle>
              Recent Cases
              <ViewAllLink href="/dashboard/cases/all">View All</ViewAllLink>
            </CardTitle>
            
            <CaseList>
              <CaseItem>
                <CaseContent>
                  <CaseTitle>Johnson v. ABC Corporation</CaseTitle>
                  <CaseMeta>
                    <CaseStage>Negotiation</CaseStage>
                    <CaseDate>Updated: Apr 16, 2025</CaseDate>
                  </CaseMeta>
                </CaseContent>
                <CaseStatus status="Urgent">Urgent</CaseStatus>
              </CaseItem>
              
              <CaseItem>
                <CaseContent>
                  <CaseTitle>Rodriguez v. XYZ Insurance</CaseTitle>
                  <CaseMeta>
                    <CaseStage>Investigation</CaseStage>
                    <CaseDate>Updated: Apr 15, 2025</CaseDate>
                  </CaseMeta>
                </CaseContent>
                <CaseStatus status="Active">Active</CaseStatus>
              </CaseItem>
              
              <CaseItem>
                <CaseContent>
                  <CaseTitle>Smith v. City Transit</CaseTitle>
                  <CaseMeta>
                    <CaseStage>Treatment</CaseStage>
                    <CaseDate>Updated: Apr 14, 2025</CaseDate>
                  </CaseMeta>
                </CaseContent>
                <CaseStatus status="Active">Active</CaseStatus>
              </CaseItem>
              
              <CaseItem>
                <CaseContent>
                  <CaseTitle>Williams v. General Hospital</CaseTitle>
                  <CaseMeta>
                    <CaseStage>Litigation</CaseStage>
                    <CaseDate>Updated: Apr 13, 2025</CaseDate>
                  </CaseMeta>
                </CaseContent>
                <CaseStatus status="Pending">Pending</CaseStatus>
              </CaseItem>
            </CaseList>
          </Card>
        </div>
        
        <div>
          <SectionTitle>Activity Feed</SectionTitle>
          
          <Card>
            <ActivityList>
              <ActivityItem>
                <ActivityIcon color="#673ab7">
                  <FiFileText />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Settlement offer received for Johnson case</ActivityTitle>
                  <ActivityTime>Today, 10:23 AM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              
              <ActivityItem>
                <ActivityIcon color="#2196f3">
                  <FiMessageSquare />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>New message from Sarah Rodriguez</ActivityTitle>
                  <ActivityTime>Today, 9:45 AM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              
              <ActivityItem>
                <ActivityIcon color="#4caf50">
                  <FiUsers />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>New client intake: Michael Thompson</ActivityTitle>
                  <ActivityTime>Yesterday, 4:30 PM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              
              <ActivityItem>
                <ActivityIcon color="#ff9800">
                  <FiCalendar />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Court hearing scheduled for Williams case</ActivityTitle>
                  <ActivityTime>Yesterday, 2:15 PM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              
              <ActivityItem>
                <ActivityIcon color="#673ab7">
                  <FiFileText />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Medical records received for Smith case</ActivityTitle>
                  <ActivityTime>Apr 15, 2025, 11:20 AM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              
              <ActivityItem>
                <ActivityIcon color="#f44336">
                  <FiAlertCircle />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Statute of limitations approaching for Davis case</ActivityTitle>
                  <ActivityTime>Apr 15, 2025, 9:00 AM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              
              <ActivityItem>
                <ActivityIcon color="#2196f3">
                  <FiPieChart />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Monthly case report generated</ActivityTitle>
                  <ActivityTime>Apr 14, 2025, 8:30 AM</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </ActivityList>
          </Card>
        </div>
      </GridContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
