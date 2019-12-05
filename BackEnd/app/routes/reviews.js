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

router.route('/:reviewId')
    .get(reviewController.getReviewId)
//    .patch(reviewController.updateReview )
 //   .put(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;