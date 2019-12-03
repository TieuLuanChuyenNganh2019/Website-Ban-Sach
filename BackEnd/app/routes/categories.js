// define dependence
const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categories');



router.use((req, res, next) => {
    // authorize here
    next();
});


router.get('/', categoryController.getListCategory);

router.post('/',categoryController.createCategory );

router.route('/:categoryId')
    .get(categoryController.getCategoryID)
    // .patch(categoryController.updateBook )
    // .put(categoryController.updateBook)
    // .delete(categoryController.deleteBook);

module.exports = router;