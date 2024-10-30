import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUploader from '../components/FileUploader';
import ConversionOptions from '../components/ConversionOptions';
import ConvertButton from '../components/ConvertButton';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const [file, setFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleConvert = async () => {
    if (!file || !outputFormat) {
      alert('Please select a file and output format');
      return;
    }

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('output_format', outputFormat);

    try {
      const response = await fetch('http://localhost:5000/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${outputFormat}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('Conversion failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during conversion');
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="p-8">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-center text-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          File Converter
        </motion.h1>
        <FileUploader setFile={setFile} file={file} />
        <ConversionOptions setOutputFormat={setOutputFormat} />
        <ConvertButton 
          onClick={handleConvert} 
          disabled={!file || !outputFormat || isConverting} 
          isConverting={isConverting}
        />
        {isConverting && <ProgressBar progress={progress} />}
      </div>
    </motion.div>
  );
}