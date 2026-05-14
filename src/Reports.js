import React, { useState } from 'react';
import styled from 'styled-components';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiCalendar, FiDownload, FiRefreshCw } from 'react-icons/fi';

const ReportsContainer = styled.div``;

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
  margin-bottom: 0;
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  color: ${props => props.theme.text.primary};
  
  svg {
    margin-right: 0.5rem;
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
`;

const StatTitle = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.text.primary};
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.positive ? props.theme.success : props.theme.error};
  
  svg {
    margin-right: 0.25rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0;
  color: ${props => props.theme.text.primary};
`;

const ChartActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChartActionButton = styled.button`
  background: none;
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.text.secondary};
`;

const TableCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  margin-bottom: 1.5rem;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TableTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0;
  color: ${props => props.theme.text.primary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.divider};
`;

const TableHeaderCell = styled.th`
  text-align: left;
  padding: 0.75rem 0;
  color: ${props => props.theme.text.secondary};
  font-weight: 500;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.divider};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 0;
  color: ${props => props.theme.text.primary};
`;

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <ReportsContainer>
      <PageHeader>
        <PageTitle>Reports & Analytics</PageTitle>
        <PageActions>
          <Button>
            <FiDownload /> Export
          </Button>
          <Button primary>
            <FiRefreshCw /> Refresh
          </Button>
        </PageActions>
      </PageHeader>
      
      <FilterContainer>
        <DateRangeSelector>
          <FiCalendar /> Last 30 Days
        </DateRangeSelector>
      </FilterContainer>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Tab>
        <Tab 
          active={activeTab === 'cases'} 
          onClick={() => setActiveTab('cases')}
        >
          Case Analytics
        </Tab>
        <Tab 
          active={activeTab === 'clients'} 
          onClick={() => setActiveTab('clients')}
        >
          Client Analytics
        </Tab>
        <Tab 
          active={activeTab === 'financial'} 
          onClick={() => setActiveTab('financial')}
        >
          Financial Reports
        </Tab>
        <Tab 
          active={activeTab === 'performance'} 
          onClick={() => setActiveTab('performance')}
        >
          Performance Metrics
        </Tab>
      </TabsContainer>
      
      {activeTab === 'overview' && (
        <>
          <StatsGrid>
            <StatCard>
              <StatTitle>Total Active Cases</StatTitle>
              <StatValue>38</StatValue>
              <StatChange positive={true}>
                <FiTrendingUp /> 12% from last month
              </StatChange>
            </StatCard>
            
            <StatCard>
              <StatTitle>New Cases This Month</StatTitle>
              <StatValue>14</StatValue>
              <StatChange positive={true}>
                <FiTrendingUp /> 8% from last month
              </StatChange>
            </StatCard>
            
            <StatCard>
              <StatTitle>Cases Settled</StatTitle>
              <StatValue>7</StatValue>
              <StatChange positive={true}>
                <FiTrendingUp /> 16% from last month
              </StatChange>
            </StatCard>
            
            <StatCard>
              <StatTitle>Average Settlement</StatTitle>
              <StatValue>$42,850</StatValue>
              <StatChange positive={true}>
                <FiTrendingUp /> 5% from last month
              </StatChange>
            </StatCard>
          </StatsGrid>
          
          <ChartsGrid>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Case Status Distribution</ChartTitle>
                <ChartActions>
                  <ChartActionButton>
                    <FiDownload />
                  </ChartActionButton>
                </ChartActions>
              </ChartHeader>
              <ChartPlaceholder>
                <FiBarChart2 size={48} />
              </ChartPlaceholder>
            </ChartCard>
            
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Case Types</ChartTitle>
                <ChartActions>
                  <ChartActionButton>
                    <FiDownload />
                  </ChartActionButton>
                </ChartActions>
              </ChartHeader>
              <ChartPlaceholder>
                <FiPieChart size={48} />
              </ChartPlaceholder>
            </ChartCard>
          </ChartsGrid>
          
          <TableCard>
            <TableHeader>
              <TableTitle>Recent Settlements</TableTitle>
              <Button>View All</Button>
            </TableHeader>
            
            <Table>
              <thead>
                <TableHeaderRow>
                  <TableHeaderCell>Case</TableHeaderCell>
                  <TableHeaderCell>Client</TableHeaderCell>
                  <TableHeaderCell>Settlement Amount</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Attorney</TableHeaderCell>
                </TableHeaderRow>
              </thead>
              <TableBody>
                <TableRow>
                  <TableCell>Brown v. Retail Store Inc.</TableCell>
                  <TableCell>Michael Brown</TableCell>
                  <TableCell>$65,000</TableCell>
                  <TableCell>Apr 12, 2025</TableCell>
                  <TableCell>John Doe</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Garcia v. Insurance Co.</TableCell>
                  <TableCell>Ana Garcia</TableCell>
                  <TableCell>$42,500</TableCell>
                  <TableCell>Apr 08, 2025</TableCell>
                  <TableCell>Jane Smith</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thompson v. City Hospital</TableCell>
                  <TableCell>Robert Thompson</TableCell>
                  <TableCell>$78,250</TableCell>
                  <TableCell>Apr 05, 2025</TableCell>
                  <TableCell>John Doe</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lee v. Construction LLC</TableCell>
                  <TableCell>Jennifer Lee</TableCell>
                  <TableCell>$35,000</TableCell>
                  <TableCell>Apr 02, 2025</TableCell>
                  <TableCell>Jane Smith</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Martinez v. Auto Company</TableCell>
                  <TableCell>Carlos Martinez</TableCell>
                  <TableCell>$52,750</TableCell>
                  <TableCell>Mar 28, 2025</TableCell>
                  <TableCell>John Doe</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableCard>
        </>
      )}
    </ReportsContainer>
  );
};

export default Reports;
