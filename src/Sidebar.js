import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiCalendar, 
  FiMessageSquare, 
  FiPieChart,
  FiSettings,
  FiHelpCircle,
  FiChevronDown,
  FiChevronRight,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { useTheme } from '../../styles/ThemeProvider';

const SidebarContainer = styled.div`
  background-color: ${props => props.theme.surface};
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  box-shadow: 2px 0 5px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  overflow-y: auto;
  
  @media (max-width: 992px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.divider};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  
  span {
    color: ${props => props.theme.secondary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.2rem;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SidebarContent = styled.div`
  padding: 1rem 0;
`;

const SidebarSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${props => props.theme.text.secondary};
  font-weight: 500;
`;

const NavItem = styled.div`
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.background};
  }
  
  ${props => props.active && `
    background-color: ${props.theme.background};
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: ${props.theme.primary};
    }
  `}
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? props.theme.primary : props.theme.text.primary};
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? props.theme.primary : props.theme.text.primary};
  font-weight: ${props => props.active ? '500' : 'normal'};
  cursor: pointer;
  
  svg:first-child {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
  
  svg:last-child {
    margin-left: auto;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  background-color: ${props => props.theme.background};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem 0.75rem 3.5rem;
  color: ${props => props.active ? props.theme.primary : props.theme.text.primary};
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SidebarFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.divider};
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
  text-align: center;
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [openDropdowns, setOpenDropdowns] = useState({
    cases: true,
    clients: false,
    documents: false
  });
  
  const toggleDropdown = (dropdown) => {
    setOpenDropdowns({
      ...openDropdowns,
      [dropdown]: !openDropdowns[dropdown]
    });
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo>
          Personal<span>Injury</span>CRM
        </Logo>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </ThemeToggle>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarSection>
          <NavItem active={isActive('/dashboard')}>
            <NavLink to="/dashboard" active={isActive('/dashboard')}>
              <FiHome />
              Dashboard
            </NavLink>
          </NavItem>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle>Case Management</SectionTitle>
          
          <NavItem active={isActive('/dashboard/cases') || location.pathname.includes('/dashboard/cases/')}>
            <DropdownToggle 
              active={isActive('/dashboard/cases') || location.pathname.includes('/dashboard/cases/')}
              onClick={() => toggleDropdown('cases')}
            >
              <FiFileText />
              Cases
              {openDropdowns.cases ? <FiChevronDown /> : <FiChevronRight />}
            </DropdownToggle>
            
            <DropdownContent isOpen={openDropdowns.cases}>
              <DropdownItem to="/dashboard/cases/all" active={isActive('/dashboard/cases/all')}>
                All Cases
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/intake" active={isActive('/dashboard/cases/intake')}>
                Intake
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/investigation" active={isActive('/dashboard/cases/investigation')}>
                Investigation
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/treatment" active={isActive('/dashboard/cases/treatment')}>
                Treatment
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/negotiation" active={isActive('/dashboard/cases/negotiation')}>
                Negotiation
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/litigation" active={isActive('/dashboard/cases/litigation')}>
                Litigation
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/settlement" active={isActive('/dashboard/cases/settlement')}>
                Settlement
              </DropdownItem>
              <DropdownItem to="/dashboard/cases/closed" active={isActive('/dashboard/cases/closed')}>
                Closed
              </DropdownItem>
            </DropdownContent>
          </NavItem>
          
          <NavItem active={isActive('/dashboard/clients') || location.pathname.includes('/dashboard/clients/')}>
            <DropdownToggle 
              active={isActive('/dashboard/clients') || location.pathname.includes('/dashboard/clients/')}
              onClick={() => toggleDropdown('clients')}
            >
              <FiUsers />
              Clients
              {openDropdowns.clients ? <FiChevronDown /> : <FiChevronRight />}
            </DropdownToggle>
            
            <DropdownContent isOpen={openDropdowns.clients}>
              <DropdownItem to="/dashboard/clients/all" active={isActive('/dashboard/clients/all')}>
                All Clients
              </DropdownItem>
              <DropdownItem to="/dashboard/clients/leads" active={isActive('/dashboard/clients/leads')}>
                Leads
              </DropdownItem>
              <DropdownItem to="/dashboard/clients/active" active={isActive('/dashboard/clients/active')}>
                Active Clients
              </DropdownItem>
              <DropdownItem to="/dashboard/clients/inactive" active={isActive('/dashboard/clients/inactive')}>
                Inactive Clients
              </DropdownItem>
            </DropdownContent>
          </NavItem>
          
          <NavItem active={isActive('/dashboard/calendar')}>
            <NavLink to="/dashboard/calendar" active={isActive('/dashboard/calendar')}>
              <FiCalendar />
              Calendar
            </NavLink>
          </NavItem>
          
          <NavItem active={isActive('/dashboard/messages')}>
            <NavLink to="/dashboard/messages" active={isActive('/dashboard/messages')}>
              <FiMessageSquare />
              Messages
            </NavLink>
          </NavItem>
          
          <NavItem active={isActive('/dashboard/documents') || location.pathname.includes('/dashboard/documents/')}>
            <DropdownToggle 
              active={isActive('/dashboard/documents') || location.pathname.includes('/dashboard/documents/')}
              onClick={() => toggleDropdown('documents')}
            >
              <FiFileText />
              Documents
              {openDropdowns.documents ? <FiChevronDown /> : <FiChevronRight />}
            </DropdownToggle>
            
            <DropdownContent isOpen={openDropdowns.documents}>
              <DropdownItem to="/dashboard/documents/all" active={isActive('/dashboard/documents/all')}>
                All Documents
              </DropdownItem>
              <DropdownItem to="/dashboard/documents/templates" active={isActive('/dashboard/documents/templates')}>
                Templates
              </DropdownItem>
              <DropdownItem to="/dashboard/documents/signed" active={isActive('/dashboard/documents/signed')}>
                Signed Documents
              </DropdownItem>
              <DropdownItem to="/dashboard/documents/pending" active={isActive('/dashboard/documents/pending')}>
                Pending Signatures
              </DropdownItem>
            </DropdownContent>
          </NavItem>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle>Analytics</SectionTitle>
          
          <NavItem active={isActive('/dashboard/reports')}>
            <NavLink to="/dashboard/reports" active={isActive('/dashboard/reports')}>
              <FiPieChart />
              Reports
            </NavLink>
          </NavItem>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle>Settings</SectionTitle>
          
          <NavItem active={isActive('/dashboard/settings')}>
            <NavLink to="/dashboard/settings" active={isActive('/dashboard/settings')}>
              <FiSettings />
              Settings
            </NavLink>
          </NavItem>
          
          <NavItem active={isActive('/dashboard/help')}>
            <NavLink to="/dashboard/help" active={isActive('/dashboard/help')}>
              <FiHelpCircle />
              Help & Support
            </NavLink>
          </NavItem>
        </SidebarSection>
      </SidebarContent>
      
      <SidebarFooter>
        PersonalInjuryCRM v1.0.0
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
