const router = require('express').Router();

const homeController = require('./controllers/homeController')
const usersController = require('./controllers/usersController')
const gamesController = require('./controllers/gamesController')

router.use(homeController);
router.use('/users', usersController)
router.use('/games', gamesController)
router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router;