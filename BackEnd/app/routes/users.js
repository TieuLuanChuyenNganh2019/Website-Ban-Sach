const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const helper = require('../utils/helper');
const { PagingResult } = require('./../utils/base_response');

router.use((req, res, next) => {
  // authorize here
  next();
 });

 // fill user apis here
router.get('/', (req, res) => {
  let page = 0;
  if (req.query.p) page = parseInt(req.query.p);
  let pageSize = 20;
  if (req.query.s) pageSize = parseInt(req.query.s);
  let queryString = '';
  if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
  let sortColumn = 'email';
  let sortDirection = 'ASC';
  if (req.query.so) {
      const sortStr = decodeURIComponent(req.query.so).split(' ');
      sortColumn = sortStr[0];
      if (sortStr.length == 2) sortDirection = sortStr[1];
  }
  const offset = page * pageSize;
  if (queryString.length <= 2) {
      User.count().then(numRow => {
          const totalRows = numRow;
          const totalPages = Math.ceil(totalRows/pageSize);
          User.findAll({
              order: [[sortColumn, sortDirection]],
              offset: offset, 
              limit: pageSize,               
          }).then(users => {
              return res.json(PagingResult(users, {
                  pageNumber: page,
                  pageSize: pageSize,
                  totalRows: totalRows,
                  totalPages: totalPages
              }))
          }); 
      });
  }else { // search
      // conditions
      const whereClause = {
          [Op.or]: [
             { email: { [Op.like]: queryString } },
             { password: { [Op.like]: queryString } }
            
          ]
      };
      user.count({ where: whereClause }).then(numRow => {
          const totalRows = numRow;
          const totalPages = Math.ceil(totalRows/pageSize);
          User.findAll({
              where: whereClause,
              order: [[sortColumn, sortDirection]],
              offset: offset, 
              limit: pageSize
          }).then(users => {
              return res.json(PagingResult(users, {
                  pageNumber: page,
                  pageSize: pageSize,
                  totalRows: totalRows,
                  totalPages: totalPages
              }))
          }); 
      });
  }
});

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
      });
      }
    });
});


router.post('/login', (req,res,next) => {
  User.find({ email: req.body.email})
  .exec()
  .then(user => {
    if(user.length < 1)
    {
      return res.status(404).json({
        message: 'Mail not found, authentication  failed'
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err,  result) => {
      if(err){
        return res.status(401).json({
          message: 'Authentication failed'
        });
      }
      if(result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, process.env.JWT_KEY,
       {
         expiresIn: "2h"
       }
        );
        return res.status(200).json({
          message: 'Authentication successful',
          _id: user[0]._id,
          email: user[0].email,
          password: user[0].password,
          token: token
        });
      }
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    })

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
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