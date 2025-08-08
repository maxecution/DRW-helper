import { useState } from "react";

const games = [
  { name: "Goblin Toss", skills: ["Athletics", "Acrobatics"] },
  { name: "Wack-A-Bulette", skills: ["Sleight of Hand", "Athletics"] },
  { name: "Rope Pull", skills: ["Athletics", "Intimidation"] },
  { name: "Battle of Wits", skills: ["Persuasion", "Intimidation"] },
  { name: "Carrot in a Box", skills: ["Deception", "Insight"] },
  { name: "Spot the Ball", skills: ["Perception", "Investigation"] },
  { name: "Juggling", skills: ["Sleight of Hand", "Performance"] },
  { name: "Gorgon Rodeo", skills: ["Animal Handling", "Acrobatics"] },
  { name: "Hide and Seek", skills: ["Perception", "Stealth"] },
  { name: "Cloud Hopping", skills: ["Acrobatics", "Athletics"] },
  { name: "Fire Eating", skills: ["Constitution Save", "Performance"] },
  { name: "Archery Target" },
  { name: "Eating Contest", skills: ["Constitution Save"] },
  {
    name: "Test of Strength",
    options: ["Large (2d12 + STR)", "Medium (1d12 + STR)", "Light (1d8 + STR)"],
  },
  { name: "Lucky Duck Egg" },
];

