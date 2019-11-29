const Book = require('../models/book');
const mongoose = require('mongoose');

module.exports = {

    // Create a Book
    createBook :  (req, res, next) => {
        console.log(req.file);
        const book =  new Book({
            title: req.body.title,
            description: req.body.description,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            price: req.body.price,
            availableQuantity: req.body.availableQuantity,
            bookImage: req.file.path,
            author: req.body.author,
            publisher: req.body.publisher,
            categories: req.body.categories,
            reviews: req.body.revews,
            discount: req.body.discount
        });
        book.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created book successfully',
                createdBook: {
                    title: result.title,
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
    
    },

    // Get List Book
    getListBook:  (req, res, next) => {
        Book.find({})
          //  .select('title description publishDate pageCount price '+
        //    ' availableQuantity bookImage publisher author categories reviews discount')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    books: docs.map(doc => {
                        return {
                            title: doc.title,
                            description: doc.prdescriptionice,
                            publishDate: doc.publishDate,
                            pageCount: doc.pageCount,
                            price: doc.price,
                            availableQuantity: doc.availableQuantity,
                            bookImage: doc.bookImage,
                            publisher: doc.publisher,
              //              author: doc.author,
               //             categories: doc.categories,
                //            reviews: doc.reviews,
                       //     discount: doc.discount,
                            _id: doc.id,
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
    },

    // get book by bookID
    getBookID: (req, res, next) => {
        const id = req.params.bookId;
        Book.findById(id)
           // .select('title price _id bookImage')
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
    
    },

    // delete Book
    deleteBook: (req, res, next) => {
        const id = req.params.bookId;
        Book.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Book deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:8080/books/',
                     //   body: { name: 'String', price: 'Number' }
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },

    // update a book on PATCH
    updateBook: (req, res, next) => {
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
    },

    // Replace book on PUT
    replaceBook: (req, res, next) => {
        const id = req.params.bookId;
        const book = Book(req.body);
        Book.findOneAndUpdate(id,book)
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Book updated-replaced',
                    bookReplaced: result,
                    request: {
                        type: 'PUT',
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
    }
}