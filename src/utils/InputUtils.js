export const handleNumberChange = (newValue, min, max, setValue) => {
  // Remove any leading zeros and check if the number is a positive integer
  let sanitizedValue = newValue.replace(/^0+/, ""); // Remove leading zeros
  if (sanitizedValue === "") sanitizedValue = "0"; // If empty, default to 0

  // Validate if the input is a positive integer
  if (!/^\d+$/.test(sanitizedValue)) {
    // If it's not a valid positive integer, return the current value
    return;
  }

  let num = Number(sanitizedValue);
  if (isNaN(num)) num = 0;
  if (num < min) num = min;
  if (num > max) num = max;

  // Only update if the value has actually changed to avoid unnecessary re-renders
  if (num !== newValue) {
    setValue(num);
  }
};

export const handleIncrementDecrement = (change, min, max, setValue) => {
  setValue((prev) => {
    let newValue = prev + change;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    return newValue;
  });
};
