import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
// import ToggleButton from "./ToggleButton.jsx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='fixed top-0 z-10 w-full p-4 text-white bg-gray-800 shadow-md'>
      <div className='flex items-center justify-between max-w-full mx-auto'>
        {/* TODO: Light/Dark Mode Toggle */}
        {/* <ToggleButton /> */}

        {/* Title (Hidden on small screens) */}
        <h1 className='absolute text-xl sm:text-3xl font-bold transform -translate-x-1/2 left-1/2 sm:block'>
          <Link to='/' className='transition hover:text-yellow-400'>
            DRW Helper
          </Link>
        </h1>

        {/* Links */}
        <div className='flex items-center ml-auto'>
          {/* Desktop Links */}
          <ul className='hidden space-x-6 xl:flex'>
            <li>
              <Link to='/general-rules' className='transition hover:text-yellow-400'>
                General Rules
              </Link>
            </li>
            <li>
              <Link to='/max-hp-calc' className='transition hover:text-yellow-400'>
                Max HP
              </Link>
            </li>
            <li>
              <Link to='/level-up-calc' className='transition hover:text-yellow-400'>
                Level-Up
              </Link>
            </li>
            <li>
              <Link to='/construction-planner' className='transition hover:text-yellow-400'>
                Construction
              </Link>
            </li>
            <li>
              <Link to='/festival-of-giants' className='transition hover:text-yellow-400'>
                Festival of Giants
              </Link>
            </li>
          </ul>

          {/* Burger Menu (Visible on small screens) */}
          <button
            className='block text-2xl transition xl:hidden hover:text-yellow-400'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Collapsible Menu for Small Screens */}
      {isMenuOpen && (
        <div className='z-20 p-4 mt-2 bg-gray-700 rounded-md shadow-lg xl:hidden'>
          <ul className='space-y-4'>
            <li>
              <Link
                to='/'
                className='block transition hover:text-yellow-400'
                onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/general-rules'
                className='block transition hover:text-yellow-400'
                onClick={() => setIsMenuOpen(false)}>
                General Rules
              </Link>
            </li>
            <li>
              <Link
                to='/max-hp-calc'
                className='block transition hover:text-yellow-400'
                onClick={() => setIsMenuOpen(false)}>
                Max HP
              </Link>
            </li>
            <li>
              <Link
                to='/level-up-calc'
                className='block transition hover:text-yellow-400'
                onClick={() => setIsMenuOpen(false)}>
                Level-Up
              </Link>
            </li>
            <li>
              <Link
                to='/construction-planner'
                className='block transition hover:text-yellow-400'
                onClick={() => setIsMenuOpen(false)}>
                Construction
              </Link>
            </li>
            <li>
              <Link
                to='/festival-of-giants'
                className='block transition hover:text-yellow-400'
                onClick={() => setIsMenuOpen(false)}>
                Festival of Giants
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
