const Staff = require('../models/staff');
const mongoose = require('mongoose');

module.exports = {

    createStaff: (req, res, next) => {
        const staff = new Staff();

        staff.email = req.body.email;
        staff.username = req.body.username;
        staff.firstname = req.body.firstname;
        staff.lastname = req.body.lastname;
        staff.password = req.body.password;
        staff.admin = req.body.admin;


        Staff.create(staff, (err, staff) => {
            if (err) {
                console.log("Error creating staff: ", err);
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("staff Created: ", staff);
                res
                    .status(201)
                    .json(staff)
            }
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
                        return doc
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
                        book: doc
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
    updateBook: async (req, res, next) => {
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

                    book.save();
                    res.redirect('/books/' + book._id);
                }
            }
        });
    },





}

