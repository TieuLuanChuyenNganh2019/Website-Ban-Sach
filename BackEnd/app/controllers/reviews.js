const Review = require('./../models/review');
const Book = require('./../models/book');
const mongoose = require('mongoose');

module.exports = {

    getListReview: (req, res, next) => {
        Review.find({})
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    reviews: docs.map(doc => {
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

    createReview: (req, res, next) => {
        Book.findById(req.body.id, (err, book) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                const review = new Review();
                review.review = req.body.review;
                review.comment = req.body.comment;
                Review.create(review, (err, review) => {
                    if (err) {
                        console.log("Error creating Review: ", err);
                        res
                            .status(400)
                            .json(err)
                    } else {
                        review.save();
                        book.reviews.push(review);
                        book.save();
                        console.log("Review Created: ", review);
                        res
                            .status(201)
                            .json(review)
                    }
                });

            }
        });

    },

    getAuthorID: (req, res, next) => {
        const id = req.params.authorId;
        Author.findById(id)
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json({
                        author: doc,
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

    updateAuthor: (req, res, next) => {
        const authorid = req.params.authorId;
        const author = new Author();
        author.name = req.body.name;
        author.firstname = req.body.firstname;
        author.lastname = req.body.lastname;
        Author.findByIdAndUpdate(req.params.authorId, { $set: req.body }, { new: true }, (err, author) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                return res.status(200).json({
                    message: 'Author updated',
                    author: author
                });
            }
        });
    },


    deleteAuthor: (req, res, next) => {
        const id = req.params.authorId;
        Author.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Author deleted',
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