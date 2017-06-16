var router = require('express').Router();
var controller = require('./ProfileController.js');

router.param('id', controller.param);

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

router.route('/addFavoriteSong/:id')
    .post(controller.addFavoriteSong);

router.route('/addFriend/:id')
    .post(controller.addFriend);

router.route('/addPlaylist/:id')
    .post(controller.addPlaylist);
module.exports = router;
