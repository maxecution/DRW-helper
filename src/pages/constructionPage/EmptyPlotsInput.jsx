import ArrowButton from "./components/ArrowButton.jsx";
import { handleNumberChange, handleIncrementDecrement } from "../../utils/InputUtils.js";

function ExistingStructuresInput({ value, setValue, min = 0, max = 999 }) {
  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <label htmlFor='existing-structure-amount' className='text-md font-medium text-yellow-400'>
        Number of empty plots:
      </label>
      <div className='flex items-center'>
        <ArrowButton
          elementId='empty-plots-amount'
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setValue)}
        />
        <input
          id='empty-plots-amount'
          type='text'
          value={value}
          min={0}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          onBlur={(e) => handleNumberChange(e.target.value, min, max, setValue)}
          className='border border-gray-600 bg-gray-700 text-white text-right p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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

export default ExistingStructuresInput;
