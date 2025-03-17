import { useState, useEffect } from "react";
import { expansionPropTypes, tierInfo } from "../../utils/ExpansionUtils";

function ExpansionDetails({ expansion, expansions, onAddExpansion }) {
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (expansion) {
      if (expansion.repeatable) {
        setBtnDisabled(false);
      } else if (expansions.includes(expansion)) {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    }
  }, [expansion, expansions]);

  if (!expansion) {
    return <p>Please select an expansion to see the details.</p>;
  }
  const { cost, slots } = tierInfo[expansion.tier] || { cost: 0, slots: 1 };

  return (
    <div className='p-6 mx-auto text-white bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-w'>
      <h2 className='mb-4 text-3xl font-semibold text-center text-yellow-400'>{expansion.name}</h2>
      <div className='p-4 mb-4 bg-gray-700 rounded-md'>
        <p className='text-lg'>
          <strong>Tier:</strong> {expansion.tier} | <strong>Cost:</strong> {cost} gp |{" "}
          <strong>Expansion Slots:</strong> {slots}
        </p>
      </div>

      <p className='mb-2 text-lg font-semibold text-left text-yellow-300'>Description:</p>
      <ul className='pl-5'>
        {expansion.description.map((item, index) => (
          <li
            key={index}
            className={`text-base text-left ${item.bold ? "font-bold" : "font-normal"}`}>
            {item.text}
          </li>
        ))}
      </ul>
      <div className='mt-4'>
        <button
          className={`px-4 py-2 text-white rounded-lg ${
            btnDisabled ? "bg-gray-400" : " bg-green-500 hover:bg-green-700"
          }`}
          disabled={btnDisabled}
          onClick={onAddExpansion}>
          Add Expansion
        </button>
      </div>
    </div>
  );
}

ExpansionDetails.propTypes = expansionPropTypes;

export default ExpansionDetails;
