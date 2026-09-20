const statsRepository = require("../db/stats.repository");
const userRepository = require("../db/users.repository");
const storeRepository = require("../db/store.repository");
const bcrypt = require("bcrypt");

// Get overall statistics for the admin dashboard.
const getDashboardStats = async (req, res) => {
  try {
    const stats = await statsRepository.getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all users with optional search/filter parameters.
const getUsers = async (req, res) => {
  try {
    const users = await userRepository.findMany(req.query);

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get a single user by ID.
const getUserById = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If the user is a store owner, also fetch their store.
    if (user.role === "STORE_OWNER") {
      const store = await storeRepository.findByOwnerId(user.id);

      user.store = store || null;

      if (user.store) {
        user.store.average_rating = parseFloat(user.store.average_rating);
      }
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all stores with optional search/filter parameters.
const getStores = async (req, res) => {
  try {
    const stores = await storeRepository.findMany(req.query);

    // PostgreSQL may return AVG() as a string.
    stores.forEach((row) => {
      row.overall_rating = parseFloat(row.overall_rating);
    });

    res.json({
      success: true,
      data: stores,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  getDashboardStats,
  getUsers,
  getUserById,
  getStores,
};
