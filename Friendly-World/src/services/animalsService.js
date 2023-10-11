const Animal = require('../models/Animal')

exports.getAll = () => Animal.find().lean();

exports.getLastThree = () => Animal.find().sort({createdAt: -1}).limit(3).lean();

exports.createAnimal = (animalData) =>  Animal.create(animalData);

exports.getById = (animalId) => Animal.findById(animalId).lean();

exports.donate = (animalId, userId) => Animal.findByIdAndUpdate(animalId, {$push: {donations: userId}});

exports.editAnimal = (animalId, data) => Animal.findByIdAndUpdate(animalId, data, {runValidators: true, new: true})

exports.deleteAnimal = (animalId) => Animal.findByIdAndDelete(animalId);

exports.locationSearch = (location) => Animal.find({location : {
    $regex: location,
    $options: 'i'
}}).lean()

