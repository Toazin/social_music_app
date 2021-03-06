var router = require('express').Router();
var controller = require('./SongController.js');

router.param('id', controller.param);

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

module.exports = router;
