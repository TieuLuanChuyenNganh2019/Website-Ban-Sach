// define dependence
const express = require('express');
const router = express.Router();
const reviewController = require('./../controllers/reviews');



router.use((req, res, next) => {
    // authorize here
    next();
});


router.get('/', reviewController.getListReview);
router.post('/',  reviewController.createReview);

// router.route('/:authorId')
//     .get(authorController.getAuthorID)
//     .patch(authorController.updateAuthor )
//     .put(authorController.updateAuthor)
//     .delete(authorController.deleteAuthor);

module.exports = router;