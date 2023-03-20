const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsController = require('./controllers/productsController');
const usersController = require('./controllers/usersController');
const categoryController = require('./controllers/categoryController');
const orderController = require('./controllers/orderController');
const stockController = require('./controllers/stockController');
const cartController = require('./controllers/cartController');

const app = express();

const mongoUrl = "mongodb://localhost:27017/PetStore";

mongoose.set('strictQuery', false);

mongoose.connect(mongoUrl, {useNewUrlParser: true})
        .then(() => {
            console.log(`Mongo connection started to: ${mongoUrl}`);
         })
        .catch((err) => {
            console.log('connection error:' + err);
         });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());   

app.use('/products', productsController);
app.use('/categories', categoryController);
app.use('/orders', orderController);
app.use('/stocks', stockController);
app.use('/carts', cartController);
app.use('/users', usersController);

app.listen(3005, () => {
    console.log('listening on port 3005!');
});