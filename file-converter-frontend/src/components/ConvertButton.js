import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const ConvertButton = ({ onClick, disabled, isConverting }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-all duration-300 ease-in-out flex items-center justify-center
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isConverting ? (
        <FiLoader className="animate-spin mr-2" />
      ) : null}
      {isConverting ? 'Converting...' : 'Convert'}
    </motion.button>
  );
};

export default ConvertButton;