import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text.primary};
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.primary};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  section {
    padding: 4rem 0;
    scroll-margin-top: 80px;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &.btn-primary {
      background-color: ${props => props.theme.primary};
      color: white;
      
      &:hover {
        background-color: ${props => props.theme.secondary};
      }
    }
    
    &.btn-outline {
      background-color: transparent;
      border: 2px solid ${props => props.theme.primary};
      color: ${props => props.theme.primary};
      
      &:hover {
        background-color: ${props => props.theme.primary};
        color: white;
      }
    }
  }

  .card {
    background-color: ${props => props.theme.surface};
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px ${props => props.theme.shadow};
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px ${props => props.theme.shadow};
    }
  }

  @media (max-width: 768px) {
    section {
      padding: 3rem 0;
    }
    
    .container {
      padding: 0 1rem;
    }
  }
`;

export default GlobalStyles;
