const storeRepository = require("../db/store.repository");

const getStores = async (req, res) => {
  try {
    const userId = req.user.id;
    const stores = await storeRepository.findManyWithUserRating(
      userId,
      req.query,
    );
    stores.forEach((row) => {
      row.overall_rating = parseFloat(row.overall_rating);
    });
    res.json({ success: true, data: stores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await storeRepository.findByIdWithUserRating(
      req.params.id,
      req.user.id,
    );
    if (!store)
      return res
        .status(404)
        .json({ success: false, message: "Store not found" });
    store.overall_rating = parseFloat(store.overall_rating);
    res.json({ success: true, data: store });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getStores,
  getStoreById,
};
