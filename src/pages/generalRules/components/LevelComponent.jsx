import ArrowButton from "../../../utils/ArrowButton";
import { handleIncrementDecrement, handleNumberChange } from "../../../utils/InputUtils.js";

const Level = ({ level, setLevel }) => {
  const min = 3;
  const max = 20;

  const profBonus = Math.ceil(level / 4) + 1;

  return (
    <div className='flex flex-col items-center w-24 px-4 pb-2 mb-3 text-white bg-gray-800 border border-gray-600 rounded-lg shadow-md'>
      <div className='flex items-start justify-between w-full -mt-2 space-x-1'>
        <span className='self-end text-xs text-nowrap'>Prof. Bonus</span>
        <p className='px-1 mb-2 text-sm font-semibold text-gray-600 align-text-top bg-white border border-white rounded-xl'>
          {profBonus}
        </p>
      </div>
      <div className='flex items-center mt-2'>
        <ArrowButton
          elementId='level-input'
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setLevel)}
        />
        <input
          id='level-input'
          type='number'
          value={level}
          min={min}
          max={max}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setLevel)}
          onBlur={(e) => {
            if (e.target.value === "") {
              setLevel(min);
            }
          }}
          className='border border-gray-600 bg-gray-700 text-white text-sm text-center p-1 rounded-md w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <ArrowButton
          elementId='level-input'
          direction='down'
          onClick={() => handleIncrementDecrement(-1, min, max, setLevel)}
        />
      </div>
      <h3 className='mt-1 text-sm font-semibold'>Level</h3>
    </div>
  );
};

export default Level;
