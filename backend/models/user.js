const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
    _id: {
        type: Number,
        require: true
    },
    uid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: false
    },
    mail: {
        type: String,
        require: false
    },
    phoneNumber: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    role: {
        type: String,
        require: true,
        enum: ["Admin", "Customer"]
    }
});

autoIncrement.initialize(mongoose.connection);

const userPlug = {
    model: "users",
    field: "_id",
    startAt: 1,
    incrementBy: 1
};

userSchema.plugin(autoIncrement.plugin, userPlug);

const User = mongoose.model('User', userSchema);
module.exports = User;