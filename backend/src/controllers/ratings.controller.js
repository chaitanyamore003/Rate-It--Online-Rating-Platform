const ratingRepository = require("../db/ratings.repository");

const addRating = async (req, res) => {
  const { store_id, rating } = req.body;
  try {
    const result = await ratingRepository.upsertRating(
      req.user.id,
      store_id,
      rating,
    );
    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit rating" });
  }
};

const updateRating = async (req, res) => {
  const store_id = req.params.id;
  const { rating } = req.body;
  try {
    const result = await ratingRepository.upsertRating(
      req.user.id,
      store_id,
      rating,
    );
    res.json({
      success: true,
      message: "Rating updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addRating,
  updateRating,
};
