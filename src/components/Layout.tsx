import  { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent dark:from-blue-400/5 dark:via-purple-400/5 pointer-events-none" />
        <div className="relative">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;