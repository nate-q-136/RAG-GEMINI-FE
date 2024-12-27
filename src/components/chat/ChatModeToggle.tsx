"use client"

import React from 'react';

interface ChatModeToggleProps {
  mode: 'normal' | 'rag';
  onModeChange: (mode: 'normal' | 'rag') => void;
}

const ChatModeToggle = ({ mode, onModeChange }: ChatModeToggleProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        <button
          onClick={() => onModeChange('normal')}
          className={`px-4 py-2 rounded-md transition-all ${
            mode === 'normal'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Normal Chat
        </button>
        <button
          onClick={() => onModeChange('rag')}
          className={`px-4 py-2 rounded-md transition-all ${
            mode === 'rag'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Chat With Documents
        </button>
      </div>
    </div>
  );
};

export default ChatModeToggle; 