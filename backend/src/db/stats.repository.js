const pool = require('./index');

//For Admin Dashboard Stats
class StatsRepository {
  async getDashboardStats() {
    const usersCountRes = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'USER'");
    const storesCountRes = await pool.query('SELECT COUNT(*) FROM stores');
    const ratingsCountRes = await pool.query('SELECT COUNT(*) FROM ratings');

    return {
      totalUsers: parseInt(usersCountRes.rows[0].count, 10),
      totalStores: parseInt(storesCountRes.rows[0].count, 10),
      totalRatings: parseInt(ratingsCountRes.rows[0].count, 10)
    };
  }
}

module.exports = new StatsRepository();
