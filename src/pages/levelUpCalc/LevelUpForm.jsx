import { useState } from "react";
import { calculateLevelUpDates } from "../../utils/LevelUpUtils.js";
import { Tooltip } from "react-tooltip";
import { handleNumberChange } from "../../utils/InputUtils.js";

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
    <div className='min-h-screen bg-gray-800 flex flex-col items-center p-6'>
      <form className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div id='current-level-block'>
            <label
              htmlFor='current-level'
              className='block text-sm font-semibold text-yellow-400 mb-1'>
              Current Level
            </label>
            <input
              type='number'
              id='current-level'
              name='current-level'
              value={currentLevel}
              onChange={(e) => handleNumberChange(e.target.value, 3, 19, setCurrentLevel)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setCurrentLevel(3);
                }
              }}
              min='3'
              max='19'
              placeholder='3-19'
              className='w-40 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md'
              data-tooltip-id='current-level-tooltip'
            />
            <Tooltip
              id='current-level-tooltip'
              place='top-end'
              variant='error'
              isOpen={errors.currentLevel}>
              {errors.currentLevel}
            </Tooltip>
          </div>
          <div id='desired-level-block'>
            <label
              htmlFor='desired-level'
              className='block text-sm font-semibold text-yellow-400 mb-1'>
              Desired Level
            </label>
            <input
              type='number'
              id='desired-level'
              name='desired-level'
              value={desiredLevel}
              onChange={(e) => handleNumberChange(e.target.value, 4, 20, setDesiredLevel)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setDesiredLevel(4);
                }
              }}
              min='4'
              max='20'
              placeholder='4-20'
              className='w-40 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md'
              data-tooltip-id='desired-level-tooltip'
            />
            <Tooltip
              id='desired-level-tooltip'
              place='top-start'
              variant='error'
              isOpen={errors.desiredLevel}>
              {errors.desiredLevel}
            </Tooltip>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div id='available-xp-block'>
            <label
              htmlFor='available-xp'
              className='block text-sm font-semibold text-yellow-400 mb-1'>
              Available XP
            </label>
            <input
              type='number'
              id='available-xp'
              name='available-xp'
              value={availableXp}
              onChange={(e) => handleNumberChange(e.target.value, 0, 999, setAvailableXp)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setAvailableXp(0);
                }
              }}
              min='0'
              max='999'
              placeholder='0-999'
              className='w-40 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md'
              data-tooltip-id='available-xp-tooltip'
            />
            <Tooltip
              id='available-xp-tooltip'
              place='top-end'
              variant='error'
              isOpen={errors.availableXp}>
              {errors.availableXp}
            </Tooltip>
          </div>
          <div id='last-leveled-date-block'>
            <label
              htmlFor='last-leveled-date'
              className='block text-sm font-semibold text-yellow-400 mb-1'>
              Last Level Up Date
            </label>
            <input
              type='date'
              id='last-leveled-date'
              name='last-leveled-date'
              value={lastLeveledDate}
              onChange={(e) => handleNumberChange(e.target.value, 0, 999, setLastLeveledDate)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setLastLeveledDate("");
                }
              }}
              className='w-40 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md'
              data-tooltip-id='last-leveled-date-tooltip'
            />
            <Tooltip
              id='last-leveled-date-tooltip'
              place='top-start'
              variant='error'
              isOpen={errors.lastLeveledDate}>
              {errors.lastLeveledDate}
            </Tooltip>
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
