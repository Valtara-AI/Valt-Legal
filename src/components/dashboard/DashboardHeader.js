import React from 'react';
import styled from 'styled-components';
import { FiMenu, FiBell, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../../styles/ThemeProvider';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
  
  @media (max-width: 992px) {
    left: 0;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuToggle = styled.button`
  background: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  margin-right: 1rem;
  display: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 20px;
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

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.25rem;
  margin-left: 1rem;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${props => props.theme.error};
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  
  @media (max-width: 576px) {
    margin-right: 0;
  }
`;

const UserInfo = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

const UserName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
`;

const DashboardHeader = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('firmName');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    
    // Redirect to home
    navigate('/');
  };
  
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuToggle onClick={toggleSidebar}>
          <FiMenu />
        </MenuToggle>
        
        <SearchBar>
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SearchInput placeholder="Search..." />
        </SearchBar>
      </LeftSection>
      
      <RightSection>
        <IconButton aria-label="Notifications">
          <FiBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        
        <UserProfile>
          <UserAvatar>
            <FiUser />
          </UserAvatar>
          <UserInfo>
            <UserName>John Doe</UserName>
            <UserRole>Administrator</UserRole>
          </UserInfo>
        </UserProfile>
        
        <IconButton 
          onClick={handleLogout}
          aria-label="Logout"
          title="Sign out"
        >
          <FiLogOut />
        </IconButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default DashboardHeader;
