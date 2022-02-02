const mongoose = require('mongoose');
const User = require('./user').UserModel;


const exerciseSchema = mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: User }
});


const Exercise = mongoose.model('Exercise', exerciseSchema);

exports.ExerciseModel = Exercise;