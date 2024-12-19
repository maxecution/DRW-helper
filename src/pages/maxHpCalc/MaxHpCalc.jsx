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

  useEffect(() => {
    calculateHp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes, constitutionMod, toughFeat, dwarfSpecies, draconicSorc]);

  return (
    <div className='min-h-screen bg-gray-800 text-white flex flex-col items-center p-6'>
      <h1 className='text-3xl font-bold text-yellow-400 mb-6'>Max HP Calculator</h1>

      <div className='w-80'>
        <div className='mb-6 flex text-nowrap items-center gap-2 mx-5'>
          <label htmlFor='constitutionMod' className='block text-gray-300'>
            Constitution Modifier:
          </label>
          <input
            id='constitutionMod'
            type='number'
            value={constitutionMod}
            onChange={(e) => setConstitutionMod(parseInt(e.target.value) || 0)}
            className='bg-gray-700 text-white p-2 rounded w-full'
          />
        </div>
        <div className='mb-6 flex text-nowrap items-center justify-center gap-5'>
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
          <div key={index} className='mb-6 p-4 border border-gray-600 rounded'>
            <div className='mb-4'>
              <label htmlFor={`class-${index}`} className='block text-gray-300 mb-1'>
                Class:
              </label>
              <select
                id={`class-${index}`}
                value={entry.class}
                onChange={(e) => updateClass(index, "class", e.target.value)}
                className='bg-gray-700 text-white p-2 rounded w-full'>
                {Object.keys(classHitDice).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor={`level-${index}`} className='block text-gray-300 mb-1'>
                Level:
              </label>
              <input
                id={`level-${index}`}
                type='number'
                value={entry.level}
                min='1'
                onChange={(e) => updateClass(index, "level", parseInt(e.target.value) || 1)}
                className='bg-gray-700 text-white p-2 rounded w-full'
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
                className='mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full'>
                Remove Class
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addClass}
          className='bg-gray-600 hover:bg-gray-700 text-yellow-400 hover:text-yellow-500 px-4 py-2 rounded w-full mb-4'>
          Add Another Class
        </button>

        <button
          onClick={calculateHp}
          className='bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-4 py-2 rounded w-full mb-6'>
          Calculate Max HP
        </button>

        <div className='text-xl font-bold text-yellow-400 text-center'>Maximum HP: {maxHp}</div>
      </div>
    </div>
  );
}

export default MaxHpCalc;
