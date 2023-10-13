const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [4, 'The name should be at least four characters!']
  },
  image: {
    type: String,
    required: [true, 'Image is required!'],
    match: [/^(http|https):\/\//, 'Invalid image url!']
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
    min: [1, 'The price should be a positive number!']
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    minLength: [10, 'The description should be at least ten characters long!']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required!'],
    minLength: [2, 'The genre should be at least two characters long!']
  },
  platform: {
    type: String,
    enum: {
      values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
      message: 'Please chose one of the following platforms: PC, Nintendo, PS4, PS5, XBOX'
    },
    required: [true, 'Platform is required!']
  },
  boughtBy: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
