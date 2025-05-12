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

export const handleDateChange = (newValue, setValue) => {
  // Allow the input field to be temporarily empty
  if (newValue === "") {
    setValue("");
    return;
  }

  // Validate if the input is in the format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(newValue)) {
    // If it's not a valid date format, return without updating
    return;
  }

  // Update the value if it matches the date format
  setValue(newValue);
};

export const handleDateBlur = (value, setValue) => {
  // If the input is empty, reset to today's date
  if (value === "") {
    setValue(new Date().toISOString().split("T")[0]); // Set to today's date in YYYY-MM-DD format
    return;
  }

  // Parse the input date
  const inputDate = new Date(value);

  // Validate the date
  if (isNaN(inputDate.getTime())) {
    setValue(new Date().toISOString().split("T")[0]); // Set to today's date if invalid
  } else {
    setValue(value); // Keep the valid date
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
