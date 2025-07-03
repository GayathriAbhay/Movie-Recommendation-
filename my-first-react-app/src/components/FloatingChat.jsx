import React, { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import Chatbot from './Chatbot';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMessageCircle size={24} />
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[350px] max-h-[550px] bg-dark-100 rounded-xl shadow-xl border border-gray-600 overflow-hidden">
          <Chatbot onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default FloatingChat;
