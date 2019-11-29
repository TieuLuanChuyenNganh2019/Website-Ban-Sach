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
        cb(null, new Date().toDateString() + file.originalname);
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

router.post('/', upload.single('bookImage'), bookController.createBook);

router.route('/:bookId')
    .get(bookController.getBookID)
    .patch(bookController.replaceBook )
    .put(upload.single('bookImage'),bookController.replaceBook)
    .delete(bookController.deleteBook);


module.exports = router;