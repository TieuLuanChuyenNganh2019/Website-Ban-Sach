const Author = require('./../models/author');
const Book = require('./../models/book');
const mongoose = require('mongoose');

module.exports = {

    getListAuthor: (req, res, next) => {
        Author.find({})
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    authors: docs.map(doc => {
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

    createAuthor: (req, res, next) => {
        const author = new Author();
        author.name = req.body.name;
        author.firstname = req.body.firstname;
        author.lastname = req.body.lastname;
        Author.create(author, (err, author) => {
            if (err) {
                console.log("Error creating Author: ", err);
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("Author Created: ", author);
                res
                    .status(201)
                    .json(author)
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
        const id = req.params.authorId;
        const author = new Author();
        author.name = req.body.name;
        author.firstname = req.body.firstname;
        author.lastname = req.body.lastname;
        Author.update({ _id: id }, { $set: author })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Author updated',
                    author: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },

    
    deleteAuthor: (req, res, next) => {
        const id = req.params.authorId;
        Book.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Author deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:8080/authors/',
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
    }
}