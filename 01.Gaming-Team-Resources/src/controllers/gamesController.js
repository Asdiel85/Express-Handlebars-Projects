const router = require('express').Router();

const gamesService = require('../services/gameService');
const { extractErrorMessages } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwner } = require('../middlewares/checkOwnershipMiddleware');

router.get('/catalog', async (req, res) => {
  try {
    const games = await gamesService.getAll();
    res.render('games/catalog', { games });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/create', isAuth, (req, res) => {
  res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, image, price, description, genre, platform } = req.body;
  const owner = req.user.id;

  try {
    await gamesService.createGame({
      name,
      image,
      price,
      description,
      genre,
      platform,
      owner,
    });
    res.redirect('/games/catalog');
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('games/create', {
      errorMessage,
      name,
      image,
      price,
      description,
      genre,
      platform,
    });
  }
});

router.get('/:id/details', async (req, res) => {
  try {
    const game = await gamesService.getById(req.params.id);
    const loggedUserId = req.user?.id;

    const isOwner = loggedUserId === game.owner.toString();
    const isBought = !game.boughtBy.some(
      (id) => id.toString() === loggedUserId
    );

    res.render('games/details', { game, isOwner, isBought });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', errorMessage);
  }
});

router.get('/:id/buy', isAuth, async (req, res) => {
  const loggedUserId = req.user.id;
  const gameId = req.params.id;

  try {
    await gamesService.buyGame(gameId, loggedUserId);
    res.redirect(`/games/${gameId}/details`);
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', errorMessage);
  }
});

router.get('/:id/edit', isOwner, async (req, res) => {
  try {
    const { name, image, price, description, genre, platform } =
      await gamesService.getById(req.params.id);
    res.render('games/edit', {
      name,
      image,
      price,
      description,
      genre,
      platform,
    });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', errorMessage);
  }
});

router.post('/:id/edit', isOwner, async (req, res) => {
  const { name, image, price, description, genre, platform } = req.body;
  try {
    await gamesService.editGame(req.params.id, {
      name,
      image,
      price,
      description,
      genre,
      platform,
    });
    res.redirect(`/games/${req.params.id}/details`);
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('games/edit', {
      errorMessage,
      name,
      image,
      price,
      description,
      genre,
      platform,
    });
  }
});

router.get('/:id/delete', isOwner, async (req, res) => {
  try {
    await gamesService.deleteGame(req.params.id);
    res.redirect('/games/catalog');
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', errorMessage);
  }
});

router.get('/search', isAuth, async (req, res) => {
  const {name, platform} = req.query;
  try {
    const games = await gamesService.searchGame(name, platform);
    res.render('games/search', {games})
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', errorMessage);
  }
  
});

module.exports = router;
