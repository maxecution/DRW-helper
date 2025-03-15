import { Tooltip } from "react-tooltip";

const CapacityTooltip = ({ label, value, multiplier, tooltipId }) => (
  <p>
    <span>{label}: </span>
    <span className='text-yellow-400 font-bold' data-tooltip-id={tooltipId}>
      {value} lb.
    </span>
    <Tooltip
      id={tooltipId}
      place='top-start'
      offset={3}
      variant='info'
      className='z-50'
      opacity={1}>
      Strength Score ({value / multiplier}) x {multiplier} lb.
    </Tooltip>
  </p>
);

export const CapacityDisplay = ({ strScore, carryingMultiplier }) => {
  if (carryingMultiplier === 0) {
    return (
      <div className='space-y-1'>
        <p>
          <span>Carry Capacity: </span>
          <span className='text-yellow-400 font-bold'>-</span>
        </p>
        <p>
          <span>Drag/Lift/Push Capacity: </span>
          <span className='text-yellow-400 font-bold'>-</span>
        </p>
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
      <span className='text-yellow-400 font-bold' data-tooltip-id='suffocating-tooltip'>
        {holdTime}
      </span>
      <Tooltip
        id='suffocating-tooltip'
        place='top-start'
        offset={3}
        variant='info'
        className='z-50'
        opacity={1}>
        {rounds} rounds; 1 + Constitution Mod ({conMod}), min. 30 seconds
      </Tooltip>
    </span>
  );
};
