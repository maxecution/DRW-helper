import { useState } from "react";
import { calculateLevelUpDates } from "../../utils/LevelUpUtils.js";

function LevelUpForm() {
  const [currentLevel, setCurrentLevel] = useState("");
  const [desiredLevel, setDesiredLevel] = useState("");
  const [availableXp, setAvailableXp] = useState("");
  const [lastLeveledDate, setLastLeveledDate] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [errors, setErrors] = useState({
    currentLevel: "",
    desiredLevel: "",
    availableXp: "",
    lastLeveledDate: "",
  });

  const today = new Date();

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const errorMessages = {
      currentLevel: "",
      desiredLevel: "",
      availableXp: "",
      lastLeveledDate: "",
    };

    if (isNaN(currentLevel) || currentLevel < 3 || currentLevel > 19) {
      errorMessages.currentLevel = "Please enter a valid current level.";
      isValid = false;
    }
    if (isNaN(desiredLevel) || desiredLevel <= currentLevel || desiredLevel > 20) {
      errorMessages.desiredLevel = "Please enter a valid desired level.";
      isValid = false;
    }
    if (availableXp < 0 || availableXp > 999) {
      errorMessages.availableXp = "Please enter a valid XP amount.";
      isValid = false;
    }
    if (lastLeveledDate && new Date(lastLeveledDate) > today) {
      errorMessages.lastLeveledDate = "Date must be in the past.";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const baseXp = parseInt(availableXp, 10) || 0;
      const levelUpDates = calculateLevelUpDates(
        currentLevel,
        desiredLevel,
        baseXp,
        lastLeveledDate
      );
      const finalDate = levelUpDates[levelUpDates.length - 1].date;

      let message = `<p class="mb-2">You can reach level <b>${desiredLevel}</b> by <b>${finalDate.toDateString()}</b></p>`;
      message += `<ul class="list-disc">`;

      levelUpDates.forEach(({ level, date }) => {
        message += `<li class="mb-1 ml-6">Level <b>${level}</b> on <b>${date.toDateString()}</b></li>`;
      });

      message += `</ul>`;

      setResultMessage(message);
    }
  };

  const handleClear = () => {
    setCurrentLevel("");
    setDesiredLevel("");
    setAvailableXp("");
    setLastLeveledDate("");
    setResultMessage("");
    setErrors({
      currentLevel: "",
      desiredLevel: "",
      availableXp: "",
      lastLeveledDate: "",
    });
  };

  return (
    <div className='mb-5'>
      <form className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='current-level'
              className='block text-sm font-semibold text-gray-600 mb-1'>
              Current Level
            </label>
            <input
              type='number'
              id='current-level'
              name='current-level'
              value={currentLevel}
              onChange={(e) => setCurrentLevel(Number(e.target.value))}
              min='3'
              max='19'
              placeholder='3-19'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            {errors.currentLevel && (
              <span className='text-red-500 text-xs mt-1'>{errors.currentLevel}</span>
            )}
          </div>
          <div>
            <label
              htmlFor='desired-level'
              className='block text-sm font-semibold text-gray-600 mb-1'>
              Desired Level
            </label>
            <input
              type='number'
              id='desired-level'
              name='desired-level'
              value={desiredLevel}
              onChange={(e) => setDesiredLevel(Number(e.target.value))}
              min='4'
              max='20'
              placeholder='4-20'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            {errors.desiredLevel && (
              <span className='text-red-500 text-xs mt-1'>{errors.desiredLevel}</span>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='available-xp'
              className='block text-sm font-semibold text-gray-600 mb-1'>
              Available XP
            </label>
            <input
              type='number'
              id='available-xp'
              name='available-xp'
              value={availableXp}
              onChange={(e) => setAvailableXp(Number(e.target.value))}
              min='0'
              max='999'
              placeholder='0-999'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            {errors.availableXp && (
              <span className='text-red-500 text-xs mt-1'>{errors.availableXp}</span>
            )}
          </div>
          <div>
            <label
              htmlFor='last-leveled-date'
              className='block text-sm font-semibold text-gray-600 mb-1'>
              Last Level Up Date
            </label>
            <input
              type='date'
              id='last-leveled-date'
              name='last-leveled-date'
              value={lastLeveledDate}
              onChange={(e) => setLastLeveledDate(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            {errors.lastLeveledDate && (
              <span className='text-red-500 text-xs mt-1'>{errors.lastLeveledDate}</span>
            )}
          </div>
        </div>

        <div className='flex space-x-2'>
          <button
            type='button'
            onClick={handleSubmit}
            className='w-full py-2 font-medium text-white bg-gradient-to-r from-green-400 to-green-600 rounded-md shadow-lg'>
            Calculate
          </button>
          <button
            type='button'
            onClick={handleClear}
            className='w-full py-2 font-medium text-white bg-gradient-to-r from-gray-400 to-gray-600 rounded-md shadow-lg'>
            Clear
          </button>
        </div>
      </form>

      {resultMessage && (
        <div
          className='mt-6 p-4 bg-green-100 border border-green-300 rounded-md text-sm text-gray-700'
          dangerouslySetInnerHTML={{ __html: resultMessage }}
        />
      )}
    </div>
  );
}

export default LevelUpForm;
