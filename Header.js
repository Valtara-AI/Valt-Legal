import React from 'react';
import styled from 'styled-components';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../styles/ThemeProvider';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  
  span {
    color: ${props => props.theme.secondary};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  margin-left: 2rem;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  font-size: 1.5rem;
  color: ${props => props.theme.text.primary};
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  background: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ActionButton = styled.a`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  margin-left: 2rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <HeaderContainer>
      <div className="container">
        <NavContainer>
          <Logo>
            Personal<span>Injury</span>CRM
          </Logo>
          
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <ActionButton href="/login">Login</ActionButton>
            <ThemeToggle onClick={toggleTheme}>
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
          </NavLinks>
          
          <MobileMenuButton>
            ☰
          </MobileMenuButton>
        </NavContainer>
      </div>
    </HeaderContainer>
  );
};

export default Header;
