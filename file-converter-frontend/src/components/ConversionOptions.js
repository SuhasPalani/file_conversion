import React from 'react';
import { motion } from 'framer-motion';

const ConversionOptions = ({ setOutputFormat }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <label htmlFor="output-format" className="block mb-2 text-sm font-medium text-gray-700">Select output format:</label>
      <select
        id="output-format"
        onChange={(e) => setOutputFormat(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select format</option>
        <option value="mp3">MP3</option>
        <option value="wav">WAV</option>
        <option value="pdf">PDF</option>
        <option value="docx">DOCX</option>
        <option value="txt">TXT</option>
      </select>
    </motion.div>
  );
};

export default ConversionOptions;