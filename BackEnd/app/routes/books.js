// define dependence
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/book');
// http://localhost:8080/books
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'handing get request to /books'
    });
});

router.post('/', (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    book.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message : 'handing post request to /books',
        createdBook: book
    });
});

router.get('/:bookId', (req, res, next) =>{
    const id = req.params.bookId;
    if(id == 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:bookId', (req, res, next) =>{
    res.status(200).json({
        message: 'Update book'
    });
});

router.delete('/:bookId', (req, res, next) =>{
    res.status(200).json({
        message: 'Delete book'
    });
});
module.exports = router;