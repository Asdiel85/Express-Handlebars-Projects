const Creature = require('../models/Creature');

exports.getAll = () => Creature.find().lean();

exports.create = async (creatureData) => Creature.create(creatureData);

exports.getById = (creatureId) => Creature.findById(creatureId).lean();

exports.vote = (creatureId, userId) =>
  Creature.findByIdAndUpdate(
    creatureId,
    { $push: { votes: userId } },
    { new: true }
  ).lean();

exports.getVotes = (creatureId) =>
  this.getById(creatureId).populate('votes').lean();

exports.edit = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData, {
    runValidators: true,
    new: true,
  });

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);
