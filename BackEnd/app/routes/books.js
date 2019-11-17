// define dependence
const express = require('express');
const router = express.Router();

// http://localhost:8080/books
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'handing get request to /books'
    });
});

router.post('/', (req, res, next) => {
    const book = {
        name: req.body.name,
        price: req.body.price
    };
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