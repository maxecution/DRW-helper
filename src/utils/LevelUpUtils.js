export const getLevelUpCost = (level) => {
  if (level >= 20) {
    return level * 3;
  }
  return level * 2;
};

export const getLevelUpCostForRange = (startLevel, endLevel) => {
  let totalCost = 0;
  for (let level = startLevel + 1; level <= endLevel; level++) {
    totalCost += getLevelUpCost(level);
  }
  return totalCost;
};

export const calculateLevelUpDates = (currentLevel, desiredLevel, baseXp, lastLeveledDate) => {
  const today = new Date();
  let availableXp = baseXp;
  let currentDate = new Date(today);
  const dates = [];

  if (lastLeveledDate) {
    const daysSinceLastLevel = Math.floor(
      (today - new Date(lastLeveledDate)) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastLevel < 8) {
      const cooldownRemaining = 8 - daysSinceLastLevel;
      currentDate.setDate(currentDate.getDate() + cooldownRemaining);
    }
  }

  for (let level = currentLevel + 1; level <= desiredLevel; level++) {
    const cost = getLevelUpCost(level);

    while (availableXp < cost) {
      availableXp++;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    availableXp -= cost;
    dates.push({ level, date: new Date(currentDate) });

    currentDate.setDate(currentDate.getDate() + 8);
    availableXp += 7;
  }

  return dates;
};
