



import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { RiContactsBook2Line } from 'react-icons/ri';

type ChatMessage = {
  id: number;
  text: string;
  isUser: boolean;
  admin: string;
  time: string;
  preview: string;
};

type UserProps = {
  chatId: number;
  user: {
    id: number;
    sender: string;
    email: string;
    image: string;
    preview: string;
  } | null;
  inputMessages: Record<number, string>;
  setInputMessages: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  toggleSidePanel: () => void;
};

const Main: React.FC<UserProps> = ({ chatId, user, inputMessages, setInputMessages,toggleSidePanel}) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setTimeout(() => {
      setChatHistory([
        { id: 1, text: `Hello from ${user.sender}`, isUser: false, admin: 'Admin X', time: '12:45 PM', preview: `Hello from ${user.sender}` },
      ]);
      setLoading(false);
    }, 400);
  }, [chatId, user]);

  const sendMessage = () => {
    const currentMessage = inputMessages[chatId] || '';

    if (!currentMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: chatHistory.length + 1,
      text: currentMessage,
      isUser: true,
      admin: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      preview: currentMessage,
    };

    setChatHistory((prev) => [...prev, newMessage]);
    setInputMessages((prev) => ({ ...prev, [chatId]: '' })); // Clear input for the current chat
  };

  if (!user) {
    return <div className="flex items-center justify-center h-full text-gray-400">User not found</div>;
  }

  return (
    
     
    <div className="w-full flex flex-col" key={chatId}>
      <div className="p-2  border-b flex justify-between items-center space-x-4">
        <img src={user?.image} className="w-10 h-10 rounded-full" alt="avatar" />
        <div>
          <h3 className="font-semibold">{user?.sender}</h3>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
        <button  onClick={toggleSidePanel}><FaRegUserCircle /></button> 
        {/* when toggle button feature add here according also anlaysis the picture once again  i click the new card will shown */}
        
      </div>

      {/* Messages */}
      <div className="h-screen p-6 overflow-y-auto space-y-4 bg-gray-50" key={chatId}>
        <div className="text-center text-gray-500" >Today</div>
        {loading ? (
        
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          chatHistory.map((msg) => (
    <>
    <div key={msg.id} className={`p-4 rounded-lg max-w-sm outline ${msg.isUser ? 'ml-auto bg-blue-400 text-white' : 'bg-gray-100'}`}>
              <p>{user.preview}</p>
              <div className="text-xs mt-1 text-gray-100">{msg.admin} • </div>
            </div>
              <div>{msg.time}</div>
            </>       
             
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center space-x-2">
        <input
          type="text"
          value={inputMessages[chatId] || ''}
          onChange={(e) => setInputMessages((prev) => ({ ...prev, [chatId]: e.target.value }))}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button>
          <RiContactsBook2Line className="text-gray-500" />
        </button>
        <button
          onClick={sendMessage}
          className="p-3 hover:outline outline-gray-100 rounded-lg"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default Main;

