const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const orderSchema = new mongoose.Schema({
    _id: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.Number,
        ref: 'users'
    },
    products: [
        {
        product: {
            type: mongoose.Schema.Types.Number,
            ref: 'products'
        },
        quantity: {
            type: Number,
            require: true,
            min: 0
        }}
    ],
    date: {
        type: Date, 
        require: true,
        default: Date.now
    },
    total: {
        type: Number,
        require: true,
        min: 0
    }
});

autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
    model: "orders",
    field: "_id",
    startAt: 1,
    incrementBy: 1
});
orderSchema.plugin(deepPopulate);

const order = mongoose.model('orders', orderSchema);
module.exports = order;
