const express = require("express");
const ratingsController = require("../controllers/ratings.controller");
const {
  addRatingValidation,
  updateRatingValidation,
} = require("../middleware/validations/ratings.validation.middleware");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/user.authentication.middleware");

const ratingsRouter = express.Router();

ratingsRouter.use(authenticateUser, authorizeRoles("USER"));
ratingsRouter.post("/", addRatingValidation, ratingsController.addRating);
ratingsRouter.put(
  "/:id",
  updateRatingValidation,
  ratingsController.updateRating,
);
ratingsRouter.delete("/:storeId", ratingsController.deleteRating);

module.exports = ratingsRouter;
