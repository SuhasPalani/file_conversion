import React from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col">
      <motion.main 
        className="flex-grow flex items-center justify-center p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="text-center py-4 text-white text-sm">
        © 2024 File Converter. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;