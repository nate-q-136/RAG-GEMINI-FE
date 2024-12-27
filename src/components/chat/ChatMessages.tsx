"use client"

import React, { useEffect, useRef } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import TypewriterEffect from '../ui/TypewriterEffect';

interface ChatMessagesProps {
    mode: 'normal' | 'rag';
}

const LoadingDots = () => (
    <div className="flex space-x-2 items-center p-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

const ChatMessages = ({ mode }: ChatMessagesProps) => {
    const { messages, isConnected, isLoading, currentlyTyping, setIsLoading } = useWebSocket();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Hàm cuộn xuống cuối
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg bg-gray-50">
            {!isConnected && (
                <div className="text-center py-3 px-4 bg-red-50 text-red-500 rounded-lg">
                    <p className="font-medium">Server connection failed</p>
                    <p className="text-sm">Reconnecting...</p>
                </div>
            )}

            {messages.length === 0 && (
                <div className="text-center text-gray-500">
                    {mode === 'normal' ? (
                        <p>Start a conversation with AI</p>
                    ) : (
                        <p>Upload files and ask about any information</p>
                    )}
                </div>
            )}

            <div className="space-y-4 h-[calc(100vh-500px)]">
                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                                    ? 'bg-blue-500 text-white shadow-sm'
                                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                                }`}
                        >
                            {message.role === 'assistant' && index === messages.length - 1 && currentlyTyping ? (
                                <TypewriterEffect 
                                    text={message.content} 
                                    onComplete={() => {
                                        setIsLoading(false);
                                        scrollToBottom();
                                    }}
                                />
                            ) : (
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            )}
                            {message.attachments?.map((file) => (
                                <div
                                    key={file.name}
                                    className={`text-sm mt-2 flex items-center gap-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}
                                >
                                    <span>📎</span>
                                    <span>{file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] bg-white rounded-lg border border-gray-200 shadow-sm">
                            <LoadingDots />
                        </div>
                    </div>
                )}

                {/* Ref cho phần cuối cùng */}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    );
};

export default ChatMessages;
