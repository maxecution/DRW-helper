export const selectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#374151",
    color: "#ffffff",
    borderColor: "#1f2937",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1f2937",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#1f2937" : "#374151",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#4b5563",
    },
  }),
};
