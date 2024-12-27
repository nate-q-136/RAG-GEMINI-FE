"use client";

import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatModeToggle from './ChatModeToggle';
import { WebSocketProvider } from '@/contexts/WebSocketContext';

const ChatContainer = () => {
    const [chatMode, setChatMode] = useState<'normal' | 'rag'>('normal');

    return (
        <WebSocketProvider>
            <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto p-4">
                <ChatModeToggle mode={chatMode} onModeChange={setChatMode} />
                <div className="flex-1 flex flex-col space-y-4 bg-white rounded-lg shadow-lg p-4">
                    {chatMode === 'rag' && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-blue-800 mb-2">Chat with documents</h3>
                            <p className="text-sm text-blue-600">
                                Upload your files to ask information about them.
                            </p>
                        </div>
                    )}

                    <ChatMessages mode={chatMode} />
                    <ChatInput mode={chatMode} />
                </div>
            </div>
        </WebSocketProvider>
    );
};

export default ChatContainer; 