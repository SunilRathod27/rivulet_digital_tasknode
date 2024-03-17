require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { onConnectDB } = require('./config/dbConnect');
const port = 5141 || process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cors());
app.use(morgan('dev'));

// STATIC IMAGE FOLDER FOR UI
app.use(express.static('uploadImages'));

//ROUTERS CODE 
app.use('/api', require('./routers/userRoute'));

app.use('/api', require('./routers/categoryRoute'));

app.use('/api', require('./routers/subCategoryRoute'));

app.use('/api', require('./routers/productRoute'));

// DATABASE CODE 
onConnectDB();

// SERVER CREATE CODE

app.listen(port, (err) => {
    if (err) {
        console.log("Error While Create Server ", err);
    }
    else {
        console.log(`SERVER STARTING ON THIS PORT :- ${port}`);
    }
})