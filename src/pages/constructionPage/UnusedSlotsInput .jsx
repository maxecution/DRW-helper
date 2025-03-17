import React from "react";
import { handleNumberChange, handleIncrementDecrement } from "../../utils/InputUtils.js";
import { TbInfoHexagon } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import ArrowButton from "../../utils/ArrowButton.jsx";

function ExistingStructuresInput({ value, setValue, min = 0, max }) {
  const InfoIcon = React.forwardRef((props, ref) => (
    <span ref={ref} {...props}>
      <TbInfoHexagon />
    </span>
  ));
  InfoIcon.displayName = "InfoIcon";

  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <div className='flex'>
        <label
          htmlFor='unused-slots-amount'
          className='inline-flex items-center font-medium text-yellow-400 text-md'>
          Number of un-used slots:{" "}
        </label>
        <InfoIcon data-tooltip-id='unused-slots-info-icon' className='ml-2' />
        <Tooltip
          id='unused-slots-info-icon'
          place='top-start'
          variant='info'
          className='z-50'
          opacity={1}>
          The number of un-used slots cannot exceed the number of existing structures.
        </Tooltip>
      </div>
      <div className='flex items-center'>
        <ArrowButton
          elementId='unused-slots-amount'
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setValue)}
        />
        <input
          id='unused-slots-amount'
          type='number'
          value={value}
          min={0}
          max={max}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          onBlur={(e) => {
            if (e.target.value === "") {
              setValue(min);
            }
          }}
          className='border border-gray-600 bg-gray-700 text-white text-center p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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
