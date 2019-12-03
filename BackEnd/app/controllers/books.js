const Book = require('../models/book');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

// configuration CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = {

    // Create a Book
    // createBook: async (req, res, next) => {
    //     console.log(req.file);
    //     const book = new Book({
    //         title: req.body.title,
    //         description: req.body.description,
    //         publishDate: new Date(req.body.publishDate),
    //         pageCount: req.body.pageCount,
    //         price: req.body.price,
    //         availableQuantity: req.body.availableQuantity,
    //         bookImage: req.file.path,
    //         //      bookImage: req.body.bookImage,
    //         author: req.body.author,
    //         publisher: req.body.publisher,
    //         categories: req.body.categories,
    //         reviews: req.body.revews,
    //         discount: req.body.discount
    //     });
    //     await book.save().then(result => {
    //         console.log(result);
    //         res.status(201).json({
    //             message: 'Created book successfully',
    //             createdBook: {
    //                 title: result.title,
    //                 price: result.price,
    //                 _id: result._id,
    //                 request: {
    //                     type: 'POST',
    //                     url: 'http://localhost:8080/books/' + result._id
    //                 }
    //             }
    //         });
    //     })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error: err
    //             });
    //         });

    // },

    createBook :  (req, res, next ) =>{
    
        cloudinary.v2.uploader.upload(req.file.path, (err, result) =>{
            if(err) {
                req.flash('error', err.message);
                return res.redirect('back');
            }
            const book = new Book();
            // add url for image object book 
            book.imageUrl= result.secure_url;
            // add public id for image object book
            book.imageId = result.public_id;
            // add title for book
            book.title = req.body.title;
            book.description = req.body.description;
            book.publishDate = req.body.publishDate;
            book.pageCount = req.body.pageCount;
            book.price = req.body.price;
            book.availableQuantity = req.body.availableQuantity;
            book.publisher = req.body.publisher;
            // // add author for object book
            // req.body.book.author = {
            //     id: req.author._id
            // }
            // // add categories 
            // req.body.book.categories = [{
            //     id: req.category._id
            // }]
            // // add reviews 
            // req.body.book.reviews = [{
            //     id: req.review._id
            // }]
            // // add discount 
            // req.body.book.discount = {
            //     id: req.discount._id
            // }
    
            Book.create(book , (err, book) => {
                if(err){
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                res.redirect('/books/' + book._id);
            });
        });
    },

    // Get List Book
    getListBook: async (req, res, next) => {
        await Book.find({})
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
    getBookID: async (req, res, next) => {
        const id = req.params.bookId;
        await Book.findById(id)
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
    deleteBook: async (req, res, next) => {
        const id = req.params.bookId;
        await Book.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Book deleted successfully',
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
    updateBook: async (req, res, next) => {
        const id = req.params.bookId;
        if (req.file) {
            const contentupdate = Book({
                title: req.body.title,
                description: req.body.description,
                publishDate: new Date(req.body.publishDate),
                pageCount: req.body.pageCount,
                price: req.body.price,
                availableQuantity: req.body.availableQuantity,
                bookImage: req.file.path,
                publisher: req.body.publisher,
            });
            await Book.update({ _id: id }, { $set: contentupdate })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: 'Book updated successfully',
                        book: result,
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
        }else {
            const contentupdate = req.body;
            await Book.update({ _id: id }, { $set: contentupdate })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: 'Book updated successfully',
                        book: result,
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
    },

    // Replace book on PUT
    // replaceBook: async (req, res, next) => {
    //     const id = req.params.bookId
    //     const contentbook = req.body;
    //    if(!req.body)
    //    {
    //        return res.status(400).send({
    //            message: 'Content empty'
    //        });
    //    }
    //    Book.findByIdAndUpdate(id, {title: req.body,title}, {new: true})
    //    .then(result => {
    //        if(!result) {
    //            return res.status(404).send({
    //                message: 'Book not found with id' + req.params.bookId
    //            });
    //        }
    //        res.status(200).json({
    //            book: result,
    //            message: 'update successfully'
    //        });
    //    }).catch(err =>{
    //        if(err.kind === 'ObjectId'){
    //            return res.status(404).send({
    //                message: 'Book not found with id' + req.params.bookId
    //            });
    //        }
    //        return res.status(500).send({
    //            message: 'Error updating book with id' + req.params.bookId
    //        });
    //    });
    // }


    //UPDATE BOOK ON PUT
    // replaceBook:  async (req, res, next) => {
    //     const id = req.params.bookId;
    //     if(req.file){
    //         const contentupdate = new Book({
    //             title: req.body.title,
    //             description: req.body.description,
    //             publishDate: new Date(req.body.publishDate),
    //             pageCount: req.body.pageCount,
    //             price: req.body.price,
    //             availableQuantity: req.body.availableQuantity,
    //             bookImage: req.file.path,
    //         //      bookImage: req.body.bookImage,
    //             author: req.body.author,
    //             publisher: req.body.publisher,
    //             categories: req.body.categories,
    //             reviews: req.body.revews,
    //             discount: req.body.discount
    //         });
    //        await Book.update({ _id: id }, { $set: contentupdate })
    //             .exec()
    //             .then(result => {
    //                 res.status(200).json({
    //                     message: 'Book updated successfully',
    //                     book: result,
    //                     request: {
    //                         type: 'PUT',
    //                         url: 'http://localhost:8080/books/' + id
    //                     }
    //                 });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(500).json({
    //                     error: err
    //                 });
    //             });
    //     }else {
    //         const contentupdate = req.body;
    //        await Book.update({ _id: id }, { $set: contentupdate })
    //             .exec()
    //             .then(result => {
    //                 res.status(200).json({
    //                     message: 'Book updated successfully',
    //                     book: result,
    //                     request: {
    //                         type: 'PUT',
    //                         url: 'http://localhost:8080/books/' + id
    //                     }
    //                 });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(500).json({
    //                     error: err
    //                 });
    //             });
    //     }

    // }

    getImage: async (req, res, next) => {
        const filename = req.params.bookId;
        await Book.findById(id)
            .exec()
            .then(doc => {
                const response = {
                    book: doc => {
                        return {
                            Image: doc.bookImage,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8080/books/image/' + doc._id
                            }
                        }
                    }
                }
                if (doc.length >= 0) {
                    res.status(200).json({ response });
                } else {
                    res.status(404).json({ message: "Not found image" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
}

