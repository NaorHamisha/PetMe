const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const stockSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.Number,
        ref: 'products'
    },
    quantity: {
        type: Number,
        require: true,
        min: 0
    }
});

autoIncrement.initialize(mongoose.connection);
stockSchema.plugin(autoIncrement.plugin, {
    model: "stock",
    field: "_id",
    startAt: 1,
    incrementBy: 1
});

const stock = mongoose.model('stock', stockSchema);
module.exports = stock;
