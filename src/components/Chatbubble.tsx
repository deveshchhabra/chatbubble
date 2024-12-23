import React, { useState } from 'react'
import { FaInstagram, FaSearch } from 'react-icons/fa'
import Data from '../constant/data.json'
import Main from './main'

const Chatbubble: React.FC = () => {
    const [messages, setMessages] = useState(Data);
  const [search, setSearch] = useState('');
  const [selectedChat, setselectedChat] = useState<number|null>(null);
  const [inputMessages,setInputMessages]=useState<Record<number,string>>({})

    const filteredMessages = messages.filter(msg => msg.sender.toLowerCase().includes(search.toLowerCase())); //Filter based on search input value
    const handleChatClick=(id:number)=>{
        setselectedChat(id);
    };

  return (
    
      <div className='flex h-screen  outline-gray-200 w-full   rounded-lg'>
        {/* <span className='text-gray-700 text-2xl   '>⇦</span> */}
      <div className=' w-[25%] border-r flex flex-col py-6  '>
        <div className='flex  justify-between     '>
          {/* html arrow logo */}
            <div className=' flex text-xl    '>
            <FaInstagram className='text-pink-400 text-3xl font-light' />
              <div className='text-xl'>BlueChat
              <h2 className='text-sm block text-gray-400'>Inbox</h2>
            </div>
            </div>
          <div className='flex py-2 '>
            <div className=''>
              <div className='relative '>
               <div> <FaSearch className='absolute top-3 left-40 text-gray-400 font-thin ' />
               </div>
                <input
                  type='text'
                  placeholder='Search...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-[90%] outline-none p-2 focus:border-b-2 rounded-lg '
                />
              </div>
            </div>
            
          </div>
        </div>
        {/* //  */}

      {
          filteredMessages.map((msg)=>(
              <div className='border-b'>
              <div  key={msg.id} 
              className='p-1 flex m-1 justify-between cursor-pointer ' onClick={()=>handleChatClick(msg.id)}>
                {/* handle chat */}
                <div className='flex p-2'>
                <img src={msg.image} className='w-8 h-8 border rounded-full'/>
                <div className='pl-2'>{msg.sender}</div>
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <div className="flex justify-between p-2 m-1">
                <p className=" bloctext-sm text-gray-500 truncate">{msg.preview}</p>
                {msg.seen ? <span className='text-blue-800 text-[10px]' >&#10004;&#10004;</span> : <span className='text-gray-600 text-[10px]'>&#10004;</span>}
                </div>
                </div>
            ))
        }
        </div>
        {/* Main Chat Section */}
        <div className='w-[75%]'>
        {selectedChat !== null ?(
          <Main 
            chatId={selectedChat}  
            // number coming from onclick we select the chat 
            user={filteredMessages.find(msg => msg.id === selectedChat) || null}
            inputMessages={inputMessages}
            setInputMessages={setInputMessages}
          />
        ): (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          Select a chat to start messaging
                        </div>
                      )}
        </div>
       
    </div>
  )
}

export default Chatbubble



