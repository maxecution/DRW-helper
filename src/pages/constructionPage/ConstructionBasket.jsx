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
    <div className='w-full max-w-full sm:max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-600'>
      <h2 className='text-3xl font-semibold mb-4 text-center text-yellow-400'>
        Construction Basket
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-gray-700 rounded-md'>
          <thead>
            <tr className='border-b-4 border-gray-600'>
              <th className='p-2 text-left text-lg font-semibold'>#</th>
              <th className='p-2 text-left text-lg font-semibold'>Name</th>
              <th className='p-2 text-left text-lg font-semibold'>Slots</th>
              <th className='p-2 text-left text-lg font-semibold'>Cost</th>
              <th className='p-2 text-left text-lg font-semibold'></th>
            </tr>
          </thead>
          <tbody>
            {expansions.map((expansion, index) => {
              const { cost, slots } = tierInfo[expansion.tier] || { cost: 0, slots: 1 };

              return (
                <tr key={expansion.id} className='border-b border-gray-600'>
                  <td className='p-2 text-left'>{index + 1}</td>
                  <td className='p-2 text-left'>{expansion.name}</td>
                  <td className='p-3 text-left'>{slots}</td>
                  <td className='p-3 text-left'>{cost} gp</td>
                  <td className='p-2'>
                    <button
                      className='bg-red-600 text-white px-2 py-1 rounded-md font-bold'
                      onClick={() => onRemove(expansion.id)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className='bg-gray-800 text-yellow-400'>
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
      <div className='mt-6 p-4 bg-gray-700 text-white rounded-lg shadow'>
        <h3 className='text-xl font-semibold mb-4 text-yellow-400'>Final Cost Calculation</h3>
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
  emptyPlotsAmount: PropTypes.number.isRequired,
  existingStructureAmount: PropTypes.number.isRequired,
  unusedSlotsAmount: PropTypes.number.isRequired,
};
export default ConstructionBasket;
