
const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const categorySchema = new mongoose.Schema({
    _id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, {
    model: "categories",
    field: "_id",
    startAt: 1,
    incrementBy: 1
});

const category = mongoose.model('categories', categorySchema);
module.exports = category;