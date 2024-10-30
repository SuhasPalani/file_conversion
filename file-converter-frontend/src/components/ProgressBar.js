import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div 
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-600">{progress}% Complete</p>
    </div>
  );
};

export default ProgressBar;