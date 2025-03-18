import { useState } from "react";
import { Tooltip } from "react-tooltip";

const CapacityTooltip = ({ label, value, multiplier, tooltipId }) => (
  <div>
    <span>{label}: </span>
    <span className='font-bold text-yellow-400' data-tooltip-id={tooltipId}>
      {value} lb.
    </span>
    <Tooltip
      id={tooltipId}
      place='top-start'
      offset={3}
      variant='info'
      style={{ width: "auto", textAlign: "center", zIndex: 50 }}
      opacity={1}>
      Strength Score ({value / multiplier}) x {multiplier} lb.
    </Tooltip>
  </div>
);

export const CapacityDisplay = ({ strScore, carryingMultiplier }) => {
  if (carryingMultiplier === 0) {
    return (
      <div className='space-y-1'>
        <div>
          <span>Carry Capacity: </span>
          <span className='font-bold text-yellow-400'>-</span>
        </div>
        <div>
          <span>Drag/Lift/Push Capacity: </span>
          <span className='font-bold text-yellow-400'>-</span>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-1'>
      <CapacityTooltip
        label='Carry Capacity'
        value={strScore * carryingMultiplier * 7.5}
        multiplier={carryingMultiplier * 7.5}
        tooltipId='carry-capacity-tooltip'
      />
      <CapacityTooltip
        label='Drag/Lift/Push Capacity'
        value={strScore * carryingMultiplier * 15}
        multiplier={carryingMultiplier * 15}
        tooltipId='drag-capacity-tooltip'
      />
    </div>
  );
};

export const BreathTooltip = ({ conMod }) => {
  const holdTime = conMod < 0 ? "30 seconds" : `${1 + conMod} minute(s)`;
  const rounds = conMod < 0 ? 5 : (1 + conMod) * 10;

  return (
    <span>
      <span className='font-bold text-yellow-400' data-tooltip-id='suffocating-tooltip'>
        {holdTime}
      </span>
      <Tooltip
        id='suffocating-tooltip'
        place='top-start'
        offset={3}
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        {rounds} rounds; 1 + Constitution Mod ({conMod}), min. 30 seconds
      </Tooltip>
    </span>
  );
};

export const RunningLongJump = ({ strScore }) => {
  const jumpDistance = strScore;
  return (
    <>
      <span className='font-bold text-yellow-400' data-tooltip-id='running-jump-tooltip'>
        {jumpDistance} ft.
      </span>
      <Tooltip
        id='running-jump-tooltip'
        place='top-start'
        offset={3}
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        Strength Score
      </Tooltip>
    </>
  );
};

export const StandingLongJump = ({ strScore }) => {
  const jumpDistance = Math.floor(strScore / 2);
  return (
    <>
      <span className='font-bold text-yellow-400' data-tooltip-id='standing-jump-tooltip'>
        {jumpDistance} ft.
      </span>
      <Tooltip
        id='standing-jump-tooltip'
        place='top-start'
        offset={3}
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        Strength Score / 2
      </Tooltip>
    </>
  );
};

export const RunningHighJump = ({ strMod, height = 0 }) => {
  const jumpHeight = Math.max(3 + strMod, 0);
  const additionalReach = Math.floor((height * 1.5) / 12);
  const totalHeight = jumpHeight + additionalReach;
  return (
    <>
      <span className='font-bold text-yellow-400' data-tooltip-id='running-high-jump-tooltip'>
        {totalHeight} ft.
      </span>
      <Tooltip
        id='running-high-jump-tooltip'
        place='top-start'
        offset={3}
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        Jump Height: {jumpHeight} ft. + Additional Reach ({additionalReach} ft.)
      </Tooltip>
    </>
  );
};

export const StandingHighJump = ({ strMod, height = 0 }) => {
  const jumpHeight = Math.max(Math.floor((3 + strMod) / 2), 0);
  const additionalReach = Math.floor((height * 1.5) / 12);
  const totalHeight = jumpHeight + additionalReach;
  return (
    <>
      <span className='font-bold text-yellow-400' data-tooltip-id='standing-high-jump-tooltip'>
        {totalHeight} ft.
      </span>
      <Tooltip
        id='standing-high-jump-tooltip'
        place='top-start'
        offset={3}
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        Jump Height: {jumpHeight} ft. + Additional Reach ({additionalReach} ft.)
      </Tooltip>
    </>
  );
};

export const TrainingDuration = ({ intMod }) => {
  const [hasTrainer, setHasTrainer] = useState(false);

  const baseWeeks = Math.min(10 - intMod, 10);
  const weeksNeeded = baseWeeks - (hasTrainer ? 2 : 0);
  const downtimeDays = weeksNeeded * 5;

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex items-center gap-2'>
        <label htmlFor='trainer' className='text-sm font-medium'>
          Trainer?
        </label>
        <div
          className={`relative w-10 h-5 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer transition ${
            hasTrainer ? "bg-yellow-500" : "bg-gray-600"
          }`}
          onClick={() => setHasTrainer(!hasTrainer)}>
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
              hasTrainer ? "translate-x-5" : "translate-x-0"
            }`}
          />
          <input
            id='trainer'
            type='checkbox'
            checked={hasTrainer}
            onChange={() => setHasTrainer(!hasTrainer)}
            className='hidden'
          />
        </div>
      </div>
      <div>
        Weeks needed:{" "}
        <span className='font-bold text-yellow-400' data-tooltip-id='training-weeks-tooltip'>
          {weeksNeeded}
        </span>
        <span className='text-xs'> ({downtimeDays} DT days)</span>
        <Tooltip
          id='training-weeks-tooltip'
          place='top-start'
          offset={3}
          variant='info'
          style={{ width: "auto", textAlign: "center", zIndex: 50 }}
          opacity={1}>
          10 weeks - Intelligence Mod ({intMod}) {hasTrainer ? "- 2 (Trainer)" : ""}
        </Tooltip>
      </div>
      <div>
        Total cost:{" "}
        <span className='font-bold text-yellow-400' data-tooltip-id='training-cost-tooltip'>
          {weeksNeeded * 25}gp
        </span>
        <Tooltip
          id='training-cost-tooltip'
          place='top-start'
          offset={3}
          variant='info'
          style={{ width: "auto", textAlign: "center", zIndex: 50 }}
          opacity={1}>
          25gp per week
        </Tooltip>
      </div>
    </div>
  );
};
