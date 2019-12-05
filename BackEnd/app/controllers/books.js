const Book = require('../models/book');
const Author = require('./../models/author');
const Category = require('./../models/category');
const Publisher = require('./../models/publisher');
const comment = require('./../models/review');
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

    // add author to book
    addAuthortoBook: (req, res, next) => {

    },
    createBook: (req, res, next) => {

        cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                //req.flash('error', err.message);
                return res.redirect('back');
            }
            const book = new Book();
            // add url for image object book 
            book.imageUrl = result.secure_url;
            // add public id for image object book
            book.imageId = result.public_id;
            // add title for book
            book.title = req.body.title;
            book.description = req.body.description;

            // format date DD/MM/YYYY

            book.publishDate = req.body.publishDate;


            book.pageCount = req.body.pageCount;
            book.price = req.body.price;
            book.availableQuantity = req.body.availableQuantity;

            // add publisher for object book
            // book.publisher = {
            //     id: req.publisher._id
            // }
            // add author for object book

            book.author = req.body.author;
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

            Book.create(book, (err, book) => {
                if (err) {
                    console.log("Error creating Book: ", err);
                    res
                        .status(400)
                        .json(err)
                } else {
                    console.log("Book Created: ", book);
                    res
                        .status(201)
                        .json(book)
                }
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
                // const response = {
                //     books: docs.map(doc => {
                //         return doc
                //     })
                // };
                if (docs.length >= 0) {
                    res.status(200).json(docs);
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
                   return res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "No valid entry found for provided ID" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });

    },

    // Get Comment by ID book
    getCommentBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('reviews');
        console.log('book', book);
        res.status(200).json(book.reviews);
    },

     // Get Author by ID book
     getAuthorBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('author');
        console.log('book', book);
        res.status(200).json(book.author);
    },

    // Get Category by ID book
    getCategoryBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('categories');
        console.log('book', book);
        res.status(200).json(book.categories);
    },

    // Get Category by ID book
    getCategoryBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('categories');
        console.log('book', book);
        res.status(200).json(book.categories);
    },
    // Get book by ID Category
    getBookByCategoryId: async (req, res, next) => {
        const cate = req.params.cateId;
        const book = await Book.find({_id: {$in: cate}}).toArray();
        console.log('book', book);
        res.status(200).json(book.cate);
    },
    // delete Book
    deleteBook: (req, res, next) => {
        Book.findById(req.params.bookId, async (err, book) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            try {
                await cloudinary.v2.uploader.destroy(book.imageId);
                book.remove();
                return res.status(201).json({
                    message: 'Book deleted successfully!!!'
                });
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            }
        });

    },

    // update a book on PATCH
    updateBook: (req, res, next) => {
        const id = req.params.bookId;
        Book.findById(id, async (err, book) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                if (req.file) {
                    try {
                        await cloudinary.v2.uploader.destroy(book.imageId);
                        const result = await cloudinary.v2.uploader.upload(req.file.path);
                        book.imageId = result.public_id;
                        book.imageUrl = result.secure_url;
                    } catch (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    book.title = req.body.title;
                    book.description = req.body.description;
                    book.publishDate = req.body.publishDate;
                    book.pageCount = req.body.pageCount;
                    book.price = req.body.price;
                    book.availableQuantity = req.body.availableQuantity;

                    // add publisher for object book
                    // book.publisher = {
                    //     id: req.publisher._id
                    // }
                    // // add author for object book
                    book.author = req.body.author;


                    book.categories.push(req.body.categories);


                    book.reviews.push(req.body.reviews);
                    // // add discount 
                    // req.body.book.discount = {
                    //     id: req.discount._id
                    // }

                    book.save();
                    //  res.redirect('/books/' + book._id);
                    return res.status(200).json(book);
                }
            }
        });
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

    // Search Book By Category
    searchBookByCategory: (req, res, next) => {
        Book.find({}).populate('Author')
            .exec((err, books) => {
                if (err) {
                    console.log("Error Searching book: ", err);
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    console.log("Book searching successfully: ", books);
                    res
                        .status(201)
                        .json(books)
                }
            });
    }
}

