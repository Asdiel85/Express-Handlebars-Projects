const Game = require('../models/Game');

exports.getAll = () => Game.find().lean();

exports.createGame = (gameData) => Game.create(gameData);

exports.getById = (gameId) => Game.findById(gameId).lean();

exports.buyGame = (gameId, userId) =>
  Game.findByIdAndUpdate(
    gameId,
    { $push: { boughtBy: userId } },
    { new: true }
  );

exports.editGame = (gameId, gameData) =>
  Game.findByIdAndUpdate(gameId, gameData, { runValidators: true, new: true });

  exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);
