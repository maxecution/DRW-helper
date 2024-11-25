import { useEffect, useState } from "react";
import Select from "react-select";
import ExpansionDetails from "./ExpansionDetails.jsx";
import ConstructionBasket from "./ConstructionBasket.jsx";
import ArrowButton from "./components/ArrowButton.jsx";

function ConstructionPage() {
  const [constructionData, setConstructionData] = useState([]);
  const [expansion, setExpansion] = useState(null);
  const [addedExpansions, setAddedExpansions] = useState([]);
  const [emptyPlotsAmount, setEmptyPlotsAmount] = useState(0);
  const [existingStructureAmount, setExistingStructureAmount] = useState(0);
  const [unusedSlotsAmount, setUnusedSlotsAmount] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/src/data/expansions.json`)
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

  const handleEmptyPlotsAmountChange = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (!isNaN(value) && value !== "") {
      setEmptyPlotsAmount(value);
    } else {
      setEmptyPlotsAmount(0);
    }
  };

  const handleEmptyPlotsAmountBlur = (e) => {
    if (Number(e.target.value) < 0) {
      window.alert("You cannot enter a negative number.");
      e.target.value = 0;
      setEmptyPlotsAmount(0);
    }
  };

  const handleExistingStructureAmountChange = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (!isNaN(value) && value !== "") {
      setExistingStructureAmount(value);
    } else {
      setExistingStructureAmount(0);
    }
  };

  const handleExistingStructureAmountBlur = (e) => {
    if (Number(e.target.value) < 0) {
      window.alert("You cannot enter a negative number.");
      e.target.value = 0;
      setExistingStructureAmount(0);
    }
  };

  const handleUnusedSlotsAmountChange = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > existingStructureAmount) value = existingStructureAmount;
    if (!isNaN(value) && value !== "") {
      setUnusedSlotsAmount(value);
    } else {
      setUnusedSlotsAmount(0);
    }
  };

  const handleUnusedSlotsAmountBlur = (e) => {
    if (Number(e.target.value) < 0) {
      window.alert("You cannot enter a negative number.");
      e.target.value = 0;
      setUnusedSlotsAmount(0);
    }
    if (Number(e.target.value) > existingStructureAmount) {
      window.alert("You cannot enter a number higher than your existing structures.");
      e.target.value = existingStructureAmount;
      setUnusedSlotsAmount(existingStructureAmount);
    }
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
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      {/* Main Header */}
      <header className='text-center py-6 bg-gray-800 shadow-lg'>
        <h1 className='text-4xl font-bold text-yellow-400'>Housing and Construction Calculator</h1>
      </header>

      {/* Content Section */}
      <div className='flex flex-grow gap-8 p-8'>
        {/* Left Section (1/3 Width) */}
        <div className='w-1/3 space-y-6'>
          <div className='flex items-center justify-between gap-4'>
            <label
              htmlFor='expansion-select'
              className='w-2/3 text-md font-medium text-yellow-400 text-nowrap'>
              Select an expansion:
            </label>
            <Select
              className='text-black w-full'
              id='expansion-select'
              options={expansionOptions}
              value={expansion ? expansionOptions.find((opt) => opt.value === expansion.id) : null}
              onChange={handleExpansionChange}
              isSearchable={true}
              isClearable={true}
              placeholder='Expansions...'
            />
          </div>
          <div className='flex items-center justify-between gap-4'>
            <label
              htmlFor='existing-structure-amount'
              className='w-2/3 text-md font-medium text-yellow-400 text-nowrap text-left'>
              Number of existing structures:
            </label>
            <div className='flex items-center'>
              <ArrowButton
                elementId='existing-structure-amount'
                direction='up'
                onClick={() => setExistingStructureAmount((prev) => prev + 1)}
              />
              <input
                className='border border-gray-600 bg-gray-700 text-white text-right p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                type='number'
                value={existingStructureAmount}
                min={0}
                id='existing-structure-amount'
                onChange={handleExistingStructureAmountChange}
                onBlur={handleExistingStructureAmountBlur}
              />
              <ArrowButton
                elementId='existing-structure-amount'
                direction='down'
                onClick={() => {
                  setExistingStructureAmount((prev) => (prev > 0 ? prev - 1 : prev));
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <label
              htmlFor='unused-slots-amount'
              className='w-2/3 text-md font-medium text-yellow-400 text-nowrap text-left'>
              Number of un-used slots:
            </label>
            <div className='flex items-center'>
              <ArrowButton
                elementId='unused-slots-amount'
                direction='up'
                onClick={() => {
                  setUnusedSlotsAmount((prev) =>
                    prev < existingStructureAmount ? prev + 1 : prev
                  );
                }}
              />
              <input
                className='border border-gray-600 bg-gray-700 text-white text-right p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                type='number'
                value={unusedSlotsAmount}
                min={0}
                max={existingStructureAmount}
                id='unused-slots-amount'
                onChange={handleUnusedSlotsAmountChange}
                onBlur={handleUnusedSlotsAmountBlur}
              />
              <ArrowButton
                elementId='unused-slots-amount'
                direction='down'
                onClick={() => {
                  setUnusedSlotsAmount((prev) => (prev > 0 ? prev - 1 : prev));
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <label
              htmlFor='empty-plots-amount'
              className='w-2/3 text-md font-medium text-yellow-400 text-nowrap text-left'>
              Number of empty plots:
            </label>
            <div className='flex items-center'>
              <ArrowButton
                elementId='empty-plots-amount'
                direction='up'
                onClick={() => setEmptyPlotsAmount((prev) => prev + 1)}
              />
              <input
                className='border border-gray-600 bg-gray-700 text-white text-right p-2 rounded-md w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                type='number'
                value={emptyPlotsAmount}
                min={0}
                id='empty-plots-amount'
                onChange={handleEmptyPlotsAmountChange}
                onBlur={handleEmptyPlotsAmountBlur}
              />
              <ArrowButton
                elementId='empty-plots-amount'
                direction='down'
                onClick={() => {
                  setEmptyPlotsAmount((prev) => (prev > 0 ? prev - 1 : prev));
                }}
              />
            </div>
          </div>
          <div className='items-center'>
            <button
              className='font-bold border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white text-right py-2 px-6 rounded-md'
              onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        {/* Right Section (2/3 Width) */}
        <div className='w-2/3'>
          <ExpansionDetails
            expansion={expansion}
            expansions={addedExpansions}
            onAddExpansion={handleAddExpansion}
          />
        </div>
      </div>

      {/* Construction Basket Section */}
      <div className='bg-gray-800 p-6'>
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
