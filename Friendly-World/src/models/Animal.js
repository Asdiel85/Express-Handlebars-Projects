const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      minLength: [2, 'Name should be atleast two characters long!']
    },
    years: {
      type: Number,
      required: [true, 'Years are required!'],
      min: [1, 'Years should be minimum 1!'],
      max: [100, 'Years should be maximum 100!'],
      validate: {
        validator: Number.isInteger,
        message: `{VALUE} is not a number!`
      }
    },
    kind: {
      type: String,
      required: [true, 'Kind is required!'],
      minLength: [3, 'Kind should be atleast three characters long!']
    },
    image: {
      type: String,
      required: [true, 'Image is required!'],
      match: [/^(http|https):\/\//, 'Invalid image url!']
    },
    need: {
      type: String,
      required: [true, 'Need is required!'],
      minLength: [3, 'The need should be atleast three characters long!'],
      maxLength: [100, 'The need should be atles hundred characters long!']
    },
    location: {
      type: String,
      required: [true, 'Location is required!'],
      minLength: [5, 'The location should be at least five characters long!'],
      maxLength: [15, 'The location should be at least fifteen characters long!']
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      minLength: [5, 'The description should be at least five characters long!'],
      maxLength: [50, 'The description should be at least fifty characters long!']
    },
    donations: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
