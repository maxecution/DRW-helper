import { handleNumberChange, handleIncrementDecrement } from "../../utils/InputUtils.js";
import { Tooltip } from "react-tooltip";
import ArrowButton from "../../utils/ArrowButton.jsx";

function UnusedSlotsInput({ value, setValue, min = 0, max = 999 }) {
  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <div className='flex'>
        <label
          id='unused-slots-amount-label'
          htmlFor='unused-slots-amount'
          data-tooltip-id='unused-slots-label-tooltip'
          className='inline-flex items-center font-medium text-yellow-400 text-md'>
          Number of un-used slots:
        </label>
        <Tooltip
          id='unused-slots-label-tooltip'
          place='top-start'
          variant='info'
          style={{ width: "auto", textAlign: "center", zIndex: 50 }}
          opacity={1}>
          Un-used slots refer to available expansion slots from existing structures on your
          purchased plots that have not yet been used for an expansion.
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
          aria-labelledby='unused-slots-amount-label'
          data-tooltip-id='unused-slots-input-tooltip'
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

export default UnusedSlotsInput;
