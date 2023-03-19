const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const cartSchema = new mongoose.Schema({
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
            }
        }
    ]
});

autoIncrement.initialize(mongoose.connection);
cartSchema.plugin(autoIncrement.plugin, {
    model: "carts",
    field: "_id",
    startAt: 1,
    incrementBy: 1
});

cartSchema.plugin(deepPopulate);

const cart = mongoose.model('carts', cartSchema);
module.exports = cart;
