const express = require("express");
const ownerController = require("../controllers/owner.controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/user.authentication.middleware");

const ownerRouter = express.Router();

ownerRouter.use(authenticateUser, authorizeRoles("OWNER"));

ownerRouter.get("/dashboard", ownerController.getDashboardStats);
ownerRouter.get("/ratings", ownerController.getRatings);

module.exports = ownerRouter;
