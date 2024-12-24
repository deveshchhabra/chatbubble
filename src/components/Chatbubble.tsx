
// Parent Component (Chatbubble.tsx)
import React, { useState } from 'react';
import { FaInstagram, FaSearch } from 'react-icons/fa';
import Data from '../constant/data.json';
import Main from './main';
import SidePanel from './SidePannel';

const Chatbubble: React.FC = () => {
  const [messages, setMessages] = useState(Data);
  const [search, setSearch] = useState('');
  const [selectedChat, setselectedChat] = useState<number | null>(null);
  const [inputMessages, setInputMessages] = useState<Record<number, string>>({});
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const handleChatClick = (id: number) => {
    setselectedChat(id);
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className='flex h-screen w-full rounded-lg'>
      <div className='w-[25%] border-r flex flex-col py-6'>
        <div className='flex justify-between'>
          <div className='flex text-xl'>
            <FaInstagram className='text-pink-400 text-3xl' />
            <div>
              BlueChat
              <h2 className='text-sm text-gray-400'>Inbox</h2>
            </div>
          </div>
          <div>
            <div className='relative  w-full'>
            <FaSearch className='absolute  left-1 text-sm text-gray-200' /> 
              <input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='relative w-[85%] p-2 rounded-lg outline-none'
                >
           </input>
          
            </div>
          </div>
        </div>

        {messages.filter(msg => msg.sender.toLowerCase().includes(search.toLowerCase())).map((msg) => (
          <div key={msg.id} className='border-b p-2 cursor-pointer' onClick={() => handleChatClick(msg.id)}>
            <div className='flex'>
              <img src={msg.image} className='w-8 h-8 rounded-full' />
              <div className='pl-2'>{msg.sender}</div>
            </div>
            <p className='text-sm text-gray-500'>{msg.preview}</p>
          </div>
        ))}
      </div>

      <div className='w-[75%]'>
        {selectedChat !== null ? (
          <Main
            chatId={selectedChat}
            user={messages.find(msg => msg.id === selectedChat) || null}
            inputMessages={inputMessages}
            setInputMessages={setInputMessages}
            toggleSidePanel={toggleSidePanel}
          />
        ) : (
          <div className='flex items-center justify-center h-full text-gray-400'>Select a chat to start messaging</div>
        )}
      </div>

      {isSidePanelOpen && (
        <div className=' right-0 w-[20%] h-full bg-white shadow-lg'>
          <SidePanel 
            show={isSidePanelOpen} 
            onClose={() => setIsSidePanelOpen(false)} 
            user={messages.find(msg => msg.id === selectedChat) || null} 
          />
        </div>
      )}
    </div>
  );
};

export default Chatbubble;