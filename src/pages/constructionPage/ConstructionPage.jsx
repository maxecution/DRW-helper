import { useEffect, useState } from "react";
import Select from "react-select";
import ExpansionDetails from "./ExpansionDetails.jsx";
import ConstructionBasket from "./ConstructionBasket.jsx";
import ExistingExpansionsSelect from "./ExistingExpansionsSelect.jsx";
import UnusedSlotsInput from "./UnusedSlotsInput.jsx";
import EmptyPlotsInput from "./EmptyPlotsInput.jsx";
import { selectStyle } from "../../utils/Styles.js";

function ConstructionPage() {
  const [constructionData, setConstructionData] = useState([]);
  const [expansion, setExpansion] = useState(null);
  const [existingExpansions, setExistingExpansions] = useState([]);

  const [addedExpansions, setAddedExpansions] = useState([]);
  const [emptyPlotsAmount, setEmptyPlotsAmount] = useState(0);
  const [existingStructureAmount, setExistingStructureAmount] = useState(0);
  const [unusedSlotsAmount, setUnusedSlotsAmount] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}expansions.json`)
      .then((response) => response.json())
      .then((data) => setConstructionData(data));
  }, []);

  const expansionOptions = constructionData.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  const handleExpansionChange = (selectedOption) => {
    if (selectedOption === null) {
      setExpansion(null);
      return;
    }

    const selectedExpansion = constructionData.find((e) => e.id === selectedOption.value);
    setExpansion(selectedExpansion);
  };

  const handleClear = () => {
    setEmptyPlotsAmount(0);
    setExistingStructureAmount(0);
    setUnusedSlotsAmount(0);
    setExpansion(null);
    setAddedExpansions([]);
  };

  const handleAddExpansion = () => {
    if (expansion) {
      setAddedExpansions((prevExpansions) => [...prevExpansions, expansion]);
    }
  };

  const handleRemoveExpansion = (id) => {
    setAddedExpansions(addedExpansions.filter((exp) => exp.id !== id));
  };

  return (
    <div className='flex flex-col w-full max-w-full min-h-screen text-white bg-gray-900'>
      {/* Main Header */}
      <header className='py-6 text-center bg-gray-800 shadow-lg'>
        <h1 className='text-2xl font-bold text-yellow-400 sm:text-3xl md:text-4xl'>
          Housing and Construction Calculator
        </h1>
      </header>

      {/* Content Section */}
      <div className='flex flex-col gap-8 p-4 md:flex-row sm:p-6 md:p-8'>
        {/* Left Section (1/3 Width) */}
        <div className='w-full space-y-6 md:w-1/3'>
          {/* Expansion Selector */}
          <div className='flex flex-col justify-between gap-4 items-left'>
            <label
              htmlFor='expansion-select'
              className='w-full font-medium text-left text-yellow-400 text-md'>
              New expansion:
            </label>
            <Select
              id='expansion-select'
              options={expansionOptions}
              value={expansion ? expansionOptions.find((opt) => opt.value === expansion.id) : null}
              onChange={handleExpansionChange}
              isSearchable={true}
              isClearable={true}
              placeholder='Expansions...'
              styles={selectStyle}
              className='sm:w-2/3 md:w-full'
            />
          </div>
          <ExistingExpansionsSelect
            constructionData={constructionData}
            existingExpansions={existingExpansions}
            setExistingExpansions={setExistingExpansions}
            setTotalSlots={setExistingStructureAmount}
          />
          {/* Unused Slots */}
          <UnusedSlotsInput value={unusedSlotsAmount} setValue={setUnusedSlotsAmount} />
          {/* Empty Plots */}
          <EmptyPlotsInput value={emptyPlotsAmount} setValue={setEmptyPlotsAmount} />
          {/* Clear Button */}
          <div className='items-center text-center'>
            <button
              className='px-6 py-2 font-bold text-white bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600'
              onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        {/* Right Section (2/3 Width) */}
        <div className='w-full text-center md:w-2/3'>
          <ExpansionDetails
            expansion={expansion}
            expansions={addedExpansions}
            existingExpansions={existingExpansions}
            onAddExpansion={handleAddExpansion}
          />
        </div>
      </div>

      {/* Construction Basket Section */}
      <div className='w-full p-6 text-center bg-gray-800'>
        <ConstructionBasket
          expansions={addedExpansions}
          onRemove={handleRemoveExpansion}
          emptyPlotsAmount={emptyPlotsAmount}
          existingStructureAmount={existingStructureAmount}
          unusedSlotsAmount={unusedSlotsAmount}
        />
      </div>
    </div>
  );
}

export default ConstructionPage;
