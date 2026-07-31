import React from 'react';
import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.surface};
  padding: 4rem 0 2rem;
  color: ${props => props.theme.text.primary};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
  
  span {
    color: ${props => props.theme.secondary};
  }
`;

const FooterDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.primary};
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: ${props => props.theme.text.secondary};
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterCopyright = styled.p`
  color: ${props => props.theme.text.secondary};
  display: flex;
  align-items: center;
  
  svg {
    color: ${props => props.theme.error};
    margin: 0 0.3rem;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterColumn>
            <FooterLogo>
              Personal<span>Injury</span>CRM
            </FooterLogo>
            <FooterDescription>
              Case management built for personal injury firms — track every case from intake to settlement, manage clients and leads, and keep documents and reporting in one place.
            </FooterDescription>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Company</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="/about">About Us</a></FooterLink>
              <FooterLink><a href="/careers">Careers</a></FooterLink>
              <FooterLink><a href="/blog">Blog</a></FooterLink>
              <FooterLink><a href="/press">Press</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Resources</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="/help">Help Center</a></FooterLink>
              <FooterLink><a href="/tutorials">Tutorials</a></FooterLink>
              <FooterLink><a href="/api">API Documentation</a></FooterLink>
              <FooterLink><a href="/status">System Status</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Legal</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="/terms">Terms of Service</a></FooterLink>
              <FooterLink><a href="/privacy">Privacy Policy</a></FooterLink>
              <FooterLink><a href="/security">Security</a></FooterLink>
              <FooterLink><a href="/compliance">Compliance</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <FooterCopyright>
            © {new Date().getFullYear()} Valtara Inc. Made with <FiHeart /> in San Francisco
          </FooterCopyright>
          
          <FooterSocial>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
          </FooterSocial>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
