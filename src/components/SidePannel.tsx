// / SidePanel.tsx (Separate Component for Side Panel)
import React, { useState } from 'react';
import { AiFillAlipayCircle } from 'react-icons/ai';
import { CiShoppingCart } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { GoArchive } from 'react-icons/go';
import { HiCurrencyDollar } from 'react-icons/hi';
import { IoIosCall } from 'react-icons/io';
import { LuClock3 } from 'react-icons/lu';
import { MdVideoChat } from 'react-icons/md';
import { RiContactsFill } from 'react-icons/ri';

interface SidePanelProps {
  show: boolean;
  onClose: () => void;
  user: {
    id: number;
    sender: string;
    email: string;
    image: string;
    preview: string;
    location: string;
    visits: number;
    revenue: number;
    orders: number;
  } | null;
}

const SidePanel: React.FC<SidePanelProps> = ({ show, onClose,user }) => {
  const [activeIndex, setActiveIndex] = useState<string|number>(0); // Track the active button

  const buttons = [
    { icon: <RiContactsFill />, label: 'Contacts' },
    { icon: <GoArchive />, label: 'Archive' },
    { icon: <LuClock3 />, label: 'Clock' },
  ];
  interface Button {
    icon: JSX.Element;
    label: string;
  }

  const buttonClasses = (index: number): string =>
    index === activeIndex
      ? 'bg-white  px-7 py-3 w-[80%] rounded-lg items-center'
      : ' px-7 py-3 w-[30%] rounded-lg items-center';
  return (
    
    <div className={`outline right-0 top-0 py-4 w-[20vw] rounded-lg outline-gray-200 h-[55vw] bg-white shadow-lg transition-transform ${show ? 'translate-x-0' : 'translate-x-full'}`}>
      <button onClick={onClose} className="text-xl">&times;</button>
    
   {user && (
      <div key={user.id} className='flex justify-center items-center flex-col p-1 '>
      <div><img src={user.image}  className='w-14 h-14 rounded-full'/></div>
      <div className='block '>{user.sender}</div>
      <div>{'12:45 PM'} in {' '} {user.location}</div>
<div className='flex justify-between w-full p-3 m-2'>
<IoIosCall className='text-3xl'/>
      <MdVideoChat className='text-3xl' />
     <div className='text-xl'>• • •</div> 
      </div>
      <div className='w-full  h-36  flex justify-between m-1 '>
      <div className='outline w-1/2 m-1 rounded-lg p-1 outline-gray-200'>
        <div className='flex m-2 px-1'>
          <div><HiCurrencyDollar className='text-xl'/></div>
        <div className='px-1 text-gray-400'>Revenue</div>
        </div>
        <div className='block  text-4xl'>{user.revenue}</div>
        <div className='flex text-gray-400 py-2'><div className='px-1'>{user.orders}</div>Orders</div>
        </div>
        <div className='block outline w-1/2 m-1 rounded-lg p-1 outline-gray-200'>
        <div className=' flex m-2 px-1  justify-between'>
          <div><FaEye  className='text-xl'/></div>
        <div className='px-1 text-sm text-gray-400 '>WebVists</div></div>
        <div className='block  text-4xl p-2'>{user.visits}</div>
        <div>{user.orders}</div>
        </div>
       

      </div>
      <div className='flex  m-4 p-1 bg-gray-100 w-full'>
      {buttons.map((button, index) => (
       <div key={index} className='w-full flex justify-between flex-col'>
       <button
          
          className={buttonClasses(index)}
          onClick={() => setActiveIndex(index)}
        >
          {button.icon}
        </button>
        </div> 
      ))}
      </div>
      <div>
        <div className='text-xl text-black font-bold'>Information</div>
      <table className="grid grid-cols-1 ">
  <tbody>
    <tr className='flex justify-between p-1  m-1'>
      <th className='flex  '><AiFillAlipayCircle />Segment</th>
      <td className='flex'><GiShoppingCart />{user.sender}</td>
    </tr>
    <tr className='flex p-2'>
      <th>@Email</th>
      <td className='text-sm flex'>{user.email}</td>
    </tr>
    <tr className=' p-1  '>
      <th className='flex p-2'><IoIosCall />Phone</th>
      <td>123-456-7890</td>
    </tr>
    <tr>
      <th  className='flex p-3'><LuClock3 />Last Visited</th>
      <td>{user.visits}</td>
    </tr>
  </tbody>
</table>


        </div>
      </div>  
      
   )}

    </div>
  );
};

export default SidePanel;



