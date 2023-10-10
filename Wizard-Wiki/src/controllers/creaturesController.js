const router = require('express').Router();

const creatureService = require('../services/creaturesService');
const userService = require('../services/usersService');
const { extractErrorMessages } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
  try {
    const data = await creatureService.getAll();
    res.render('creatures/all-posts', { data });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/create', isAuth, (req, res) => {
  res.render('creatures/create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const owner = req.user.id;

  try {
    await creatureService.create({
      name,
      species,
      skinColor,
      eyeColor,
      image,
      description,
      owner,
    });
    res.redirect('/creatures/catalog');
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('creatures/create', {
      errorMessage,
      name,
      species,
      skinColor,
      eyeColor,
      image,
      description,
    });
  }
});

router.get('/:id/details', async (req, res) => {
  const creatureId = req.params.id;

  try {
    const creature = await creatureService.getVotes(creatureId);

    const owner = await userService.getById(creature.owner);
    const ownersFullName = `${owner.firstName} ${owner.lastName}`;

    const isOwner = req.user?.id === creature.owner.toString();
    const isVoted = !creature.votes.some(
      (user) => user.email === req.user?.email
    );

    const emails = creature.votes.map((user) => user.email);
    const votesCount = emails.length;
    const haveVotes = votesCount > 0;
    const emailsText = emails.join(', ');

    res.render('creatures/details', {
      creature,
      ownersFullName,
      isOwner,
      isVoted,
      votesCount,
      haveVotes,
      emailsText,
    });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/:id/vote', isAuth, async (req, res) => {
  const creatureId = req.params.id;
  const userId = req.user.id;
  const creature = await creatureService.vote(creatureId, userId);
  res.redirect(`/creatures/${req.params.id}/details`);
});

router.get('/:id/edit', isAuth, async (req, res) => {
  const creature = await creatureService.getById(req.params.id);

  res.render('creatures/edit', { creature });
});

router.post('/:id/edit', isAuth, async (req, res) => {
  const id = req.params.id;
  const { name, species, skinColor, eyeColor, image, description } = req.body;

  try {
    await creatureService.edit(id, { name, species, skinColor, eyeColor, image, description });
    res.redirect(`/creatures/${id}/details`);
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('creatures/create', {
      errorMessage,
      name,
      species,
      skinColor,
      eyeColor,
      image,
      description,
    });
  }
});

router.get('/:id/delete', isAuth, async (req, res) => {
  const creatureId = req.params.id;
  const userId = req.user.id;

  await creatureService.delete(creatureId);
  res.redirect('/creatures/catalog')
})

module.exports = router;
