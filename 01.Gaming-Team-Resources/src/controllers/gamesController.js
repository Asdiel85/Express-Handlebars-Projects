const router = require('express').Router()

const gameService = require('../services/gameService');
const { extractErrorMessages } = require('../utils/errorHelper');

router.get('/catalog', async (req, res) => {
  try {
    const games = await gameService.getAll();
    res.render('games/catalog', { games });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404')
  }
});

router.get('/create', (req, res) => {
  res.render('games/create')
})

router.post('/create', async (req, res) => {
  const {name, image, price, description, genre, platform, } = req.body;
  const owner = req.user.id;
  try {
    await gameService.createGame({name, image, price, description, genre, platform, owner })
    res.redirect('/games/catalog')
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('games/create', {errorMessage, name, image, price, description, genre, platform})
  }
})

module.exports = router;