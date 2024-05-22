const { connectMySqlDb } = require('../connection');

const getProperty = async (req, res) => {
    console.log("hh")
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

const getPropertyById = async (req, res) => {
    try {
        const db = await connectMySqlDb();
        const propertyId = req.params.id;

        const [rows] = await db.query('SELECT * FROM properties WHERE id = ?', [propertyId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error getting property by ID:', error);
        res.status(500).send('Internal Server Error');
    }
};




const addProperty = async (req, res) => {
    try {
        const { title, description, features,  } = req.body;
        console.log(req.file)
        const db = await connectMySqlDb();
        const propertyImg = req.file ? req.file.filename : null;

        const [tables] = await db.query('SHOW TABLES LIKE "properties"');
        if (tables.length === 0) {
       
            await db.query(`
                CREATE TABLE properties (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    features TEXT,
                    images TEXT
                )
            `);
        }


        await db.query('INSERT INTO properties (title, description, features, images) VALUES (?, ?, ?, ?)', [title, description, features, propertyImg]);

        res.status(201).send('Property added successfully');
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;

        const db = await connectMySqlDb(); // Establish MySQL connection

        // Execute query to delete property
        const [result] = await db.query('DELETE FROM properties WHERE id = ?', [propertyId]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Property not found');
        }

        res.status(200).send('Property deleted successfully');
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const { title, description, features,old_img } = req.body;
         console.log(req.body)    
       let productImage = req.file ? req.file.filename : null;
   let images = "";


   if (productImage != null) {
     images = productImage;
   } else {
     images = old_img;
   }
        const db = await connectMySqlDb(); 

        const [result] = await db.query('UPDATE properties SET title = ?, description = ?, features = ?, images = ? WHERE id = ?', [title, description, features, images, propertyId]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Property not found');
        }

        res.status(200).send('Property updated successfully');
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    addProperty,
    deleteProperty,
    updateProperty,
    getProperty,
    getPropertyById
};
