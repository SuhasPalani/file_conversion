import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

const FileUploader = ({ setFile, file }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <motion.div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ease-in-out mb-6
        ${
          isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {file ? (
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
        ) : isDragActive ? (
          <p className="text-lg text-blue-500">Drop the file here ...</p>
        ) : (
          <div>
            <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              Drag &apos;n&apos; drop a file here, or click to select a file
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: MP3, WAV, PDF, DOCX, TXT
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FileUploader;
