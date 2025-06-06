import ArrowButton from "../../utils/ArrowButton.jsx";
import { handleNumberChange, handleIncrementDecrement } from "../../utils/InputUtils.js";
import { Tooltip } from "react-tooltip";

function EmptyPlotsInput({ value, setValue, min = 0, max = 999 }) {
  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <label
        id='empty-plots-amount-label'
        htmlFor='empty-plots-amount'
        data-tooltip-id='empty-plots-amount-tooltip'
        className='font-medium text-yellow-400 text-md'>
        Number of empty plots:
      </label>
      <Tooltip
        id='empty-plots-amount-tooltip'
        place='top-start'
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        Empty plots refer to the number of plots you already own that do not have any structures
        built on them.
      </Tooltip>
      <div className='flex items-center'>
        <ArrowButton
          elementId='empty-plots-amount'
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setValue)}
        />
        <input
          id='empty-plots-amount'
          type='number'
          value={value}
          min={0}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          onBlur={(e) => {
            if (e.target.value === "") {
              setValue(min);
            }
          }}
          className='border border-gray-600 bg-gray-700 text-white text-center p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <ArrowButton
          elementId='empty-plots-amount'
          direction='down'
          onClick={() => handleIncrementDecrement(-1, min, max, setValue)}
        />
      </div>
    </div>
  );
}

export default EmptyPlotsInput;
