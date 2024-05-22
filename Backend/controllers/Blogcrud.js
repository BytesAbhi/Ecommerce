const { connectMySqlDb } = require('../connection');

const getBlog = async (req, res) => {
    try {
        const db = await connectMySqlDb();


        const [rows] = await db.query('SELECT * FROM bolg');

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting bolg:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getBlogById = async (req, res) => {
    try {
        const db = await connectMySqlDb();
        const propertyId = req.params.id;

        const [rows] = await db.query('SELECT * FROM bolg WHERE id = ?', [propertyId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error getting property by ID:', error);
        res.status(500).send('Internal Server Error');
    }
};




const addBlog = async (req, res) => {
    try {
        const { title, description,   } = req.body;
        console.log(req.file)
        const db = await connectMySqlDb();
        const [tables] = await db.query('SHOW TABLES LIKE "bolg"');
        if (tables.length === 0) {
         
            await db.query(`
                CREATE TABLE bolg (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    image_url VARCHAR(255)
                )
            `);
        }

        const propertyImg = req.file ? req.file.filename : null;

        await db.query('INSERT INTO bolg (title, description,  image_url) VALUES (?, ?, ?)', [title, description,  propertyImg]);

        res.status(201).send('Property added successfully');
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteBlog = async (req, res) => {
    try {
        const propertyId = req.params.id;

        const db = await connectMySqlDb(); // Establish MySQL connection

        // Execute query to delete property
        const [result] = await db.query('DELETE FROM bolg WHERE id = ?', [propertyId]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Property not found');
        }

        res.status(200).send('Property deleted successfully');
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateBolg = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const { title, description,old_img } = req.body;
         console.log(req.body)    
       let productImage = req.file ? req.file.filename : null;
       let images = "";


   if (productImage != null) {
     images = productImage;
   } else {
     images = old_img;
   }
        const db = await connectMySqlDb(); 

        const [result] = await db.query('UPDATE bolg SET title = ?, description = ?,  image_url = ? WHERE id = ?', [title, description,  images, propertyId]);

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
    addBlog,
    deleteBlog,
    updateBolg,
    getBlog,
    getBlogById
};
