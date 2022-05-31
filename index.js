import express from 'express';
import bparser from 'body-parser';
const app = express();
import database from './database/database.js'

app.use(bparser.urlencoded({ extended: false }));
app.use(bparser.json());


import charcterRoute from './controllers/userInter.js'
app.use('/userInter', charcterRoute);

import ProductRoute from './controllers/product.js';
app.use('/product', ProductRoute)

import CategoryRoute from './controllers/categoty.js'
app.use('/categoty', CategoryRoute)

const port = 3000;
database.sync()
    .then(results => {
        console.log(results);
        app.listen(port, function () {
            console.log(`${port} Working good!!!`);
        })
    })
    .catch(err => {
        console.log(err);
    })