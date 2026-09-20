const { body } = require("express-validator");

const addRatingValidation = [
  body("store_id").notEmpty().withMessage("Store ID is required"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

const updateRatingValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

module.exports = {
  addRatingValidation,
  updateRatingValidation,
};
