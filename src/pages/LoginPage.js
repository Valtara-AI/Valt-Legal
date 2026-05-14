import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.background};
  padding: 1rem;
`;

const LoginCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 3rem;
  box-shadow: 0 10px 40px ${props => props.theme.shadow};
  width: 100%;
  max-width: 450px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    color: ${props => props.theme.primary};
    margin: 0 0 0.5rem;
    
    span {
      color: ${props => props.theme.secondary};
    }
  }
  
  p {
    color: ${props => props.theme.text.secondary};
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${props => props.theme.text.secondary};
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
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

const RememberMeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  
  input {
    margin-right: 0.5rem;
  }
`;

const ForgotPasswordLink = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.secondary};
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.secondary};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.theme.error}20;
  color: ${props => props.theme.error};
  border-radius: 4px;
  font-size: 0.9rem;
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.text.secondary};
  
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }
`;

const DemoInfo = styled.div`
  background-color: ${props => props.theme.info}20;
  border: 1px solid ${props => props.theme.info};
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: ${props => props.theme.text.primary};
  
  strong {
    display: block;
    color: ${props => props.theme.info};
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0.25rem 0;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Try demo@example.com / demo123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>Personal<span>Injury</span>CRM</h1>
          <p>Login to your account</p>
        </Logo>

        <DemoInfo>
          <strong>Demo Credentials:</strong>
          <p>📧 Email: demo@example.com</p>
          <p>🔑 Password: demo123</p>
        </DemoInfo>

        {error && (
          <ErrorMessage>
            <FiAlertCircle />
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <FiMail />
              </InputIcon>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon>
                <FiLock />
              </InputIcon>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>

          <RememberMeWrapper>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </CheckboxLabel>
            <ForgotPasswordLink href="#forgot">Forgot password?</ForgotPasswordLink>
          </RememberMeWrapper>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </Form>

        <SignupLink>
          Don't have an account? <a href="/signup">Sign up here</a>
        </SignupLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
