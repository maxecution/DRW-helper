import ArrowButton from "../../../utils/ArrowButton";
import { handleNumberChange, handleIncrementDecrement } from "../../../utils/InputUtils.js";

const Stat = ({ ability, score, setScore }) => {
  const min = 1;
  const max = 30;

  const mod = Math.floor((score - 10) / 2);

  return (
    <div className='flex flex-col items-center px-4 pt-4 pb-2 mb-3 border rounded-lg border-gray-600 shadow-md w-24 bg-gray-800 text-white'>
      <h3 className='text-sm font-bold'>{ability}</h3>
      <div className='flex items-center mt-2'>
        <ArrowButton
          elementId={`${ability}-input`}
          direction='up'
          onClick={() => handleIncrementDecrement(1, min, max, setScore)}
        />
        <input
          id={`${ability}-input`}
          type='number'
          min={min}
          max={max}
          value={score}
          onChange={(e) => handleNumberChange(e.target.value, min, max, setScore)}
          onBlur={(e) => {
            if (e.target.value === "") {
              setScore(min);
            }
          }}
          className='border border-gray-600 bg-gray-700 text-white text-center p-1 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <ArrowButton
          elementId={`${ability}-input`}
          direction='down'
          onClick={() => handleIncrementDecrement(-1, min, max, setScore)}
        />
      </div>
      <p className='mt-2 text-xl font-semibold border rounded-xl px-2'>
        {mod >= 0 ? `+${mod}` : mod}
      </p>
    </div>
  );
};

export default Stat;
