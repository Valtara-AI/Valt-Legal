import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.secondary} 100%);
  padding: 2rem;
`;

const LoginBox = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 40px ${props => props.theme.shadow};
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

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  
  input {
    margin-right: 0.5rem;
    cursor: pointer;
  }
  
  &:hover {
    color: ${props => props.theme.text.primary};
  }
`;

const ForgotPassword = styled.a`
  float: right;
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${props => props.theme.shadow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Set authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Redirect to dashboard
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo>
          <h1>Personal<span>Injury</span>CRM</h1>
          <p>Sign In to Your Account</p>
        </Logo>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <FiMail />
              </InputIcon>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
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
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <RememberMe>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              Remember me
            </RememberMe>
            <ForgotPassword href="#forgot">Forgot password?</ForgotPassword>
          </div>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : <>Sign In <FiArrowRight size={18} /></>}
          </LoginButton>
        </form>

        <SignupLink>
          Don't have an account? <a href="/signup">Create one here</a>
        </SignupLink>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;