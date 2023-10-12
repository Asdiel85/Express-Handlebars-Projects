const gamesService = require('../services/gameService')
const {extractErrorMessages} = require('../utils/errorHelper')

exports.isOwner = async(req, res, next) => {
    const gameId = req.params.id;
    const userId = req.user.id;

    try {
        const game = await gamesService.getById(gameId)
        if(game.owner.toString() === userId) {
            next()
        } else {
            res.redirect(`/games/${gameId}/details`)
        }
    } catch (error) {
        const errorMessage = extractErrorMessages(error);
        res.render('404', {errorMessage})
    }
}