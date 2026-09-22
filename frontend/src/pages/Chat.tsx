import React from 'react';
import { ChatWindow } from '../components/Chat/ChatWindow';
import { mockMessages } from '../services/mockData';

export const Chat: React.FC = () => {
  return (
    <div className="h-[calc(100vh-4rem)] p-3 sm:p-5 flex flex-col max-w-6xl mx-auto w-full">
      <ChatWindow initialMessages={mockMessages['chat-1']} chatTitle="Interactive Assistant & Reasoning" />
    </div>
  );
};
