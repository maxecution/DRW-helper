function Footer() {
  return (
    <footer className='flex items-center justify-center w-full h-10 text-sm text-center text-gray-600 bg-white border border-y-gray-600'>
      <p className='inline-flex text-xs'>
        &copy; 2024
        <a
          className='flex items-center ml-1 hover:underline'
          rel='noopener noreferrer'
          target='_blank'
          href='https://github.com/maxecution/'>
          Maxecution Gaming
          <svg
            className='w-[10px] h-[10px] fill-gray-600 ml-1'
            viewBox='0 0 512 512'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z'></path>
          </svg>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
