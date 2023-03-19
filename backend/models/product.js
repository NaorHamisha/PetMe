const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const productSchema = new mongoose.Schema({
    _id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.Number,
        ref: 'categories'
    }
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
    model: "products",
    field: "_id",
    startAt: 1,
    incrementBy: 1
});

const product = mongoose.model('products', productSchema);
module.exports = product;
