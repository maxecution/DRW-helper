import React from "react";
import ArrowButton from "./components/ArrowButton.jsx";
import { handleNumberChange, handleIncrementDecrement } from "../../utils/InputUtils.js";
import { TbInfoHexagon } from "react-icons/tb";
import Tooltip from "@mui/material/Tooltip";

function ExistingStructuresInput({ value, setValue, min = 0, max }) {
  const infoText = "The number of un-used slots cannot exceed the number of existing structures.";
  const InfoIcon = React.forwardRef((props, ref) => (
    <span ref={ref} {...props}>
      <TbInfoHexagon />
    </span>
  ));
  InfoIcon.displayName = "InfoIcon";

  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <label
        htmlFor='existing-structure-amount'
        className='text-md font-medium text-yellow-400 inline-flex items-center'>
        Number of un-used slots:
        <Tooltip title={infoText} placement='top-end' arrow>
          <InfoIcon className='ml-2' />
        </Tooltip>
      </label>
      <div className='flex items-center'>
        <ArrowButton
          elementId='unused-slots-amount'
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setValue)}
        />
        <input
          id='unused-slots-amount'
          type='text'
          value={value}
          min={0}
          max={max}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          onBlur={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          className='border border-gray-600 bg-gray-700 text-white text-right p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <ArrowButton
          elementId='unused-slots-amount'
          direction='down'
          onClick={() => handleIncrementDecrement(-1, min, max, setValue)}
        />
      </div>
    </div>
  );
}

export default ExistingStructuresInput;
