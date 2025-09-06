import React from 'react';
import { Message } from '@/data/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={cn(
        'flex w-full',
        isSender ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[70%] p-3 rounded-lg shadow-md',
          isSender
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-muted-foreground rounded-bl-none'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className={cn("text-xs mt-1 block", isSender ? "text-primary-foreground/80" : "text-muted-foreground/80")}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;