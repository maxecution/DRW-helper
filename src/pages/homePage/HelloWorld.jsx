import logo5e from "../../assets/5e-logo.png";
import logoDiscord from "../../assets/discord-logo-blue.png";

function HelloWorld() {
  return (
    <div className='flex flex-col min-h-screen text-white bg-gray-800'>
      {/* Hero Section */}
      <header className='relative py-20 text-center bg-gray-900 shadow-lg'>
        <div className='absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent'></div>
        <div className='relative space-y-6'>
          <h1 className='text-4xl font-extrabold text-yellow-400 md:text-5xl'>
            Welcome to the Dark Road West - Helper Tool
          </h1>
          <p className='max-w-4xl mx-auto text-lg text-gray-300 md:text-2xl'>
            Join a world of adventure, danger, and magic. Forge bonds with a community of daring
            adventurers and heroes.
          </p>
        </div>
      </header>

      {/* Links Section */}
      <main className='flex flex-col items-center flex-grow px-6 py-12 space-y-12'>
        {/* Buttons */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Discord Button */}
          <a
            href='https://discord.gg/darkroadwest'
            target='_blank'
            rel='noopener noreferrer'
            className='items-center px-6 py-8 text-center bg-gray-700 rounded-lg shadow-lg group hover:bg-gray-600 transition duration-300 ease-in-out'>
            <img
              src={logoDiscord}
              alt='Join our Discord'
              className='w-auto h-16 mx-auto transition-transform group-hover:scale-110'
            />
            <p className='mt-4 text-lg font-semibold text-yellow-400'>Join the Discord</p>
          </a>

          {/* 5e.Tools Button */}
          <a
            href='https://5e.tools/'
            target='_blank'
            rel='noopener noreferrer'
            className='items-center px-6 py-8 text-center bg-gray-700 rounded-lg shadow-lg group hover:bg-gray-600 transition duration-300 ease-in-out'>
            <img
              src={logo5e}
              alt='5e.Tools'
              className='w-auto h-16 mx-auto transition-transform group-hover:scale-110'
            />
            <p className='mt-4 text-lg font-semibold text-yellow-400'>Explore 5e.Tools</p>
          </a>
        </div>

        {/* Thematic Quote */}
        <blockquote className='max-w-lg pl-4 italic text-gray-300 border-l-4 border-yellow-400'>
          The road ahead is dark, but together, we walk the path.
        </blockquote>
      </main>
    </div>
  );
}

export default HelloWorld;
