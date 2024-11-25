import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='bg-gray-800 text-white p-4 shadow-md fixed top-0 w-full z-10'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Light/Dark Mode Toggle */}
        <div className='flex items-center'>
          <button
            className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition'
            title='Toggle Light/Dark Mode'>
            <span className='sr-only'>Toggle Light/Dark Mode</span>
            <div className='w-4 h-4 bg-yellow-400 rounded-full'></div>
          </button>
        </div>

        {/* Title (Hidden on small screens) */}
        <h1 className='text-3xl font-bold text-center sm:block hidden'>
          <Link to='/' className='hover:text-yellow-400 transition'>
            DRW Helper
          </Link>
        </h1>

        {/* Links */}
        <div className='flex items-center'>
          {/* Desktop Links */}
          <ul className='hidden sm:flex space-x-6'>
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
            className='sm:hidden block text-2xl hover:text-yellow-400 transition'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Collapsible Menu for Small Screens */}
      {isMenuOpen && (
        <div className='sm:hidden mt-2 bg-gray-700 rounded-md shadow-lg p-4'>
          <ul className='space-y-4'>
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
