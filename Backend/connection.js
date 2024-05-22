
const mysql = require('mysql2/promise');


const connectMySqlDb = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'realestate'
    });
  };

  const getUserByVerificationToken = async (token) => {
    try {
      const connection = await connectMySqlDb.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM users WHERE verification_token = ?', [token]);
      connection.release();
      return rows[0]; 
    } catch (error) {
      console.error('Error fetching user by verification token:', error);
      throw error;
    }
  };
  
  const updateUserVerificationStatus = async (userId, isVerified) => {
    try {
      const connection = await connectMySqlDb.getConnection();
      await connection.query('UPDATE users SET is_verified = ? WHERE id = ?', [isVerified, userId]);
      connection.release();
    } catch (error) {
      console.error('Error updating user verification status:', error);
      throw error;
    }
  };

module.exports = {
    connectMySqlDb,
    getUserByVerificationToken,
    updateUserVerificationStatus
};
