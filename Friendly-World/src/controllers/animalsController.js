const router = require('express').Router();

const animalService = require('../services/animalsService');
const { extractErrorMessages } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.get('/dashboard', async (req, res) => {
  try {
    const animals = await animalService.getAll();
    res.render('animals/dashboard', { animals });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/create', isAuth, (req, res) => {
  res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, years, kind, image, need, description, location } = req.body;
  const owner = req.user.id;

  try {
    await animalService.createAnimal({
      name,
      years,
      kind,
      image,
      need,
      description,
      location,
      owner,
    });
    res.redirect('/animals/dashboard');
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('animals/create', {
      errorMessage,
      name,
      years,
      kind,
      image,
      need,
      description,
      location,
    });
  }
});

router.get('/:id/details', async (req, res) => {
  try {
    const animalId = req.params.id;
    const animal = await animalService.getById(animalId);

    const isOwner = animal.owner.toString() === req.user?.id;

    const notVoted = !animal.donations.some(
      (id) => id.toString() === req.user?.id
    );

    res.render('animals/details', { animal, isOwner, notVoted });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/:id/donate', isAuth, async (req, res) => {
  try {
    const animalId = req.params.id;
    const animal = await animalService.getById(animalId);

    const userId = req.user.id;
    await animalService.donate(animalId, userId);

    res.redirect(`/animals/${animalId}/details`);
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/:id/edit', isAuth, async (req, res) => {
  try {
    const animalId = req.params.id;
    const { name, years, kind, image, need, description, location } =
      await animalService.getById(animalId);
    res.render('animals/edit', {
      name,
      years,
      kind,
      image,
      need,
      description,
      location,
    });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.post('/:id/edit', isAuth, async (req, res) => {
  const { name, years, kind, image, need, description, location } = req.body;

  try {
    await animalService.editAnimal(req.params.id, {
      name,
      years,
      kind,
      image,
      need,
      description,
      location,
    });
    res.redirect(`/animals/${req.params.id}/details`);
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('animals/edit', {
      errorMessage,
      name,
      years,
      kind,
      image,
      need,
      description,
      location,
    });
  }
});

router.get('/:id/delete', isAuth, async (req, res) => {
  try {
    await animalService.deleteAnimal(req.params.id);
    res.redirect('/animals/dashboard');
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/search', isAuth, async (req, res) => {
  const { location } = req.query;
  if (location) {
    try {
      const animals = await animalService.locationSearch(location);
      console.log(location);
      res.render('animals/search', { animals, location });
    } catch (error) {
      const errorMessage = extractErrorMessages(error);
      res.render('animals/search', { errorMessage });
    }
  } else {
    res.render('animals/search', {location})
  }
});

module.exports = router;
