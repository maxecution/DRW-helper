import { useState, useEffect } from "react";

function MaxHpCalc() {
  const [classes, setClasses] = useState([{ class: "Artificer", level: 1 }]);
  const [constitutionMod, setConstitutionMod] = useState(0);
  const [toughFeat, setToughFeat] = useState(false);
  const [dwarfSpecies, setdwarfSpecies] = useState(false);
  const [draconicSorc, setDraconicSorc] = useState(false);
  const [maxHp, setMaxHp] = useState(0);

  const hitDice = {
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
  };

  const classHitDice = {
    Artificer: "d8",
    Barbarian: "d12",
    Bard: "d8",
    Cleric: "d8",
    Druid: "d8",
    Fighter: "d10",
    Monk: "d8",
    Paladin: "d10",
    Ranger: "d10",
    Rogue: "d8",
    Sorcerer: "d6",
    Warlock: "d8",
    Wizard: "d6",
  };

  const calculateHp = () => {
    let totalHp = 0;
    let totalLevel = 0;
    let sorcererLevel = 0;

    classes.forEach((entry, index) => {
      const { class: className, level } = entry;
      const die = hitDice[classHitDice[className]];
      const averageHp = Math.floor(die / 2) + 1;

      totalLevel += level;
      if (className === "Sorcerer") {
        sorcererLevel += level;
      }

      if (index === 0) {
        // First class, level 1 gets max die
        totalHp += die + constitutionMod;
        if (level > 1) {
          totalHp += (level - 1) * (averageHp + constitutionMod);
        }
      } else {
        // Multiclass: first level uses average
        totalHp += level * (averageHp + constitutionMod);
      }
    });

    if (dwarfSpecies) {
      totalHp += totalLevel;
    }

    if (toughFeat) {
      totalHp += 2 * totalLevel;
    }

    if (draconicSorc && sorcererLevel >= 3) {
      totalHp += sorcererLevel;
    }

    setMaxHp(totalHp);
  };

  const updateClass = (index, field, value) => {
    const updatedClasses = [...classes];
    updatedClasses[index][field] = value;
    setClasses(updatedClasses);
  };

  const addClass = () => {
    setClasses([...classes, { class: "Artificer", level: 1 }]);
  };

  const removeClass = (index) => {
    const updatedClasses = classes.filter((_, i) => i !== index);
    setClasses(updatedClasses);
  };

  const resetToDefault = () => {
    setClasses([{ class: "Artificer", level: 1 }]);
    setConstitutionMod(0);
    setToughFeat(false);
    setdwarfSpecies(false);
    setDraconicSorc(false);
    setMaxHp(0);
  };

  useEffect(() => {
    calculateHp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes, constitutionMod, toughFeat, dwarfSpecies, draconicSorc]);

  return (
    <div className='flex flex-col w-full max-w-full min-h-screen text-white bg-gray-900'>
      <header className='py-6 text-center bg-gray-800 shadow-lg'>
        <h1 className='text-2xl font-bold text-yellow-400 sm:text-3xl md:text-4xl'>
          Max HP Calculator
        </h1>
      </header>
      <div className='mx-auto mt-4 w-80'>
        <div className='flex items-center gap-2 mx-5 mb-6 text-nowrap'>
          <label htmlFor='constitutionMod' className='block text-gray-300'>
            Constitution Modifier:
          </label>
          <input
            id='constitutionMod'
            type='number'
            value={constitutionMod}
            onChange={(e) => setConstitutionMod(parseInt(e.target.value) || 0)}
            className='w-full p-2 text-white bg-gray-700 rounded'
          />
        </div>
        <div className='flex items-center justify-center gap-5 mb-6 text-nowrap'>
          <div className='flex items-center gap-2'>
            <label htmlFor='toughFeat' className='block text-gray-300'>
              Tough:
            </label>
            <div className='relative'>
              <input
                id='toughFeat'
                type='checkbox'
                checked={toughFeat}
                onChange={() => setToughFeat(!toughFeat)}
                className='hidden'
              />
              <div
                className={`w-6 h-6 rounded border-2 ${
                  toughFeat ? "bg-yellow-400 border-yellow-500" : "bg-gray-700 border-gray-500"
                } flex items-center justify-center cursor-pointer`}
                onClick={() => setToughFeat(!toughFeat)}>
                {toughFeat && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4 text-gray-800'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M16.704 5.29a1 1 0 01.092 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.292-7.293a1 1 0 011.412 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor='dwarfSpecies' className='block text-gray-300'>
              Dwarf Species:
            </label>
            <div className='relative'>
              <input
                id='dwarfSpecies'
                type='checkbox'
                checked={dwarfSpecies}
                onChange={() => setdwarfSpecies(!dwarfSpecies)}
                className='hidden'
              />
              <div
                className={`w-6 h-6 rounded border-2 ${
                  dwarfSpecies ? "bg-yellow-400 border-yellow-500" : "bg-gray-700 border-gray-500"
                } flex items-center justify-center cursor-pointer`}
                onClick={() => setdwarfSpecies(!dwarfSpecies)}>
                {dwarfSpecies && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4 text-gray-800'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M16.704 5.29a1 1 0 01.092 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.292-7.293a1 1 0 011.412 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {classes.map((entry, index) => (
          <div key={index} className='p-4 mb-6 border border-gray-600 rounded'>
            <div className='mb-4'>
              <label htmlFor={`class-${index}`} className='block mb-1 text-gray-300'>
                Class:
              </label>
              <select
                id={`class-${index}`}
                value={entry.class}
                onChange={(e) => updateClass(index, "class", e.target.value)}
                className='w-full p-2 text-white bg-gray-700 rounded'>
                {Object.keys(classHitDice).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor={`level-${index}`} className='block mb-1 text-gray-300'>
                Level:
              </label>
              <input
                id={`level-${index}`}
                type='number'
                value={entry.level}
                min='1'
                onChange={(e) => {
                  const value = e.target.value;
                  updateClass(index, "level", value === "" ? "" : parseInt(value) || 1);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    updateClass(index, "level", 1);
                  }
                }}
                className='w-full p-2 text-white bg-gray-700 rounded'
              />
            </div>

            {entry.class === "Sorcerer" && entry.level >= 3 && (
              <div className='flex items-center gap-2'>
                <label htmlFor='draconicSorc' className='block text-gray-300'>
                  Draconic Sorcery:
                </label>
                <input
                  id='draconigSorc'
                  type='checkbox'
                  checked={draconicSorc}
                  onChange={() => setDraconicSorc(!draconicSorc)}
                  className='hidden'
                />
                <div
                  className={`w-6 h-6 rounded border-2 ${
                    draconicSorc ? "bg-yellow-400 border-yellow-500" : "bg-gray-700 border-gray-500"
                  } flex items-center justify-center cursor-pointer`}
                  onClick={() => setDraconicSorc(!draconicSorc)}>
                  {draconicSorc && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4 text-gray-800'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.704 5.29a1 1 0 01.092 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.292-7.293a1 1 0 011.412 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}

            {index > 0 && (
              <button
                onClick={() => removeClass(index)}
                className='w-full px-4 py-2 mt-2 font-bold text-white rounded-md shadow-lg bg-gradient-to-r from-red-400 to-red-600'>
                Remove Class
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addClass}
          className='w-full px-4 py-2 mb-4 font-bold text-white rounded-md shadow-lg bg-gradient-to-r from-green-400 to-green-600'>
          Add Another Class
        </button>

        <button
          onClick={resetToDefault}
          className='w-full px-4 py-2 mb-6 font-bold text-white rounded-md shadow-lg bg-gradient-to-r from-gray-400 to-gray-600'>
          Clear
        </button>

        <div className='text-xl font-bold text-center text-yellow-400'>Maximum HP: {maxHp}</div>
      </div>
    </div>
  );
}

export default MaxHpCalc;
