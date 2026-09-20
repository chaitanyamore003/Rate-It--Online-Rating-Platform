const pool = require("./index");

class RatingRepository {
  // Create a new rating or update the existing rating
  // for the same user and store.
  async upsertRating(userId, storeId, rating) {
    const res = await pool.query(
      `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, store_id)
      DO UPDATE SET
        rating = EXCLUDED.rating,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
      `,
      [userId, storeId, rating],
    );

    // Return the newly inserted or updated rating.
    return res.rows[0];
  }

  // Get all ratings given to a particular store.
  // Also get the name and email of the users who gave those ratings.
  async findByStore(storeId) {
    const res = await pool.query(
      `
      SELECT r.id, r.rating, r.created_at,
             u.name AS user_name,
             u.email AS user_email
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
      ORDER BY r.created_at DESC
      `,
      [storeId],
    );

    // Return all ratings for the store.
    return res.rows;
  }

  // Calculate the average rating for a particular store.
  async getAverageRating(storeId) {
    const res = await pool.query(
      `
      SELECT COALESCE(ROUND(AVG(rating), 2), 0) AS average_rating
      FROM ratings
      WHERE store_id = $1
      `,
      [storeId],
    );

    // PostgreSQL can return numeric values as strings,
    // so convert the result into a JavaScript number.
    return parseFloat(res.rows[0].average_rating);
  }

  async deleteRating(userId, storeId) {
    const res = await pool.query(
      `
    DELETE FROM ratings
    WHERE user_id = $1
      AND store_id = $2
    RETURNING *
    `,
      [userId, storeId],
    );

    return res.rows[0];
  }
}

// Export one instance of the repository.
module.exports = new RatingRepository();
