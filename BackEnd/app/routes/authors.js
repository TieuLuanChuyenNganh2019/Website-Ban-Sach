// define dependence
const express = require('express');
const router = express.Router();
const authorController = require('./../controllers/authors');



router.use((req, res, next) => {
    // authorize here
    next();
});


// router.get('/', authorController.getListAuthor);

router.post('/',  authorController.createAuthor);

// router.route('/:authorId')
//     .get(authorController.getAuthorID)
//     .patch(authorController.updateAuthor )
//     .put(authorController.updateAuthor)
//     .delete(authorController.deleteAuthor);

module.exports = router;