import React, { useEffect, useState } from "react";
import { calculateLevelUpDates, getLevelUpCostForRange } from "../../utils/LevelUpUtils.js";
import Select from "react-select";
import { Tooltip } from "react-tooltip";
import {
  handleNumberChange,
  handleNumberBlur,
  handleDateChange,
  handleDateBlur,
} from "../../utils/InputUtils.js";
import { fetchPlayerData, PlayerData, Character } from "../../utils/fetchPlayerData.js";
import { selectStyle } from "../../utils/Styles.js";

function LevelUpForm() {
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number | undefined>(undefined);
  const [desiredLevel, setDesiredLevel] = useState<number | undefined>(undefined);
  const [availableXp, setAvailableXp] = useState<number | undefined>(undefined);
  const [lastLeveledDate, setLastLeveledDate] = useState<string | undefined>(undefined);
  const [resultMessage, setResultMessage] = useState("");
  const [errors, setErrors] = useState({
    currentLevel: "",
    desiredLevel: "",
    availableXp: "",
    totalXpNeeded: "",
    lastLeveledDate: "",
  });

  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlayerData();
      setPlayerData(data);
    };
    fetchData();
    console.log("Player data fetched:", playerData);
  }, []);

  useEffect(() => {
    const loadPlayerData = async () => {
      const data = await fetchPlayerData();
      setPlayerData(data);
    };
    loadPlayerData();
  }, []);

  const playerOptions = playerData.map((player) => ({
    value: player.id,
    label: player.playerName,
  }));

  const characterOptions = selectedPlayer
    ? selectedPlayer.characters.map((character) => ({
        value: character.id,
        label: character.characterName,
      }))
    : [];

  const handlePlayerChange = (selectedOption) => {
    if (selectedOption === null) {
      setSelectedPlayer(null);
      setSelectedCharacter(null);
      return;
    }

    const selectedPlayerData = playerData.find((player) => player.id === selectedOption.value);
    setSelectedPlayer(selectedPlayerData ?? null);
    setAvailableXp(selectedPlayerData ? parseInt(selectedPlayerData.availableXP) : undefined);
    setSelectedCharacter(null);
  };

  const handleCharacterChange = (selectedOption) => {
    if (selectedOption === null) {
      setSelectedCharacter(null);
      return;
    }

    const selectedCharacterData = selectedPlayer?.characters.find(
      (character) => character.id === selectedOption.value
    );
    setSelectedCharacter(selectedCharacterData ?? null);
    setCurrentLevel(selectedCharacterData ? parseInt(selectedCharacterData.level) : undefined);
    setLastLeveledDate(selectedCharacterData ? selectedCharacterData.lastLevelUp : undefined);
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const errorMessages = {
      currentLevel: "",
      desiredLevel: "",
      availableXp: "",
      totalXpNeeded: "",
      lastLeveledDate: "",
    };

    if (
      currentLevel === undefined ||
      isNaN(currentLevel) ||
      currentLevel < 3 ||
      currentLevel > 98
    ) {
      errorMessages.currentLevel = "Please enter a valid current level.";
      isValid = false;
    }
    if (
      isNaN(desiredLevel ?? NaN) ||
      (desiredLevel ?? 0) <= (currentLevel ?? 0) ||
      (desiredLevel ?? 0) > 99
    ) {
      errorMessages.desiredLevel = "Please enter a valid desired level.";
      isValid = false;
    }
    if (availableXp === undefined) {
      setAvailableXp(0);
    } else if (availableXp < 0 || availableXp > 999) {
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
      const baseXp = availableXp || 0;
      const levelUpDates = calculateLevelUpDates(
        currentLevel,
        desiredLevel,
        baseXp,
        lastLeveledDate
      );
      const finalDate = levelUpDates[levelUpDates.length - 1].date;
      const totalXpNeeded = getLevelUpCostForRange(currentLevel, desiredLevel) - (availableXp ?? 0);

      let message = `<p class="mb-1">You can reach level <b>${desiredLevel}</b> by <b>${finalDate.toDateString()}</b></p>
      <p class="mb-2 text-xs">Based on your available XP, you need an additional <b>${totalXpNeeded}</b> XP</p>`;
      message += `<ul class="list-disc">`;

      levelUpDates.forEach(({ level, date }) => {
        message += `<li class="mb-1 ml-6">Level <b>${level}</b> on <b>${date.toDateString()}</b></li>`;
      });

      message += `</ul>`;

      setResultMessage(message);
    }
  };

  const handleClear = () => {
    setSelectedPlayer(null);
    setSelectedCharacter(null);
    setCurrentLevel(undefined);
    setDesiredLevel(undefined);
    setAvailableXp(undefined);
    setLastLeveledDate(undefined);
    setResultMessage("");
    setErrors({
      currentLevel: "",
      desiredLevel: "",
      availableXp: "",
      totalXpNeeded: "",
      lastLeveledDate: "",
    });
  };

  return (
    <div className='flex flex-col w-full max-w-full min-h-screen text-white bg-gray-900'>
      <header className='py-6 text-center bg-gray-800 shadow-lg'>
        <h1 className='text-2xl font-bold text-yellow-400 sm:text-3xl md:text-4xl'>
          Level Up Calculator
        </h1>
      </header>
      <div className='flex flex-col items-center min-h-screen p-6 gap-4'>
        <div className='p-3 space-y-6 bg-gray-800 border border-gray-600 rounded-md'>
          <div className='grid grid-cols-2 gap-4'>
            <div id='player-name-block'>
              <label
                htmlFor='player-name-select'
                className='block mb-1 text-sm font-semibold text-yellow-400'>
                Player Name
              </label>
              <Select
                id='player-name-select'
                styles={selectStyle}
                className='w-40'
                value={
                  selectedPlayer
                    ? { value: selectedPlayer.id, label: selectedPlayer.playerName }
                    : null
                }
                isClearable
                isSearchable
                isDisabled={playerData.length === 0}
                options={playerOptions}
                onChange={handlePlayerChange}
              />
            </div>
            <div id='character-name-block'>
              <label
                htmlFor='character-name-select'
                className='block mb-1 text-sm font-semibold text-yellow-400'>
                Character Name
              </label>
              <Select
                id='character-name-select'
                styles={selectStyle}
                className='w-40'
                value={
                  selectedCharacter
                    ? { value: selectedCharacter.id, label: selectedCharacter.characterName }
                    : null
                }
                isClearable
                isSearchable
                isDisabled={!selectedPlayer}
                options={characterOptions}
                onChange={handleCharacterChange}
              />
            </div>
          </div>
        </div>
        <form className='p-3 space-y-6 bg-gray-800 border border-gray-600 rounded-md'>
          <div className='grid grid-cols-2 gap-4'>
            <div id='current-level-block'>
              <label
                htmlFor='current-level'
                className='block mb-1 text-sm font-semibold text-yellow-400'>
                Current Level
              </label>
              <input
                type='number'
                id='current-level'
                name='current-level'
                value={currentLevel ?? ""}
                onChange={(e) => handleNumberChange(e.target.value, setCurrentLevel)}
                onBlur={(e) => handleNumberBlur(e.target.value, 3, 98, setCurrentLevel)}
                max='98'
                placeholder='3-19'
                className='w-40 px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md'
                data-tooltip-id='current-level-tooltip'
              />
              <Tooltip
                id='current-level-tooltip'
                place='top-end'
                variant='error'
                style={{ width: "auto", textAlign: "center", zIndex: 50 }}
                isOpen={!!errors.currentLevel}>
                {errors.currentLevel}
              </Tooltip>
            </div>
            <div id='desired-level-block'>
              <label
                htmlFor='desired-level'
                className='block mb-1 text-sm font-semibold text-yellow-400'>
                Desired Level
              </label>
              <input
                type='number'
                id='desired-level'
                name='desired-level'
                value={desiredLevel ?? ""}
                onChange={(e) => handleNumberChange(e.target.value, setDesiredLevel)}
                onBlur={(e) => handleNumberBlur(e.target.value, 4, 99, setDesiredLevel)}
                max='99'
                placeholder='4-20'
                className='w-40 px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md'
                data-tooltip-id='desired-level-tooltip'
              />
              <Tooltip
                id='desired-level-tooltip'
                place='top-start'
                variant='error'
                style={{ width: "auto", textAlign: "center", zIndex: 50 }}
                isOpen={!!errors.desiredLevel}>
                {errors.desiredLevel}
              </Tooltip>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div id='available-xp-block'>
              <label
                htmlFor='available-xp'
                className='block mb-1 text-sm font-semibold text-yellow-400'>
                Available XP
              </label>
              <input
                type='number'
                id='available-xp'
                name='available-xp'
                value={availableXp ?? ""}
                onChange={(e) => handleNumberChange(e.target.value, setAvailableXp)}
                onBlur={(e) => handleNumberBlur(e.target.value, 0, 999, setAvailableXp)}
                min='0'
                max='999'
                placeholder='0-999'
                className='w-40 px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md'
                data-tooltip-id='available-xp-tooltip'
              />
              <Tooltip
                id='available-xp-tooltip'
                place='top-end'
                variant='error'
                style={{ width: "auto", textAlign: "center", zIndex: 50 }}
                isOpen={!!errors.availableXp}>
                {errors.availableXp}
              </Tooltip>
            </div>
            <div id='last-leveled-date-block'>
              <label
                htmlFor='last-leveled-date'
                className='block mb-1 text-sm font-semibold text-yellow-400'>
                Last Level Up Date
              </label>
              <input
                type='date'
                id='last-leveled-date'
                name='last-leveled-date'
                value={lastLeveledDate ?? ""}
                onChange={(e) => handleDateChange(e.target.value, setLastLeveledDate)}
                onBlur={(e) => handleDateBlur(e.target.value, setLastLeveledDate)}
                className='w-40 px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md'
                data-tooltip-id='last-leveled-date-tooltip'
              />
              <Tooltip
                id='last-leveled-date-tooltip'
                place='top-start'
                variant='error'
                style={{ width: "auto", textAlign: "center", zIndex: 50 }}
                isOpen={!!errors.lastLeveledDate}>
                {errors.lastLeveledDate}
              </Tooltip>
            </div>
          </div>

          <div className='flex space-x-2'>
            <button
              type='button'
              onClick={handleSubmit}
              className='w-full py-2 font-medium text-white rounded-md shadow-lg bg-gradient-to-r from-green-400 to-green-600'>
              Calculate
            </button>
            <button
              type='button'
              onClick={handleClear}
              className='w-full py-2 font-medium text-white rounded-md shadow-lg bg-gradient-to-r from-gray-400 to-gray-600'>
              Clear
            </button>
          </div>
        </form>

        {resultMessage && (
          <div
            className='p-4 mt-6 text-sm text-gray-700 bg-green-100 border border-green-300 rounded-md'
            dangerouslySetInnerHTML={{ __html: resultMessage }}
          />
        )}
      </div>
    </div>
  );
}

export default LevelUpForm;
