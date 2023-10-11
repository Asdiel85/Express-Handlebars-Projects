const router = require('express').Router();

const homeController = require('./controllers/homeController')
const usersController = require('./controllers/usersController.js')
const animalController = require('./controllers/animalsController')

router.use(homeController);
router.use('/users', usersController)
router.use('/animals', animalController)
router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router;