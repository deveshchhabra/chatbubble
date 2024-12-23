import React, { useState } from 'react';
import { FaSearch, FaPlus, FaInstagram } from 'react-icons/fa';

const initialMessages = [
  { id: 1, sender: 'Oğuz Yağız Kara', preview: 'I keep getting "error while creating...', time: '5m', seen: true },
  { id: 2, sender: 'George Klein', preview: 'Wow, this is really epic man!', time: '1h 54m', seen: false },
  { id: 3, sender: '847-401-1944', preview: 'Haha oh man, this is amazing!', time: '6h 21m', seen: true },
  { id: 4, sender: 'Erşad Başbağ', preview: 'There will be changes to next...', time: '8h 2m', seen: false }
];

const chatHistoryMap: { [key: number]: { id: number; text: string; isUser: boolean; admin: string; time: string; }[] } = {
  1: [
    { id: 1, text: 'I keep getting "error while creating a new pop-up"...', isUser: false, admin: 'Admin X', time: '12:45 PM' }
  ],
  2: [
    { id: 1, text: 'Hey, George! Let me know if you have questions.', isUser: true, admin: 'Admin Y', time: '1:00 PM' }
  ],
  3: [
    { id: 1, text: 'Haha, glad you liked it!', isUser: true, admin: 'Admin Z', time: '6:30 PM' }
  ],
  4: []
};

const user = {
  name: 'Oğuz Yağız Kara',
  email: 'oguz@bluereceipt.com',
  avatar: 'https://via.placeholder.com/40'
};

export default function ChatUI() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter(msg => msg.sender.toLowerCase().includes(search.toLowerCase()));

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: chatHistoryMap[selectedChat].length + 1, text: message, isUser: true, admin: 'Admin X', time: new Date().toLocaleTimeString() };
      chatHistoryMap[selectedChat].push(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="font-bold flex items-center space-x-2">
            <FaInstagram className="text-pink-500 text-2xl" />
            <span>BlueChat Inbox</span>
          </div>
          <FaPlus className="cursor-pointer text-xl" />
        </div>
        <div className="p-4">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {filteredMessages.map((msg) => (
          <div key={msg.id} onClick={() => setSelectedChat(msg.id)} className="p-4 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center">
            <div>
              <h4 className="font-medium">{msg.sender+"dev"}</h4>
              <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
            {msg.seen ? <span>&#x2713;&#x2713;</span> : <span>&#x2713;</span>}
          </div>
        ))}
      </div>
      
      {/* Main Chat Window */}
      <div className="w-3/4 flex flex-col">
        <div className="p-4 border-b flex items-center space-x-4">
          <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {chatHistoryMap[selectedChat].map((msg) => (
            <div key={msg.id} className={`p-4 rounded-lg max-w-xs ${msg.isUser ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-100'}`}>
              <p>{msg.text}</p>
              <div className="text-xs text-gray-400 mt-1">{msg.admin} | {msg.time}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={sendMessage} className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}