import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

const ClientsContainer = styled.div``;

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

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.divider};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.text.secondary};
`;

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.text.primary};
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.background};
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

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ClientCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px ${props => props.theme.shadow};
  }
`;

const ClientHeader = styled.div`
  padding: 1.5rem;
  background-color: ${props => props.theme.primary}10;
  display: flex;
  align-items: center;
`;

const ClientAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text.primary};
`;

const ClientType = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.text.secondary};
`;

const ClientBody = styled.div`
  padding: 1.5rem;
`;

const ClientDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  svg {
    color: ${props => props.theme.primary};
    margin-right: 0.75rem;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`;

const ClientDetailText = styled.div`
  color: ${props => props.theme.text.primary};
  word-break: break-word;
`;

const ClientFooter = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.divider};
`;

const ClientAction = styled.button`
  flex: 1;
  padding: 1rem;
  background: none;
  color: ${props => props.theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.primary};
  }
  
  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.divider};
  }
`;

const ClientManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data for clients
  const clientsData = [
    {
      id: 'client-001',
      name: 'Sarah Johnson',
      type: 'Active Client',
      email: 'sarah.johnson@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 94103',
      cases: 1,
      status: 'active'
    },
    {
      id: 'client-002',
      name: 'Maria Rodriguez',
      type: 'Active Client',
      email: 'maria.rodriguez@example.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Anytown, CA 94103',
      cases: 1,
      status: 'active'
    },
    {
      id: 'client-003',
      name: 'Robert Smith',
      type: 'Active Client',
      email: 'robert.smith@example.com',
      phone: '(555) 345-6789',
      address: '789 Pine St, Anytown, CA 94103',
      cases: 1,
      status: 'active'
    },
    {
      id: 'client-004',
      name: 'James Williams',
      type: 'Active Client',
      email: 'james.williams@example.com',
      phone: '(555) 456-7890',
      address: '101 Cedar Blvd, Anytown, CA 94103',
      cases: 1,
      status: 'active'
    },
    {
      id: 'client-005',
      name: 'Michael Brown',
      type: 'Active Client',
      email: 'michael.brown@example.com',
      phone: '(555) 567-8901',
      address: '202 Maple Dr, Anytown, CA 94103',
      cases: 1,
      status: 'active'
    },
    {
      id: 'client-006',
      name: 'Emily Davis',
      type: 'Lead',
      email: 'emily.davis@example.com',
      phone: '(555) 678-9012',
      address: '303 Elm St, Anytown, CA 94103',
      cases: 0,
      status: 'lead'
    },
    {
      id: 'client-007',
      name: 'David Miller',
      type: 'Lead',
      email: 'david.miller@example.com',
      phone: '(555) 789-0123',
      address: '404 Birch Ave, Anytown, CA 94103',
      cases: 0,
      status: 'lead'
    },
    {
      id: 'client-008',
      name: 'Jennifer Wilson',
      type: 'Inactive Client',
      email: 'jennifer.wilson@example.com',
      phone: '(555) 890-1234',
      address: '505 Walnut St, Anytown, CA 94103',
      cases: 1,
      status: 'inactive'
    }
  ];
  
  // Filter clients based on active tab
  const filteredClients = activeTab === 'all' 
    ? clientsData 
    : clientsData.filter(client => client.status === activeTab);
  
  return (
    <ClientsContainer>
      <PageHeader>
        <PageTitle>Client Management</PageTitle>
        <PageActions>
          <Button primary>
            <FiPlus /> Add Client
          </Button>
        </PageActions>
      </PageHeader>
      
      <FilterContainer>
        <SearchBar>
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SearchInput placeholder="Search clients..." />
        </SearchBar>
        
        <FilterButton>
          <FiFilter /> Filter
        </FilterButton>
      </FilterContainer>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          All Clients
        </Tab>
        <Tab 
          active={activeTab === 'active'} 
          onClick={() => setActiveTab('active')}
        >
          Active Clients
        </Tab>
        <Tab 
          active={activeTab === 'lead'} 
          onClick={() => setActiveTab('lead')}
        >
          Leads
        </Tab>
        <Tab 
          active={activeTab === 'inactive'} 
          onClick={() => setActiveTab('inactive')}
        >
          Inactive Clients
        </Tab>
      </TabsContainer>
      
      <ClientsGrid>
        {filteredClients.map(client => (
          <ClientCard key={client.id}>
            <ClientHeader>
              <ClientAvatar>
                {client.name.charAt(0)}
              </ClientAvatar>
              <ClientInfo>
                <ClientName>{client.name}</ClientName>
                <ClientType>{client.type}</ClientType>
              </ClientInfo>
            </ClientHeader>
            
            <ClientBody>
              <ClientDetail>
                <FiMail />
                <ClientDetailText>{client.email}</ClientDetailText>
              </ClientDetail>
              <ClientDetail>
                <FiPhone />
                <ClientDetailText>{client.phone}</ClientDetailText>
              </ClientDetail>
              <ClientDetail>
                <FiMapPin />
                <ClientDetailText>{client.address}</ClientDetailText>
              </ClientDetail>
              <ClientDetail>
                <FiUser />
                <ClientDetailText>{client.cases} {client.cases === 1 ? 'Case' : 'Cases'}</ClientDetailText>
              </ClientDetail>
            </ClientBody>
            
            <ClientFooter>
              <ClientAction>
                <FiEdit /> Edit
              </ClientAction>
              <ClientAction>
                <FiTrash2 /> Delete
              </ClientAction>
            </ClientFooter>
          </ClientCard>
        ))}
      </ClientsGrid>
    </ClientsContainer>
  );
};

export default ClientManagement;
