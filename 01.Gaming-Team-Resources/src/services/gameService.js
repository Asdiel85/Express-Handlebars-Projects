const Game = require('../models/Game');

exports.getAll = () => Game.find().lean()

exports.createGame = (gameData) => Game.create(gameData);