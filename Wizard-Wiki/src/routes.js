const router = require('express').Router();

const homeController = require('./controllers/homeController')
const usersController = require('./controllers/usersController.js')
const creaturesController = require('./controllers/creaturesController')

router.use(homeController);
router.use('/users', usersController)
router.use('/creatures', creaturesController)
router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router;