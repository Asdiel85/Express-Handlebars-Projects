const router = require('express').Router();

const animalService = require('../services/animalsService')
const {extractErrorMessages} = require('../utils/errorHelper')

router.get('/', async (req, res) => {
    try {
        const animals = await animalService.getLastThree()
        res.render('home', {animals})
    } catch (error) {
        const errorMessage = extractErrorMessages(error)
        res.render('404', {errorMessage})
    }
})

router.get('/404', (req, res) => {
    res.render('404')
})

module.exports = router