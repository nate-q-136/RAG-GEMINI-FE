"use client"

import React, { useState } from 'react';
import { Upload } from '../ui/Upload';
import { useWebSocket } from '@/contexts/WebSocketContext';
import http from "@/backend/http";
import ENDPOINTS from "@/backend/endpoints";
import LoadingSpinner from '../ui/LoadingSpinner';

interface ChatInputProps {
  mode: 'normal' | 'rag';
}

const ChatInput = ({ mode }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const {sendMessage, isConnected, isLoading } = useWebSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading2(true);
    if (!message.trim() && attachments.length === 0) return;
    if (mode === 'rag' && attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach(file => {
        formData.append('files', file);
        });
        const uploadResponse = await http.post(ENDPOINTS.upload, formData);
        const uploadedFiles = uploadResponse.data.data
        sendMessage(mode, message, uploadedFiles);

    }else{
        sendMessage(mode, message);
    }
    setIsLoading2(false);


    // sendMessage(message, mode === 'rag' ? attachments : undefined);
    setMessage('');
    setAttachments([]);
  };

  const handleFileSelect = (files: File[]) => {
    setAttachments(files);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === 'rag' && (
        <Upload onFileSelect={handleFileSelect} attachments={attachments} />
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={mode === 'normal' ? "What's on your mind?" : "Ask about any information..."}
          className="flex-1 p-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected || isLoading}
        />
        {isLoading2 && <LoadingSpinner />}        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isConnected || isLoading || (!message.trim() && attachments.length === 0)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput; 