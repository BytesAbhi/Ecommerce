const { connectMySqlDb } = require('../connection');

const getProperty = async (req, res) => {
   
    try {
        const db = await connectMySqlDb();


        const [rows] = await db.query('SELECT * FROM properties');
          console.log(rows)
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting properties:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
  
    getProperty,
   
};

