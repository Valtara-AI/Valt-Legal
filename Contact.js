import React from 'react';
import styled from 'styled-components';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const ContactSection = styled.section`
  background-color: ${props => props.theme.background};
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.primary};
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.primary};
    margin: 1rem auto 0;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: ${props => props.theme.text.secondary};
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${props => props.theme.shadow};
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.primary};
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.theme.primary};
    margin-right: 1rem;
  }
`;

const ContactInfoText = styled.div`
  h4 {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    color: ${props => props.theme.text.primary};
  }
  
  p {
    color: ${props => props.theme.text.secondary};
    margin-bottom: 0;
  }
`;

const ContactForm = styled.form`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${props => props.theme.shadow};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <div className="container">
        <SectionTitle>Get In Touch</SectionTitle>
        <SectionSubtitle>
          Have questions about our Personal Injury CRM? We're here to help.
        </SectionSubtitle>
        
        <ContactContainer>
          <ContactInfo>
            <ContactInfoTitle>Contact Information</ContactInfoTitle>
            
            <ContactInfoItem>
              <FiMail />
              <ContactInfoText>
                <h4>Email</h4>
                <p>info@personalinjurycrm.com</p>
              </ContactInfoText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <FiPhone />
              <ContactInfoText>
                <h4>Phone</h4>
                <p>(800) 123-4567</p>
              </ContactInfoText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <FiMapPin />
              <ContactInfoText>
                <h4>Address</h4>
                <p>123 Legal Street, Suite 100<br />San Francisco, CA 94103</p>
              </ContactInfoText>
            </ContactInfoItem>
          </ContactInfo>
          
          <ContactForm>
            <FormRow>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormInput type="text" placeholder="John" />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormInput type="text" placeholder="Doe" />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput type="email" placeholder="john@example.com" />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput type="tel" placeholder="(123) 456-7890" />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel>Law Firm</FormLabel>
              <FormInput type="text" placeholder="Doe & Associates" />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea placeholder="How can we help you?"></FormTextarea>
            </FormGroup>
            
            <SubmitButton type="submit">
              Send Message <FiSend />
            </SubmitButton>
          </ContactForm>
        </ContactContainer>
      </div>
    </ContactSection>
  );
};

export default Contact;
