import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { logo2 } from '../assets';
import { links } from '../assets/constants';
import { HiOutlineHeart, HiOutlineMenu } from 'react-icons/hi';
import { MdAddBox } from 'react-icons/md';


const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item, i) => (
      <NavLink 
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start gap-[4px] items-center my-4 text-sm font-medium text-gray-400 hover:text-white"
          onClick={() => handleClick && handleClick()}
        >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}

    <div className='flex flex-col'>
      <div className="flex flex-row justify-start gap-[4px] items-center mt-8 text-sm font-medium text-gray-400 hover:text-white">
        <MdAddBox className="w-6 h-6 mr-2" />
        <Link to='/playlist'>Create Playlist</Link>
      </div>

      <div className="flex flex-row justify-start gap-[4px] items-center my-4 text-sm font-medium text-gray-400 hover:text-white">
        <HiOutlineHeart className="w-6 h-6 mr-2" />
        <Link to='/liked-songs'>Liked Songs</Link>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]"> 
        <img src={logo2} className="w-full h-14 object-contain" alt="logo"/>
        <NavLinks />
      </div>

      {/* Mobile Menu */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? 
            (<RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>) : 
            <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/> }
      </div>


      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-20 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}> 
        <img src={logo2} className="w-full h-14 object-contain" alt="logo"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  )
};

export default Sidebar;
