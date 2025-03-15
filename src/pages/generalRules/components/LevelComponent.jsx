import ArrowButton from "../../../utils/ArrowButton";
import { handleIncrementDecrement, handleNumberChange } from "../../../utils/InputUtils.js";

const Level = ({ level, setLevel }) => {
  const min = 3;
  const max = 20;

  const profBonus = Math.ceil(level / 4) + 1;

  return (
    <div className='flex flex-col items-center px-4 pb-2 mb-3 border rounded-lg border-gray-600 shadow-md w-24 bg-gray-800 text-white'>
      <div className='flex justify-between space-x-1 -mt-2 items-start w-full'>
        <span className='text-xs text-nowrap self-end'>Prof. Bonus</span>
        <p className='text-sm text-gray-600 font-semibold border border-white bg-white rounded-xl px-1 mb-2 align-text-top'>
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
      <h3 className='text-sm font-semibold mt-1'>Level</h3>
    </div>
  );
};

export default Level;
