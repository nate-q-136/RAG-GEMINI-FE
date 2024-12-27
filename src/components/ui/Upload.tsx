"use client"

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadProps {
  onFileSelect: (files: File[]) => void;
  attachments: File[];
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const Upload = ({ onFileSelect, attachments }: UploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/csv': ['.csv']
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map(file => {
          if (file.file.size > MAX_FILE_SIZE) {
            return `${file.file.name} is too large. Maximum size is 10MB.`;
          }
          return `${file.file.name} has an invalid file type.`;
        });
        setError(errorMessages.join('\n'));
        return;
      }
      setError(null);
      onFileSelect(acceptedFiles);
    }
  });

  const handleRemoveFile = (fileName: string) => {
    onFileSelect(attachments.filter(file => file.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${error ? 'border-red-300 hover:border-red-400 bg-red-50' : 'border-gray-300 hover:border-blue-500'}`}
      >
        <input {...getInputProps()} />
        <p className='text-gray-800'>Choose or drag files to this place</p>
        <p className="text-sm text-gray-500">(.pdf, .docx, .csv - Max 10MB)</p>
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {attachments.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 font-medium">Selected files:</p>
          <ul className="text-sm text-gray-600">
            {attachments.map((file) => (
              <li key={file.name} className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span>📎</span>
                  <span className="truncate">{file.name}</span>
                  <span className="text-gray-400">({formatFileSize(file.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.name);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 