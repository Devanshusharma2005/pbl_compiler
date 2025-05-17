import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isEditorRoute = location.pathname === '/editor';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200"
          >
            <Code2 className="w-8 h-8" />
            <span className="text-xl font-bold">DevCivo</span>
          </Link>

          <div className="flex items-center space-x-4">
            {!isEditorRoute && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/editor"
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Open Editor
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;