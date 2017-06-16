var router = require('express').Router();
var controller = require('./PlaylistController.js');

router.param('id', controller.param);

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

router.route('/addSong/:id')
    .post(controller.addSong)

module.exports = router;
