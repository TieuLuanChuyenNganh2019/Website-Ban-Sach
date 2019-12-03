const Category = require('../models/category');
const mongoose = require('mongoose');

module.exports = {

    
    createCategory :  (req, res, next) => {
        console.log(req.file);
        const category = new Category({
            name: req.body.name
        });
      category.save()
      .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created category successfully',
                createdBook: {
                    category: result,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:8080/categories/' + result._id
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
    getListCategory:  (req, res, next) => {
         Category.find({})
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    books: docs.map(doc => {
                        return {
                            Category: doc,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8080/categories/' + doc._id
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
    getCategoryID:  (req, res, next) => {
        const id = req.params.bookId;
         Category.findById(id)
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json({
                        Category: doc,
                        request: {
                            type: 'GET',
                            description: 'Get',
                            url: 'http://localhost:8080/categories/'
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

    

    

   

    

    
}

