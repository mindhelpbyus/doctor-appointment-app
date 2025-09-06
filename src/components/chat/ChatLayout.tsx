import React from 'react';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-[calc(100vh-160px)] border rounded-lg overflow-hidden shadow-lg">
      {children}
    </div>
  );
};

export default ChatLayout;