const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be atleast two characters long!']
    },
    species: {
        type: String,
        required: [true, 'Species is required!'],
        minLength: [3, 'Species should be atleast three characters long!']
    },
    skinColor: {
        type: String,
        required: [true, 'Skin color is required!'],
        minLength: [3, 'Skin color should be atleast three characters long!']
    },
    eyeColor: {
        type: String,
        required: [true, 'Eye color is required!'],
        minLength: [3, 'Eye color should be atleast three characters long!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^(http|https):\/\//, 'Invalid image url!']
    },
    description: {
        type: String,
        required:[true, 'Description is required!'],
        minLength: [5, 'Description should be atleast three characters long!'],
        maxLength: [500, 'Description should be maximum 500 characters long!']
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature