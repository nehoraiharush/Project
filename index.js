import express from 'express';
import bparser from 'body-parser';
const app = express();



app.use(bparser.urlencoded());
app.use(bparser.json());



import charcterRoute from './controllers/userInter.js';
app.use('/usersInter', charcterRoute);


const port = 3005;
app.listen(port, function () {
    console.log(`${port} Working good!!!`);
})