"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import serverUrls from '@/backend/serverUrls';

interface WebSocketContextType {
  messages: Message[];
  sendMessage: (chatMode:string, content: string, attachments?: String[]) => void;
  isConnected: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentlyTyping: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyTyping, setCurrentlyTyping] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    

    const sessionId = `${uuidv4()}`;
    document.cookie = sessionId;

    const ws = new WebSocket(`${serverUrls.ws}/ws/chat/2/?sessionid=${sessionId}`);
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      setCurrentlyTyping(true);
      const data = JSON.parse(event.data);
      const newMessage: Message = {
        id: uuidv4(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = useCallback((chatMode:string, content: string, attachments?:Array<(
    {
      file_name: string;
      url: string;
    }
  )> ) => {
    setIsLoading(true);
    if (!socket || !isConnected) return;

    const newMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      mode: chatMode,
      timestamp: new Date(),
      attachments
    };

    // Nếu có file đính kèm
    if (attachments?.length) {
      socket.send(JSON.stringify({ message: newMessage, attachments }));
    } else {
      socket.send(JSON.stringify({ message: newMessage }));
    }

    setMessages(prev => [...prev, newMessage]);
  }, [socket, isConnected]);

  if (!mounted) {
    return null;
  }

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, isConnected, isLoading, setIsLoading, currentlyTyping }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}; 