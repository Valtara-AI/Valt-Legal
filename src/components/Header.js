import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMoon, FiSun, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
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
    display: ${props => props.$mobileOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    background-color: ${props => props.theme.surface};
    padding: 1rem 1.5rem 1.5rem;
    box-shadow: 0 4px 6px ${props => props.theme.shadow};
  }
`;

const NavLink = styled.a`
  margin-left: 2rem;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
  transition: color 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 0.6rem 0;
    width: 100%;
  }

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  font-size: 1.5rem;
  color: ${props => props.theme.text.primary};
  border: none;
  cursor: pointer;

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
  border: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 0.6rem 0;
  }

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  margin-left: 2rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
  }

  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const Header = ({ onLogout }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <HeaderContainer>
      <div className="container">
        <NavContainer>
          <Logo>
            Personal<span>Injury</span>CRM
          </Logo>

          <NavLinks $mobileOpen={mobileOpen}>
            <NavLink href="#features" onClick={handleNavClick}>Features</NavLink>
            <NavLink href="#pricing" onClick={handleNavClick}>Pricing</NavLink>
            <NavLink href="#testimonials" onClick={handleNavClick}>Testimonials</NavLink>
            <NavLink href="#contact" onClick={handleNavClick}>Contact</NavLink>
            {!onLogout && (
              <NavLink href="/login" onClick={handleNavClick}>Log In</NavLink>
            )}
            <ThemeToggle onClick={toggleTheme}>
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
            {onLogout && (
              <ActionButton onClick={onLogout}>
                <FiLogOut /> Logout
              </ActionButton>
            )}
          </NavLinks>

          <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavContainer>
      </div>
    </HeaderContainer>
  );
};

export default Header;
