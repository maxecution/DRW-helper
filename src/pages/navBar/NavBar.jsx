import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
// import ToggleButton from "./ToggleButton.jsx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='bg-gray-800 text-white p-4 shadow-md fixed top-0 w-full z-10'>
      <div className='max-w-full mx-auto flex justify-between items-center'>
        {/* TODO: Light/Dark Mode Toggle */}
        {/* <ToggleButton /> */}

        {/* Title (Hidden on small screens) */}
        <h1 className='text-3xl font-bold absolute left-1/2 transform -translate-x-1/2 sm:block hidden'>
          <Link to='/' className='hover:text-yellow-400 transition'>
            DRW Helper
          </Link>
        </h1>

        {/* Links */}
        <div className='ml-auto flex items-center'>
          {/* Desktop Links */}
          <ul className='hidden lg:flex space-x-6'>
            <li>
              <Link to='/general-rules' className='hover:text-yellow-400 transition'>
                General Rules
              </Link>
            </li>
            <li>
              <Link to='/max-hp-calc' className='hover:text-yellow-400 transition'>
                Max HP
              </Link>
            </li>
            <li>
              <Link to='/level-up-calc' className='hover:text-yellow-400 transition'>
                Level-Up
              </Link>
            </li>
            <li>
              <Link to='/construction-planner' className='hover:text-yellow-400 transition'>
                Construction
              </Link>
            </li>
          </ul>

          {/* Burger Menu (Visible on small screens) */}
          <button
            className='lg:hidden block text-2xl hover:text-yellow-400 transition'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Collapsible Menu for Small Screens */}
      {isMenuOpen && (
        <div className='sm:hidden mt-2 bg-gray-700 rounded-md shadow-lg p-4 z-20'>
          <ul className='space-y-4'>
            <li>
              <Link
                to='/'
                className='block hover:text-yellow-400 transition'
                onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/general-rules'
                className='block hover:text-yellow-400 transition'
                onClick={() => setIsMenuOpen(false)}>
                General Rules
              </Link>
            </li>
            <li>
              <Link
                to='/max-hp-calc'
                className='block hover:text-yellow-400 transition'
                onClick={() => setIsMenuOpen(false)}>
                Max HP
              </Link>
            </li>
            <li>
              <Link
                to='/level-up-calc'
                className='block hover:text-yellow-400 transition'
                onClick={() => setIsMenuOpen(false)}>
                Level-Up
              </Link>
            </li>
            <li>
              <Link
                to='/construction-planner'
                className='block hover:text-yellow-400 transition'
                onClick={() => setIsMenuOpen(false)}>
                Construction
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
