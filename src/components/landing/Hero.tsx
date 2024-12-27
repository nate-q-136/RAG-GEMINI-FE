"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          AI Chat Assistant
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Chat with AI naturally or analyze your documents with our advanced RAG system
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Natural Conversations</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Document Analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Real-time Responses</span>
          </div>
        </div>

        <Link 
          href="/chat" 
          className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
        >
          Get Started
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-10 w-full max-w-4xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature 
            title="Chat Naturally"
            description="Engage in natural conversations with our AI assistant"
            icon="💬"
          />
          <Feature 
            title="Document Analysis"
            description="Upload documents and get instant insights"
            icon="📄"
          />
          <Feature 
            title="Real-time Processing"
            description="Get responses in real-time with WebSocket connection"
            icon="⚡"
          />
        </div>
      </motion.div>
    </div>
  );
};

const Feature = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-purple-400">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Hero; 