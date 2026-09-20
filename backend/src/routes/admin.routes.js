const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/user.authentication.middleware");
const adminController = require("../controllers/admin.controller");

const adminRouter = express.Router();

adminRouter.use(authenticateUser, authorizeRoles("ADMIN")); // All routes require authentication and admin role

adminRouter.get("/dashboard", adminController.getDashboardStats);
adminRouter.get("/users", adminController.getUsers);
adminRouter.get("/users/:id", adminController.getUserById);
adminRouter.get("/stores", adminController.getStores);

module.exports = adminRouter;
