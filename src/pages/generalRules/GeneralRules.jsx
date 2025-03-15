import { useState, useEffect } from "react";
import { Accordion } from "rsuite";
import { FaExpand, FaCompress } from "react-icons/fa";
import Select from "react-select";
import { Tooltip } from "react-tooltip";
import { selectStyle } from "../../utils/Styles";
import Stat from "./components/StatComponent";
import Level from "./components/LevelComponent";
import { CapacityDisplay, BreathTooltip } from "./utils.jsx";
function GeneralRules() {
  // Load from localStorage or default to 10
  const getInitialValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  };

  const [level, setLevel] = useState(() => getInitialValue("level", 3));
  const [strScore, setStrScore] = useState(() => getInitialValue("strScore", 10));
  const [dexScore, setDexScore] = useState(() => getInitialValue("dexScore", 10));
  const [conScore, setConScore] = useState(() => getInitialValue("conScore", 10));
  const [intScore, setIntScore] = useState(() => getInitialValue("intScore", 10));
  const [wisScore, setWisScore] = useState(() => getInitialValue("wisScore", 10));
  const [chaScore, setChaScore] = useState(() => getInitialValue("chaScore", 10));

  const strMod = Math.floor((strScore - 10) / 2);
  const dexMod = Math.floor((dexScore - 10) / 2);
  const conMod = Math.floor((conScore - 10) / 2);
  const intMod = Math.floor((intScore - 10) / 2);
  const wisMod = Math.floor((wisScore - 10) / 2);
  const chaMod = Math.floor((chaScore - 10) / 2);
  const profBonus = Math.ceil(level / 4) + 1;

  const sizeOptions = [
    { id: 1, value: "tiny", label: "Tiny", multiplier: 1 },
    { id: 2, value: "small", label: "Small", multiplier: 2 },
    { id: 3, value: "medium", label: "Medium", multiplier: 2 },
    { id: 4, value: "large", label: "Large", multiplier: 4 },
    { id: 5, value: "huge", label: "Huge", multiplier: 8 },
    { id: 6, value: "gargantuan", label: "Gargantuan", multiplier: 16 },
  ];

  const [carryingMultiplier, setCarryingMultiplier] = useState(0);

  const [activePanels, setActivePanels] = useState([false, false, false]);

  // Save scores to localStorage when they change
  useEffect(() => {
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("strScore", JSON.stringify(strScore));
    localStorage.setItem("dexScore", JSON.stringify(dexScore));
    localStorage.setItem("conScore", JSON.stringify(conScore));
    localStorage.setItem("intScore", JSON.stringify(intScore));
    localStorage.setItem("wisScore", JSON.stringify(wisScore));
    localStorage.setItem("chaScore", JSON.stringify(chaScore));
  }, [level, strScore, dexScore, conScore, intScore, wisScore, chaScore]);

  const handleExpandAll = () => {
    setActivePanels([true, true, true]);
  };

  const handleCollapseAll = () => {
    setActivePanels([false, false, false]);
  };

  const handleTogglePanel = (index) => {
    setActivePanels((prev) => {
      const newActivePanels = [...prev];
      newActivePanels[index] = !newActivePanels[index];
      return newActivePanels;
    });
  };

  const handleSizeChange = (selectedOption) => {
    if (selectedOption) {
      setCarryingMultiplier(selectedOption.multiplier);
    } else {
      setCarryingMultiplier(0);
    }
  };

  return (
    <div className='flex space-x-4'>
      <div className='ml-4 flex flex-col items-center w-min'>
        {/* Ability Scores Section */}
        <h1 className='text-xl font-medium text-yellow-400 text-nowrap mb-2'>Ability Scores</h1>
        <Level level={level} setLevel={setLevel} />
        <Stat ability='Strength' score={strScore} setScore={setStrScore} />
        <Stat ability='Dexterity' score={dexScore} setScore={setDexScore} />
        <Stat ability='Constitution' score={conScore} setScore={setConScore} />
        <Stat ability='Intelligence' score={intScore} setScore={setIntScore} />
        <Stat ability='Wisdom' score={wisScore} setScore={setWisScore} />
        <Stat ability='Charisma' score={chaScore} setScore={setChaScore} />
      </div>
      <div className='w-full'>
        {/* Rules & Mechanics Section */}
        <div className='flex flex-col items-center w-2/3'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='text-xl font-medium text-yellow-400 text-nowrap mb-2 ml-4'>
              Rules & Mechanics
            </h1>
            <div className='flex space-x-2 mb-2 mr-4'>
              <button
                onClick={handleExpandAll}
                className='px-1 py-1 text-white text-sm bg-gray-600 rounded-md'
                data-tooltip-id='expand-tooltip'>
                <FaExpand />
              </button>
              <Tooltip
                id='expand-tooltip'
                offset={3}
                noArrow
                variant='dark'
                className='z-50'
                opacity={0.6}>
                Expand all
              </Tooltip>
              <button
                onClick={handleCollapseAll}
                className='px-1 py-1 text-white text-sm bg-gray-600 rounded-md'
                data-tooltip-id='collapse-tooltip'>
                <FaCompress />
              </button>
              <Tooltip
                id='collapse-tooltip'
                offset={3}
                noArrow
                variant='dark'
                className='z-50'
                opacity={0.6}>
                Collapse all
              </Tooltip>
            </div>
          </div>
          <Accordion bordered className='text-white mx-4 w-full'>
            <Accordion.Panel
              header='Carrying Capacity'
              expanded={activePanels[0]}
              onSelect={() => handleTogglePanel(0)}>
              <div className='flex flex-col space-y-3'>
                <div className='w-60 flex items-center gap-3'>
                  <span className='font-semibold'>Size:</span>
                  <Select
                    id='size-select'
                    placeholder='Select PC size'
                    options={sizeOptions}
                    onChange={handleSizeChange}
                    isClearable
                    isSearchable
                    className='w-full'
                    menuPortalTarget={document.body} // Renders dropdown at body level
                    menuPosition='absolute'
                    menuPlacement='auto' // Ensures dropdown opens in the right direction
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensures dropdown appears on top
                      ...selectStyle,
                    }}
                  />
                </div>
                <p className='text-sm'>
                  Your size and Strength score determine the maximum weight in pounds that you can
                  carry. While dragging, lifting, or pushing weight in excess of the maximum weight
                  you can carry, your Speed can be no more than 5 feet.
                </p>
                <CapacityDisplay strScore={strScore} carryingMultiplier={carryingMultiplier} />
              </div>
            </Accordion.Panel>
            <Accordion.Panel
              header='Grapple/Shove'
              expanded={activePanels[1]}
              onSelect={() => handleTogglePanel(1)}>
              <div className='flex flex-col space-y-3'>
                <p className='text-sm'>
                  <span className='font-medium'>Unarmed Strike</span> - A melee attack that involves
                  you using your body to damage,{" "}
                  <span className='font-semibold'>grapple, or shove</span> a target within 5 feet of
                  you.
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Grapple</span> - The target must succeed on a
                  Strength or Dexterity saving throw (it chooses which), or it has the Grappled
                  condition. This grapple is possible only if the target is no more than one size
                  larger than you and if you have a hand free to grab it.
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Shove</span> - The target must succeed on a Strength
                  or Dexterity saving throw (it chooses which), or you either push it 5 feet away or
                  cause it to have the Prone condition. This shove is possible only if the target is
                  no more than one size larger than you.
                </p>
                <p>
                  Your DC for these saving throws (and any grapple escape attempts) is{" "}
                  <span className='text-yellow-400 font-bold' data-tooltip-id='grapple-dc-tooltip'>
                    {8 + strMod + Number(profBonus)}
                  </span>
                  <Tooltip
                    id='grapple-dc-tooltip'
                    place='top-start'
                    offset={3}
                    variant='info'
                    className='z-50'
                    opacity={1}>
                    8 (base) + Strength Mod ({strMod}) + Proficiency Bonus ({profBonus})
                  </Tooltip>
                  .
                </p>
              </div>
            </Accordion.Panel>
            <Accordion.Panel
              header='Suffocating'
              expanded={activePanels[2]}
              onSelect={() => handleTogglePanel(2)}>
              <div className='flex flex-col space-y-3'>
                <p className='text-sm'>
                  A creature can hold its breath for a number of minutes equal to 1 plus its
                  Constitution modifier (minimum of 30 seconds) before suffocation begins.
                </p>
                <p className='text-sm'>
                  When a creature runs out of breath or is choking, it gains 1 Exhaustion level at
                  the end of each of its turns. When a creature can breathe again, it removes all
                  levels of Exhaustion it gained from suffocating.
                </p>
                <p>
                  You can hold your breath for <BreathTooltip conMod={conMod} /> before suffocating.
                </p>
              </div>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default GeneralRules;
