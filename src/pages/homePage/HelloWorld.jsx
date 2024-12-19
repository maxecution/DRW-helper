import logo5e from "../../assets/5e-logo.png";
import logoDiscord from "../../assets/discord-logo-blue.png";

function HelloWorld() {
  return (
    <div className='min-h-screen bg-gray-800 text-white flex flex-col'>
      {/* Hero Section */}
      <header className='relative bg-gray-900 py-20 text-center shadow-lg'>
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-75'></div>
        <div className='relative space-y-6'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-yellow-400'>
            Welcome to the Dark Road West - Helper Tool
          </h1>
          <p className='text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto'>
            Join a world of adventure, danger, and magic. Forge bonds with a community of daring
            adventurers and heroes.
          </p>
        </div>
      </header>

      {/* Links Section */}
      <main className='flex-grow flex flex-col items-center px-6 py-12 space-y-12'>
        {/* Buttons */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Discord Button */}
          <a
            href='https://discord.gg/darkroadwest'
            target='_blank'
            rel='noopener noreferrer'
            className='group bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg px-6 py-8 items-center text-center transition duration-300 ease-in-out'>
            <img
              src={logoDiscord}
              alt='Join our Discord'
              className='h-16 w-auto mx-auto transition-transform group-hover:scale-110'
            />
            <p className='mt-4 text-lg text-yellow-400 font-semibold'>Join the Discord</p>
          </a>

          {/* 5e.Tools Button */}
          <a
            href='https://5e.tools/'
            target='_blank'
            rel='noopener noreferrer'
            className='group bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg px-6 py-8 items-center text-center transition duration-300 ease-in-out'>
            <img
              src={logo5e}
              alt='5e.Tools'
              className='h-16 w-auto mx-auto transition-transform group-hover:scale-110'
            />
            <p className='mt-4 text-lg text-yellow-400 font-semibold'>Explore 5e.Tools</p>
          </a>
        </div>

        {/* Thematic Quote */}
        <blockquote className='border-l-4 border-yellow-400 pl-4 text-gray-300 italic max-w-lg'>
          The road ahead is dark, but together, we walk the path.
        </blockquote>
      </main>
    </div>
  );
}

export default HelloWorld;
