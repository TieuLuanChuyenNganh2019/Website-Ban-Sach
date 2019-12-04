// define dependence
const express = require('express');
const router = express.Router();
const publisherController = require('./../controllers/publishers');



router.use((req, res, next) => {
    // authorize here
    next();
});


router.get('/', publisherController.getListPublisher);

router.post('/',publisherController.createPublisher );

router.route('/:publisherId')
    .get(publisherController.getPublisherID)
    .patch(publisherController.updatePublisher )
    .put(publisherController.updatePublisher)
    .delete(publisherController.deletePublisher);

module.exports = router;