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
    <div className='max-w mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-600'>
      <h2 className='text-3xl font-semibold mb-4 text-center text-yellow-400'>{expansion.name}</h2>
      <div className='bg-gray-700 p-4 rounded-md mb-4'>
        <p className='text-lg'>
          <strong>Tier:</strong> {expansion.tier} | <strong>Cost:</strong> {cost} gp |{" "}
          <strong>Expansion Slots:</strong> {slots}
        </p>
      </div>

      <p className='text-lg text-left font-semibold text-yellow-300 mb-2'>Description:</p>
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
