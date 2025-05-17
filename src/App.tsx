import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import CompilerView from './pages/CompilerView';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <CompilerView />
      </Layout>
    </ThemeProvider>
  );
}

export default App;