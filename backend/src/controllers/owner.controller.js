const storeRepository = require("../db/store.repository");
const ratingRepository = require("../db/ratings.repository");

const getDashboardStats = async (req, res) => {
  try {
    const store = await storeRepository.findByOwnerId(req.user.id);
    if (!store)
      return res
        .status(404)
        .json({ success: false, message: "No store found for this owner" });

    const ratings = await ratingRepository.findByStore(store.id);
    const averageRating = store.average_rating || 0;

    res.json({
      success: true,
      data: {
        store: { id: store.id, name: store.name },
        stats: {
          averageRating: parseFloat(averageRating),
          totalRatings: ratings.length,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getRatings = async (req, res) => {
  try {
    const store = await storeRepository.findByOwnerId(req.user.id);
    if (!store)
      return res
        .status(404)
        .json({ success: false, message: "No store found for this owner" });

    const ratings = await ratingRepository.findByStore(store.id);
    res.json({ success: true, data: ratings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createOwnerStore = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const ownerId = req.user.id;

    // Check whether this owner already has a store.
    const existingStore = await storeRepository.findByOwnerId(ownerId);

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "You already have a store",
      });
    }

    const store = await storeRepository.create({
      name,
      email,
      address,
      ownerId,
    });

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMyStore = async (req, res) => {
  try {
    const store = await storeRepository.findByOwnerId(req.user.id);

    res.json({
      success: true,
      data: store || null,
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
  getRatings,
  createOwnerStore,
  getMyStore,
};
