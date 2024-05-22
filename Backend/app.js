const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');
// const {connectMoggoDb} = require('./connection.js')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use('/uploads', express.static("uploads"));

const { connectMySqlDb } = require('./connection.js');

connectMySqlDb();

// connectMoggoDb("mongodb+srv://Manshu:Manshu1234@chatapp.bilw5dp.mongodb.net/?retryWrites=true&w=majority&appName=chatapp").then(()=>console.log("connection established"))
app.use('/', routes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
