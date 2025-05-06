
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={cn(
      'flex',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[80%] p-3 rounded-lg',
        isUser 
          ? 'bg-luxury-gold text-white rounded-tr-none' 
          : 'bg-white text-luxury-black border border-gray-200 rounded-tl-none shadow-sm'
      )}>
        <p>{message}</p>
        <p className={cn(
          'text-xs mt-1',
          isUser ? 'text-white/70' : 'text-gray-500'
        )}>
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
