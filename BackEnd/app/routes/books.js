// define dependence
const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('./../controllers/books');



router.use((req, res, next) => {
    // authorize here
    next();
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// http://localhost:8080/books

router.get('/', bookController.getListBook);

router.post('/', upload.single('image'), bookController.createBook);

router.route('/:bookId')
    .get(bookController.getBookID)
    .patch(upload.single('image'), bookController.updateBook)
    .put(upload.single('image'), bookController.updateBook)
    .delete(bookController.deleteBook);

// delete comment in review
router.route('/:bookId/:reviewId')
    .delete(bookController.deleteReview); 

// get reviews by id book
router.route('/:bookId/reviews')
    .get(bookController.getCommentBybookId);

// get name author by id book
router.route('/:bookId/author')
    .get(bookController.getAuthorBybookId);

// get category by id book
router.route('/:bookId/cate')
    .get(bookController.getCategoryBybookId);

// get book by id category
router.route('/:cateId/category')
    .get(bookController.getBookByCategoryId);

module.exports = router;