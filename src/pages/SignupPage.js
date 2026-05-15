import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUser, FiMail, FiLock, FiPhone, FiBuilding, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.secondary} 100%);
  padding: 2rem;
`;

const SignupBox = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 3rem;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 10px 40px ${props => props.theme.shadow};
  max-height: 90vh;
  overflow-y: auto;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    color: ${props => props.theme.primary};
    margin: 0;
    
    span {
      color: ${props => props.theme.secondary};
    }
  }
  
  p {
    color: ${props => props.theme.text.secondary};
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &.half {
    width: calc(50% - 0.75rem);
    display: inline-block;
    margin-right: 1.5rem;
    
    &:nth-child(even) {
      margin-right: 0;
    }
    
    @media (max-width: 576px) {
      width: 100%;
      display: block;
      margin-right: 0;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
  font-size: 0.95rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.text.secondary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
  
  option {
    background-color: ${props => props.theme.surface};
    color: ${props => props.theme.text.primary};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: ${props => props.theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleIcon = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  input {
    margin-right: 0.5rem;
    margin-top: 0.25rem;
    cursor: pointer;
  }
  
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${props => props.theme.shadow};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.error}20;
  color: ${props => props.theme.error};
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  border-left: 3px solid ${props => props.theme.error};
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    firmName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firmSize: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userData', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        firmName: formData.firmName
      }));

      navigate('/dashboard');
    }, 1000);
  };

  return (
    <SignupContainer>
      <SignupBox>
        <Logo>
          <h1>Personal<span>Injury</span>CRM</h1>
          <p>Create Your Account</p>
        </Logo>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSignup}>
          <FormGroup className="half">
            <Label htmlFor="firstName">First Name *</Label>
            <InputWrapper>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup className="half">
            <Label htmlFor="lastName">Last Name *</Label>
            <InputWrapper>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <InputWrapper>
              <InputIcon>
                <FiMail />
              </InputIcon>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="firmName">Law Firm Name</Label>
            <InputWrapper>
              <InputIcon>
                <FiBuilding />
              </InputIcon>
              <Input
                id="firmName"
                type="text"
                placeholder="Your Law Firm"
                name="firmName"
                value={formData.firmName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <InputWrapper>
              <InputIcon>
                <FiPhone />
              </InputIcon>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="firmSize">Firm Size</Label>
            <InputWrapper>
              <InputIcon>
                <FiBuilding />
              </InputIcon>
              <Select
                id="firmSize"
                name="firmSize"
                value={formData.firmSize}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">Select firm size</option>
                <option value="solo">Solo Practitioner</option>
                <option value="small">Small (2-5 attorneys)</option>
                <option value="medium">Medium (6-20 attorneys)</option>
                <option value="large">Large (20+ attorneys)</option>
              </Select>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password *</Label>
            <InputWrapper>
              <InputIcon>
                <FiLock />
              </InputIcon>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <ToggleIcon
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleIcon>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <InputWrapper>
              <InputIcon>
                <FiLock />
              </InputIcon>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
              <ToggleIcon
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleIcon>
            </InputWrapper>
          </FormGroup>

          <CheckboxLabel>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={isLoading}
            />
            I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a> *
          </CheckboxLabel>

          <SignupButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : <>Create Account <FiArrowRight size={18} /></>}
          </SignupButton>
        </form>

        <LoginLink>
          Already have an account? <a href="/login">Sign in here</a>
        </LoginLink>
      </SignupBox>
    </SignupContainer>
  );
};

export default SignupPage;