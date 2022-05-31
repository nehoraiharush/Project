import express from 'express';
import bparser from 'body-parser';
const app = express();



app.use(bparser.urlencoded({ extended: false }));
app.use(bparser.json());



import charcterRoute from './controllers/userInter.js'
app.use('/userInter', charcterRoute);


const port = 3000;
app.listen(port, function () {
    console.log(`${port} Working good!!!`);
})