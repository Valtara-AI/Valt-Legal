import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Sidebar from '../../components/dashboard/Sidebar';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.background};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding-top: 60px;
  transition: all 0.3s ease;
  
  @media (max-width: 992px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
`;

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <MainContent>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;
