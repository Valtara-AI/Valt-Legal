import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './styles/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Additional routes will be added as we develop more pages */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
