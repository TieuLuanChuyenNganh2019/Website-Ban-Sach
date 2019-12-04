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

router.route('/:bookId')
    .get(categoryController.getCategoryID)
    .patch(categoryController.updateCategory )
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;