import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const sendQuery = async () => {
    if (!query.trim()) return;

    const userMessage = { type: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');

    try {
      const res = await fetch('https://chatbot-project-ahby.onrender.com/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          chat_history: [],
        }),
      });

      if (!res.ok) {
        throw new Error('API Error');
      }

      const data = await res.json();
      const botMessage = { type: 'bot', text: data.answer || 'No response received.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: ' Unable to get a response. Please try again later.' },
      ]);
    }
  };

  // Auto-scroll to the bottom on message update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-dark-100 p-6 rounded-xl max-w-md mx-auto mt-10 shadow-lg border border-light-100/10">
      <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="text-3xl"></span>
        Ask our <span className="text-gradient">MovieBot</span>
      </h2>

      <div className="bg-black/20 rounded-lg p-3 h-64 overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm italic text-center">
            Start chatting with MovieBot 🎬
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm max-w-[80%] ${
              msg.type === 'user'
                ? 'bg-purple-700 text-white ml-auto text-right'
                : 'bg-[#cecefb] text-black mr-auto text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuery();
        }}
        className="flex gap-2 items-center mt-4"
      >
        <input
          type="text"
          className="flex-1 p-2 rounded bg-dark-100 text-white border border-light-100 placeholder-gray-400"
          placeholder="Ask something like ‘Best thrillers?’"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
