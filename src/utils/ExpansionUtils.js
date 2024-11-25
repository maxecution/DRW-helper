import PropTypes from "prop-types";

const expansionPropTypes = {
  expansion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tier: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        bold: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }),
};

// Lookup table for cost and expansion slots based on tier
const tierInfo = {
  0: { cost: 0, slots: 1 },
  1: { cost: 500, slots: 1 },
  2: { cost: 1500, slots: 2 },
  3: { cost: 2000, slots: 3 },
  4: { cost: 3000, slots: 4 },
  5: { cost: 4000, slots: 5 },
  6: { cost: 5000, slots: 6 },
  7: { cost: 7000, slots: 7 },
  8: { cost: 8000, slots: 8 },
};

export { expansionPropTypes, tierInfo };
