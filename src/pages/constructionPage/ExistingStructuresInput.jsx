import { Tooltip } from "react-tooltip";
import ArrowButton from "../../utils/ArrowButton.jsx";
import { handleNumberChange, handleIncrementDecrement } from "../../utils/InputUtils.js";

function ExistingStructuresInput({ value, setValue, min = 0, max = 999 }) {
  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <label
        id='existing-structure-amount-label'
        data-tooltip-id='existing-structure-amount-tooltip'
        className='font-medium text-yellow-400 text-md'>
        Number of existing structures:
      </label>
      <Tooltip
        id='existing-structure-amount-tooltip'
        place='top-start'
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        The sum of existing structures based on all built expansions.
      </Tooltip>
      <div className='flex items-center'>
        <ArrowButton
          elementId='existing-structure-amount'
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setValue)}
        />
        <input
          id='existing-structure-amount'
          aria-labelledby='existing-structure-amount-label'
          type='number'
          value={value}
          min={min}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          onBlur={(e) => {
            if (e.target.value === "") {
              setValue(min);
            }
          }}
          className='border border-gray-600 bg-gray-700 text-white text-center p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <ArrowButton
          elementId='existing-structure-amount'
          direction='down'
          onClick={() => handleIncrementDecrement(-1, min, max, setValue)}
        />
      </div>
    </div>
  );
}

export default ExistingStructuresInput;
