import { useState, useEffect } from "react";
import { Accordion } from "rsuite";
import { FaExpand, FaCompress } from "react-icons/fa";
import Select from "react-select";
import { Tooltip } from "react-tooltip";
import { selectStyle } from "../../utils/Styles";
import Stat from "./components/StatComponent";
import Level from "./components/LevelComponent";
import {
  CapacityDisplay,
  BreathTooltip,
  RunningLongJump,
  RunningHighJump,
  StandingLongJump,
  StandingHighJump,
  TrainingDuration,
} from "./utils.jsx";
import { handleNumberChange } from "../../utils/InputUtils.js";
function GeneralRules() {
  // Load from localStorage or use default values
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
  const [heightFeet, setHeightFeet] = useState(() => getInitialValue("heightFeet", 0));
  const [heightInches, setHeightInches] = useState(() => getInitialValue("heightInches", 0));

  const strMod = Math.floor((strScore - 10) / 2);
  // const dexMod = Math.floor((dexScore - 10) / 2);
  const conMod = Math.floor((conScore - 10) / 2);
  const intMod = Math.floor((intScore - 10) / 2);
  // const wisMod = Math.floor((wisScore - 10) / 2);
  // const chaMod = Math.floor((chaScore - 10) / 2);
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

  // Save scores to localStorage when they change
  useEffect(() => {
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("strScore", JSON.stringify(strScore));
    localStorage.setItem("dexScore", JSON.stringify(dexScore));
    localStorage.setItem("conScore", JSON.stringify(conScore));
    localStorage.setItem("intScore", JSON.stringify(intScore));
    localStorage.setItem("wisScore", JSON.stringify(wisScore));
    localStorage.setItem("chaScore", JSON.stringify(chaScore));
    localStorage.setItem("heightFeet", JSON.stringify(heightFeet));
    localStorage.setItem("heightInches", JSON.stringify(heightInches));
  }, [level, strScore, dexScore, conScore, intScore, wisScore, chaScore, heightFeet, heightInches]);

  const panelCount = 5; // Change this to match Accordion.Panel count
  const [activePanels, setActivePanels] = useState(Array(panelCount).fill(false));

  {
    /* TODO: Ability Score Sidebar */
  }
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  const handleExpandAll = () => {
    setActivePanels(Array(panelCount).fill(true));
  };

  const handleCollapseAll = () => {
    setActivePanels(Array(panelCount).fill(false));
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
    <div className='flex space-x-4 bg-gray-800'>
      <div className='flex flex-col items-center ml-4 w-min'>
        {/* Ability Scores Section */}
        <h1 className='mb-2 text-xl font-medium text-yellow-400 text-nowrap'>Ability Scores</h1>
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
        <div className='flex flex-col items-center w-full sm:w-3/4'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='mb-2 ml-4 mr-2 text-xl font-medium text-yellow-400 text-nowrap'>
              Rules & Mechanics
            </h1>
            <div className='flex mb-2 mr-4 space-x-2'>
              <button
                onClick={handleExpandAll}
                className='px-1 py-1 text-sm text-white bg-gray-600 rounded-md'
                data-tooltip-id='expand-tooltip'>
                <FaExpand />
              </button>
              <Tooltip
                id='expand-tooltip'
                offset={3}
                place='top-start'
                noArrow
                variant='dark'
                className='z-50'
                opacity={0.6}>
                Expand all
              </Tooltip>
              <button
                onClick={handleCollapseAll}
                className='px-1 py-1 text-sm text-white bg-gray-600 rounded-md'
                data-tooltip-id='collapse-tooltip'>
                <FaCompress />
              </button>
              <Tooltip
                id='collapse-tooltip'
                offset={3}
                place='top-start'
                noArrow
                variant='dark'
                className='z-50'
                opacity={0.6}>
                Collapse all
              </Tooltip>
            </div>
          </div>
          <Accordion bordered className='w-full mb-4 mr-4 overflow-visible text-white'>
            <Accordion.Panel
              header='Carrying Capacity'
              expanded={activePanels[0]}
              onSelect={() => handleTogglePanel(0)}>
              <div className='flex flex-col space-y-3'>
                <div className='flex items-center gap-3 w-60'>
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
                <div className='text-sm'>
                  Your size and Strength score determine the maximum weight in pounds that you can
                  carry. While dragging, lifting, or pushing weight in excess of the maximum weight
                  you can carry, your Speed can be no more than 5 feet.
                </div>
                <CapacityDisplay strScore={strScore} carryingMultiplier={carryingMultiplier} />
              </div>
              <div className='flex'>
                <a
                  href='https://5e.tools/variantrules.html#carrying%20capacity_xphb'
                  target='_blank'
                  className='ml-auto text-xs'>
                  PHB&apos;24 p.362
                </a>
              </div>
            </Accordion.Panel>
            <Accordion.Panel
              header='Grapple/Shove'
              className='overflow-visible'
              expanded={activePanels[1]}
              onSelect={() => handleTogglePanel(1)}>
              <div className='flex flex-col space-y-3'>
                <div className='text-sm'>
                  <span className='font-medium'>Unarmed Strike</span> - A melee attack that involves
                  you using your body to damage,{" "}
                  <span className='font-semibold'>grapple, or shove</span> a target within 5 feet of
                  you.
                </div>
                <div className='text-sm'>
                  <span className='font-medium'>Grapple</span> - The target must succeed on a
                  Strength or Dexterity saving throw (it chooses which), or it has the Grappled
                  condition. This grapple is possible only if the target is no more than one size
                  larger than you and if you have a hand free to grab it.
                </div>
                <div className='text-sm'>
                  <span className='font-medium'>Shove</span> - The target must succeed on a Strength
                  or Dexterity saving throw (it chooses which), or you either push it 5 feet away or
                  cause it to have the Prone condition. This shove is possible only if the target is
                  no more than one size larger than you.
                </div>
                <div>
                  Your DC for these saving throws (and any grapple escape attempts) is{" "}
                  <span className='font-bold text-yellow-400' data-tooltip-id='grapple-dc-tooltip'>
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
                </div>
              </div>
              <div className='flex'>
                <a
                  href='https://5e.tools/variantrules.html#unarmed%20strike_xphb'
                  target='_blank'
                  className='ml-auto text-xs'>
                  PHB&apos;24 p.377
                </a>
              </div>
            </Accordion.Panel>
            <Accordion.Panel
              header='Suffocating'
              className='overflow-visible'
              expanded={activePanels[2]}
              onSelect={() => handleTogglePanel(2)}>
              <div className='flex flex-col space-y-3'>
                <div className='text-sm'>
                  A creature can hold its breath for a number of minutes equal to 1 plus its
                  Constitution modifier (minimum of 30 seconds) before suffocation begins.
                </div>
                <div className='text-sm'>
                  When a creature runs out of breath or is choking, it gains 1 Exhaustion level at
                  the end of each of its turns. When a creature can breathe again, it removes all
                  levels of Exhaustion it gained from suffocating.
                </div>
                <div>
                  You can hold your breath for <BreathTooltip conMod={conMod} /> before suffocating.
                </div>
              </div>
              <div className='flex'>
                <a
                  href='https://5e.tools/trapshazards.html#suffocation_xphb'
                  target='_blank'
                  className='ml-auto text-xs'>
                  PHB&apos;24 p.376
                </a>
              </div>
            </Accordion.Panel>
            <Accordion.Panel
              header='Jumping'
              className='overflow-visible'
              expanded={activePanels[3]}
              onSelect={() => handleTogglePanel(3)}>
              <div className='flex flex-col space-y-2'>
                <div className='text-sm'>
                  <span className='mb-2 font-semibold'>Long Jump</span>
                  <br />
                  You cover a number of feet up to your Strength score if you move at least 10 feet
                  on foot immediately before the jump.
                </div>
                <div className='text-sm'>
                  When you make a standing Long Jump, you can leap only half that distance. Either
                  way, each foot you jump costs a foot of movement.
                </div>
                <div className='text-sm'>
                  If you land in difficult terrain, you must succeed on a DC 10 Dexterity
                  (Acrobatics) check or have the Prone condition. This Long Jump rule assumes that
                  the height of the jump doesn&apos;t matter, such as a jump across a stream or
                  chasm. At your DM&apost;s option, you must succeed on a DC 10 Strength (Athletics)
                  check to clear a low obstacle (no taller than a quarter of the jump&apost;s
                  distance), such as a hedge or low wall. Otherwise, you hit the obstacle.
                </div>
                <div>
                  Running: <RunningLongJump strScore={strScore} /> | Standing:{" "}
                  <StandingLongJump strScore={strScore} />
                </div>
                <div className='flex'>
                  <a
                    href='https://5e.tools/variantrules.html#long%20jump_xphb'
                    target='_blank'
                    className='ml-auto text-xs'>
                    PHB&apos;24 p.370
                  </a>
                </div>
                <hr />
                <div className='text-sm'>
                  <span className='mb-2 font-semibold'>High Jump</span>
                  <br />
                  You leap into the air a number of feet equal to 3 plus your Strength modifier
                  (minimum of 0 feet) if you move at least 10 feet on foot immediately before the
                  jump.
                </div>
                <div className='text-sm'>
                  When you make a standing High Jump, you can jump only half that distance. Either
                  way, each foot of the jump costs a foot of movement.
                </div>
                <div className='text-sm'>
                  You can extend your arms half your height above yourself during the jump. Thus,
                  you can reach a distance equal to the height of the jump plus 1½ times your
                  height.
                </div>
                {/* Height Input Fields */}
                <div className='flex items-center gap-2 mt-2'>
                  <label className='text-sm font-medium'>Height:</label>
                  <input
                    type='number'
                    value={heightFeet}
                    onChange={(e) => handleNumberChange(e.target.value, 0, 99, setHeightFeet)}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setHeightFeet(0);
                      }
                    }}
                    min={0}
                    className='border border-gray-600 bg-gray-700 text-white text-sm text-center p-1 rounded-md w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    placeholder='ft'
                  />
                  <span className='text-sm'>ft</span>
                  <input
                    type='number'
                    value={heightInches}
                    onChange={(e) => handleNumberChange(e.target.value, 0, 11, setHeightInches)}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setHeightInches(0);
                      }
                    }}
                    min={0}
                    max={11}
                    className='border border-gray-600 bg-gray-700 text-white text-sm text-center p-1 rounded-md w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    placeholder='in'
                  />
                  <span className='text-sm'>in</span>
                </div>
                <div>
                  Running:{" "}
                  <RunningHighJump strMod={strMod} height={heightFeet * 12 + heightInches} /> |
                  Standing:{" "}
                  <StandingHighJump strMod={strMod} height={heightFeet * 12 + heightInches} />
                </div>
              </div>
              <div className='flex'>
                <a
                  href='https://5e.tools/variantrules.html#high%20jump_xphb'
                  target='_blank'
                  className='ml-auto text-xs'>
                  PHB&apos;24 p.368
                </a>
              </div>
            </Accordion.Panel>
            <Accordion.Panel
              header='Downtime Training'
              className='overflow-visible'
              expanded={activePanels[4]}
              onSelect={() => handleTogglePanel(4)}>
              <div className='flex flex-col space-y-2'>
                <div className='text-sm'>
                  You can spend your downtime learning proficiency with a new tool or learning a
                  language. 1 workweek is 5 downtime days.
                </div>
                <div className='text-sm'>
                  Receiving training in a language or tool typically takes at least ten workweeks,
                  but this time is reduced by a number of workweeks equal to the character&apos;s
                  Intelligence modifier (an Intelligence penalty doesn&apos;t increase the time
                  needed). Training costs 25 gp per workweek.
                </div>
                <TrainingDuration intMod={intMod} />
              </div>
              <div className='flex'>
                <a
                  href='https://5e.tools/variantrules.html#downtime%20activity%3a%20training_xge'
                  target='_blank'
                  className='ml-auto text-xs'>
                  XGE p.134
                </a>
              </div>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default GeneralRules;
