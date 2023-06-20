// we can use "npm start" here to run the server(i.e. index.js file), we do this by adding our own start script in package.json file, "start" : "node index.js"

// for the above start script we need restart our server for every change we make, a better way is to use nodemon which automatically starts the server upon any change
// "start": "nodemon index.js"


// const express = require('express'); // outdated way
import express from 'express'; // latest es6 concept; for this to work properly we've to add an additional   "type": "module" in package.json file
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';


import Connection from './database/db.js'; // in the case of backend it is necessary to also write the extension with the filename, i.e. not just db,but db.js
import DefaultData from './default.js';
import Router from './routes/route.js';


const app = express(); // initializing express as a function

// The dotenv.config() function is typically used in a Node.js application to load environment variables from a .env file into the process.env object. The .env file is a simple text file that contains key-value pairs of environment variables in the format NAME=VALUE, with each variable on a new line.
// By calling dotenv.config(), the environment variables defined in the .env file are made available to your Node.js application through the process.env object. This allows you to easily access environment variables in your code using process.env.VARIABLE_NAME.
dotenv.config();
// Calling dotenv.config() at the beginning of your application code. You can now access the environment variables defined in the .env file using process.env.VARIABLE_NAME

const PORT = 8000;



app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/', Router);



const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


Connection(USERNAME,PASSWORD); // calling the Connection function
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

DefaultData();


export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'atharvarai@gmail.com',
paytmParams['MOBILE_NO'] = '1234567890';