const GamesPage = () => {
  const [macro, setMacro] = useState("");
  const [formState, setFormState] = useState(() => {
    const initialState = {
      characterName: "",
    };

    for (const game of games) {
      initialState[game.name] = {
        include: true,
        ...(game.name === "Archery Target"
          ? {
              proficient: false,
              numAttacks: 1,
            }
          : {
              skill: game.skills ? game.skills[0] : null,
              option: game.options ? game.options[0] : null,
              reliableTalent: false,
              advantage: false,
            }),
      };
    }
    return initialState;
  });

  const handleChange = (gameName, field, value) => {
    setFormState((prev) => {
      if (field === "") {
        return {
          ...prev,
          [gameName]: value,
        };
      }
      return {
        ...prev,
        [gameName]: {
          ...prev[gameName],
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate character name
    if (!formState.characterName.trim()) {
      alert("Character name cannot be empty or consist only of spaces.");
      return;
    }

    setMacro(generateMacro(formState));
  };

  const resetForm = () => {
    setMacro("");
    setFormState(() => {
      const initialState = {
        characterName: "",
      };

      for (const game of games) {
        initialState[game.name] = {
          include: true,
          ...(game.name === "Archery Target"
            ? {
                proficient: false,
                numAttacks: 1,
              }
            : {
                skill: game.skills ? game.skills[0] : null,
                option: game.options ? game.options[0] : null,
                reliableTalent: false,
                advantage: false,
              }),
        };
      }
      return initialState;
    });
  };

  function generateMacro(formData) {
    const { characterName, ...games } = formData;
    const entries = [];

    const normalizeSkill = (skill) => skill.toLowerCase().replace(/\s/g, "_") + "_bonus";

    for (const [gameName, gameData] of Object.entries(games)) {
      if (!gameData.include) continue;

      let macroSegment = `{{${gameName}= `;

      if (gameName === "Lucky Duck Egg") {
        macroSegment += `[[1d20]]`;
      } else if (gameName === "Test of Strength") {
        const option = gameData.option;
        const rolls = Array.from({ length: 3 }, () => {
          if (option?.includes("Large")) {
            return `[[2d12 + @{${characterName}|strength_mod}]]`;
          } else if (option?.includes("Medium")) {
            return `[[1d12 + @{${characterName}|strength_mod}]]`;
          } else if (option?.includes("Light")) {
            return `[[1d8 + @{${characterName}|strength_mod}]]`;
          } else {
            return `-`;
          }
        }).join(" , ");
        macroSegment += rolls;
      } else if (gameName === "Archery Target") {
        const { proficient, numAttacks } = gameData;
        const profBonus = proficient ? ` + @{${characterName}|pb}` : "";
        const rolls = Array.from(
          { length: numAttacks },
          () => `[[1d20 + @{${characterName}|dexterity_mod}${profBonus}]]`
        ).join(" , ");
        macroSegment += rolls;
      } else {
        const { skill, advantage, reliableTalent } = gameData;
        if (!skill || skill === "null") {
          macroSegment += `-`;
        } else {
          const skillKey = normalizeSkill(skill);
          const rolls = Array.from({ length: 3 }, () => {
            let dice;
            if (advantage) {
              dice = reliableTalent ? `{2d20kh1,10}kh1` : `2d20kh1`;
            } else {
              dice = reliableTalent ? `{1d20,10}kh1` : `1d20`;
            }
            return `[[${dice} + @{${characterName}|${skillKey}}]]`;
          }).join(" , ");

          if (gameName === "Eating Contest") {
            if (advantage) {
              macroSegment += `[[2d20kh1 + @{${characterName}|${skillKey}}]]`;
            } else {
              macroSegment += `[[1d20 + @{${characterName}|${skillKey}}]]`;
            }
          } else {
            macroSegment += rolls;
          }
        }
      }

      macroSegment += ` }}`;
      entries.push(macroSegment);
    }

    return `&{template:default} {{name=${characterName}'s FoG Game Scores}} ${entries.join(" ")}`;
  }

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full min-h-screen bg-gray-900 text-white'>
      <form
        onSubmit={handleSubmit}
        className='max-w-3xl mx-auto my-10 p-6 bg-gray-800 shadow-lg rounded flex-1'>
        <h1 className='text-2xl font-bold mb-6 text-yellow-400'>
          Festival of Giants - Macro Generator
        </h1>

        <div className='mb-6'>
          <label htmlFor='characterName' className='block text-sm font-medium text-yellow-400 mb-1'>
            Character Name
          </label>
          <div className='md:flex gap-3'>
            <input
              id='characterName'
              type='text'
              value={formState.characterName}
              onChange={(e) => handleChange("characterName", "", e.target.value)}
              className='border border-gray-600 rounded px-3 py-2 w-full max-w-md mb-3 md:mb-0 bg-gray-700 text-white placeholder-gray-400'
              placeholder='Enter character name'
            />
            <div className='flex items-center gap-2'>
              <button
                type='submit'
                className='px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-400'>
                Submit
              </button>
              <button
                type='button'
                onClick={resetForm}
                className='px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-500'>
                Reset
              </button>
            </div>
          </div>
        </div>

        {games.map((game) => {
          const gameData = formState[game.name];

          return (
            <div
              key={game.name}
              className='flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-700 py-2'>
              <div className='w-48 font-semibold text-gray-300'>{game.name}</div>

              <label className='flex items-center space-x-2 text-sm'>
                <input
                  type='checkbox'
                  checked={gameData.include}
                  onChange={(e) => handleChange(game.name, "include", e.target.checked)}
                  className='form-checkbox bg-gray-700 border-gray-600 text-yellow-500 focus:ring-yellow-400'
                />
                <span>Include</span>
              </label>

              {/* Special case: Archery Target */}
              {game.name === "Archery Target" ? (
                <>
                  <label className='flex items-center space-x-2 text-sm'>
                    <input
                      type='checkbox'
                      checked={gameData.proficient}
                      onChange={(e) => handleChange(game.name, "proficient", e.target.checked)}
                      className='form-checkbox bg-gray-700 border-gray-600 text-yellow-500 focus:ring-yellow-400'
                    />
                    <span>Proficient</span>
                  </label>

                  <label className='text-sm flex items-center gap-2'>
                    <span>Number of Attacks</span>
                    <input
                      type='number'
                      min={1}
                      value={gameData.numAttacks}
                      onChange={(e) =>
                        handleChange(game.name, "numAttacks", Number(e.target.value))
                      }
                      className='border px-2 py-1 rounded w-16 bg-gray-700 text-white border-gray-600'
                    />
                  </label>
                </>
              ) : (
                <>
                  {/* Existing skill-based or other types */}
                  {game.skills && (
                    <select
                      value={gameData.skill}
                      onChange={(e) => handleChange(game.name, "skill", e.target.value)}
                      className='border rounded px-2 py-1 text-sm bg-gray-700 text-white border-gray-600'>
                      {game.skills.map((s) => (
                        <option key={s} value={s} className='bg-gray-700 text-white'>
                          {s}
                        </option>
                      ))}
                    </select>
                  )}

                  {game.options && (
                    <select
                      value={gameData.option}
                      onChange={(e) => handleChange(game.name, "option", e.target.value)}
                      className='border rounded px-2 py-1 text-sm bg-gray-700 text-white border-gray-600'>
                      {game.options.map((o) => (
                        <option key={o} value={o} className='bg-gray-700 text-white'>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}

                  {game.skills && (
                    <>
                      {game.name != "Eating Contest" && (
                        <label className='flex items-center space-x-1 text-sm'>
                          <input
                            type='checkbox'
                            checked={gameData.reliableTalent}
                            onChange={(e) =>
                              handleChange(game.name, "reliableTalent", e.target.checked)
                            }
                            className='form-checkbox bg-gray-700 border-gray-600 text-yellow-500 focus:ring-yellow-400'
                          />
                          <span>Reliable Talent</span>
                        </label>
                      )}

                      <label className='flex items-center space-x-1 text-sm'>
                        <input
                          type='checkbox'
                          checked={gameData.advantage}
                          onChange={(e) => handleChange(game.name, "advantage", e.target.checked)}
                          className='form-checkbox bg-gray-700 border-gray-600 text-yellow-500 focus:ring-yellow-400'
                        />
                        <span>Advantage</span>
                      </label>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </form>

      <div className='flex-1 my-10 p-6 bg-gray-800 shadow-lg rounded'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold text-yellow-400'>Generated Macro</h2>
          <button
            className='bg-yellow-500 text-gray-900 px-4 py-2 rounded font-bold hover:bg-yellow-400'
            disabled={!macro}
            onClick={() => navigator.clipboard.writeText(macro)}>
            Copy Macro to Clipboard
          </button>
        </div>

        <pre className='whitespace-pre-wrap break-words bg-gray-700 p-4 rounded border border-gray-600 text-white'>
          {macro ? macro : "No macro generated yet."}
        </pre>
      </div>
    </div>
  );
};

export default GamesPage;
