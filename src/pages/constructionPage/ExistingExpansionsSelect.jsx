import Select from "react-select";
import { Tooltip } from "react-tooltip";
import { selectStyle } from "../../utils/Styles";

const ExistingExpansionsSelect = ({
  constructionData,
  existingExpansions,
  setExistingExpansions,
  setTotalSlots,
}) => {
  // Map constructionData to options for react-select
  const expansionOptions = constructionData.map((e) => ({
    value: e.id,
    label: e.name,
    tier: e.tier,
    repeatable: e.repeatable,
  }));

  // Calculate the total slots required based on selected options
  const calculateTotalSlots = (selected) => {
    return selected.reduce((total, option) => {
      const tier = option.tier;
      return total + (tier === 0 ? 1 : tier);
    }, 0);
  };

  const handleChange = (selected) => {
    const updatedExistingExpansions = selected || [];
    const finalExistingExpansions = updatedExistingExpansions.map((option) => {
      // If the option is repeatable, create a unique duplicate
      if (expansionOptions.find((exp) => exp.value === option.value && exp.repeatable)) {
        return {
          ...option,
          value: `${option.value}-${Date.now()}`,
        };
      }
      // Otherwise, return the option as is
      return option;
    });

    setExistingExpansions(finalExistingExpansions);
    const totalSlots = calculateTotalSlots(finalExistingExpansions);
    setTotalSlots(totalSlots);
  };

  return (
    <div className='flex flex-col justify-between gap-4 items-left'>
      <label
        id='existing-structure-amount-label'
        data-tooltip-id='existing-structure-amount-tooltip'
        className='font-medium text-left text-yellow-400 w-fit text-md'>
        Existing Expansions:
      </label>
      <Tooltip
        id='existing-structure-amount-tooltip'
        place='top-start'
        variant='info'
        style={{ width: "auto", textAlign: "center", zIndex: 50 }}
        opacity={1}>
        The sum of existing structures based on all built expansions.
      </Tooltip>
      <Select
        options={expansionOptions}
        isMulti
        isSearchable
        isClearable
        onChange={handleChange}
        value={existingExpansions}
        placeholder='Expansions...'
        className='sm:w-2/3 md:w-full'
        styles={selectStyle}
      />
    </div>
  );
};

export default ExistingExpansionsSelect;
