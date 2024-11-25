import PropTypes from "prop-types";
const ArrowButton = ({ elementId, direction, onClick, isDisabled = false }) => {
  const handleClick = () => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with ID "${elementId}" not found.`);
      return;
    }

    if (direction === "up") {
      element.stepUp();
    } else if (direction === "down") {
      element.stepDown();
    }

    if (onClick) onClick();
  };

  return (
    <button
      type='button'
      className='px-2 h-full text-gray-500 hover:text-sky-500'
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={direction === "up" ? "Increase quantity" : "Decrease quantity"}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-4 h-4'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d={direction === "up" ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"}
        />
      </svg>
    </button>
  );
};

ArrowButton.propTypes = {
  elementId: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["up", "down"]).isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default ArrowButton;
