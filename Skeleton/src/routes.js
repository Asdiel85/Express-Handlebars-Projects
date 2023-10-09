const router = require('express').Router();

const homeController = require('./controllers/homeController')
const usersController = require('./controllers/usersController.js')

router.use(homeController);
router.use('/users', usersController)
router.use('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router;