import { tierInfo } from "../../utils/ExpansionUtils";
import PropTypes from "prop-types";

function ConstructionBasket({
  expansions,
  onRemove,
  emptyPlotsAmount,
  existingStructureAmount,
  unusedSlotsAmount,
}) {
  // Calculate totals
  const totalExpansionsCost = expansions.reduce(
    (sum, expansion) => sum + (tierInfo[expansion.tier]?.cost || 0),
    0
  );
  const totalSlots = expansions.reduce(
    (sum, expansion) => sum + (tierInfo[expansion.tier]?.slots || 1),
    0
  );
  const totalExpansions = expansions.length;
  const additionalStructuresNeeded = Math.max(totalSlots - unusedSlotsAmount, 0);
  const additionalPlotsNeeded = Math.max(additionalStructuresNeeded - emptyPlotsAmount, 0);
  const calculateStructureCost = (existingCount, additionalCount) => {
    let cost = 0;

    for (let i = 1; i <= additionalCount; i++) {
      const structureNumber = existingCount + i;

      if (structureNumber <= 10) {
        cost += 200;
      } else if (structureNumber <= 20) {
        cost += 500;
      } else {
        cost += 1000;
      }
    }

    return cost;
  };
  const totalStructureCost = calculateStructureCost(
    existingStructureAmount,
    additionalStructuresNeeded
  );
  const totalPlotCost = additionalPlotsNeeded * 400;
  const totalAdditionalCost = totalStructureCost + totalPlotCost;
  const totalBuildTime = additionalStructuresNeeded * 2;

  if (expansions.length === 0) {
    return <p>Please add an expansion to start generating a construction log.</p>;
  }

  return (
    <div className='w-full max-w-full p-6 mx-auto text-white bg-gray-800 border border-gray-600 rounded-lg shadow-xl md:w-2/3'>
      <h2 className='mb-4 text-3xl font-semibold text-center text-yellow-400'>
        Construction Basket
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-gray-700 rounded-md'>
          <thead>
            <tr className='border-b-4 border-gray-600'>
              <th className='p-2 text-lg font-semibold text-left'>#</th>
              <th className='p-2 text-lg font-semibold text-left'>Name</th>
              <th className='p-2 text-lg font-semibold text-left'>Slots</th>
              <th className='p-2 text-lg font-semibold text-left'>Cost</th>
              <th className='p-2 text-lg font-semibold text-left'></th>
            </tr>
          </thead>
          <tbody>
            {expansions.map((expansion, index) => {
              const { cost, slots } = tierInfo[expansion.tier] || { cost: 0, slots: 1 };

              return (
                <tr
                  key={expansion.id}
                  className='text-sm border-b border-gray-600 sm:text-base text-nowrap'>
                  <td className='p-2 text-left'>{index + 1}</td>
                  <td className='p-2 text-left'>{expansion.name}</td>
                  <td className='p-3 text-left'>{slots}</td>
                  <td className='p-3 text-left'>{cost} gp</td>
                  <td className='p-2'>
                    <button
                      className='px-2 py-1 font-bold text-white bg-red-600 rounded-md'
                      onClick={() => onRemove(expansion.id)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className='text-sm text-yellow-400 bg-gray-800 sm:text-base text-nowrap'>
              <td className='p-2 font-semibold text-left'>Total</td>
              <td className='p-2 text-left'>{totalExpansions} Expansion(s)</td>
              <td className='p-3 text-left'>{totalSlots}</td>
              <td className='p-3 text-left'>{totalExpansionsCost} gp</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Final Cost Calculation Section */}
      <div className='p-4 mt-6 text-white bg-gray-700 rounded-lg shadow'>
        <h3 className='mb-4 text-xl font-semibold text-yellow-400'>Final Cost Calculation</h3>
        <ul className='space-y-2'>
          <li>
            <strong>Additional Plots Needed:</strong> {additionalPlotsNeeded} |{" "}
            <strong>Total Plot Cost:</strong> {totalPlotCost} gp
          </li>
          <li>
            <strong>Additional Structures Needed:</strong> {additionalStructuresNeeded} |{" "}
            <strong>Total Structure Cost:</strong> {totalStructureCost} gp
          </li>
          <li className='sm:text-nowrap'>
            <strong>Build Time:</strong> {totalBuildTime} days |{" "}
            <span className='text-yellow-500'>
              <strong>Total Additional Cost:</strong> {totalAdditionalCost + totalExpansionsCost} gp
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

ConstructionBasket.propTypes = {
  expansions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      tier: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  emptyPlotsAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  existingStructureAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unusedSlotsAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
export default ConstructionBasket;
