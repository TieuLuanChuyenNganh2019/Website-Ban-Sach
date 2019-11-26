// define dependence
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


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


const Book = require('../models/book');
// http://localhost:8080/books
router.get('/', (req, res, next) => {
    Book.find()
        .select('name price _id bookImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                books: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        bookImage: doc.bookImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8080/books/' + doc._id
                        }
                    }
                })
            };
            if (docs.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No Entries Found"
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', upload.single('bookImage'), (req, res, next) => {
    console.log(req.file);
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        bookImage: req.file.path
    });
    book.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created book successfully',
            createdBook: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/books/' + result._id
                }
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .select('name price _id bookImage')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    book: doc,
                    request: {
                        type: 'GET',
                        description: 'Get book',
                        url: 'http://localhost:8080/books/'
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

router.patch('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.updateName] = ops.value;
    }
    Book.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book updated',
                request: {
                    type: 'PATCH',
                    url: 'http://localhost:8080/books/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    Book.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/books/',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;