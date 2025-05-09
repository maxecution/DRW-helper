export const handleNumberChange = (newValue, setValue) => {
  // Allow the input field to be temporarily empty
  if (newValue === "") {
    setValue("");
    return;
  }

  let sanitizedValue = newValue.replace(/^0+/, ""); // Remove leading zeros

  // Validate if the input is a positive integer
  if (!/^\d+$/.test(sanitizedValue)) {
    // If it's not a valid positive integer, return without updating
    return;
  }

  // Update the value without enforcing min/max constraints
  setValue(sanitizedValue);
};

export const handleNumberBlur = (value, min, max, setValue) => {
  let num = Number(value);

  // Enforce min and max constraints on blur
  if (isNaN(num) || value === "") {
    num = min; // Default to min if the input is invalid or empty
  } else if (num < min) {
    num = min;
  } else if (num > max) {
    num = max;
  }

  setValue(num);
};

export const handleIncrementDecrement = (change, min, max, setValue) => {
  setValue((prev) => {
    let newValue = prev + change;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    return newValue;
  });
};
