import { useState } from "react";
import PropTypes from "prop-types";

function ToggleButton({ onColour = "gray", offColour = "yellow" }) {
  const [isOn, setIsOn] = useState(true);

  const validColours = [
    "yellow",
    "gray",
    "red",
    "blue",
    "green",
    "purple",
    "pink",
    "indigo",
    "orange",
  ];

  const getValidColour = (colour, shade) => {
    if (validColours.includes(colour)) {
      return `bg-${colour}-${shade}`;
    }
    return `bg-black-100`;
  };

  const toggleButton = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className='flex items-center'>
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
          isOn
            ? getValidColour(onColour, 700) + " hover:" + getValidColour(onColour, 600)
            : getValidColour(offColour, 200) + " hover:" + getValidColour(offColour, 100)
        }`}
        title='Toggle Light/Dark Mode'
        onClick={toggleButton}>
        <span className='sr-only'>Toggle Light/Dark Mode</span>
        <div
          className={`w-4 h-4 rounded-full ${
            isOn ? getValidColour(onColour, 400) : getValidColour(offColour, 400)
          }`}></div>
      </button>
    </div>
  );
}

ToggleButton.propTypes = {
  onColour: PropTypes.string,
  offColour: PropTypes.string,
};

export default ToggleButton;
