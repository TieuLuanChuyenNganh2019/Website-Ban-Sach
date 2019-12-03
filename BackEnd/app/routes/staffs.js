// define dependence
const express = require('express');
const router = express.Router();
const Staff = require('./../models/staff');
const staffController = require('./../controllers/staffs');




router.use((req, res, next) => {
    // authorize here
    next();
});





// http://localhost:8080/books

// router.get('/', staffController.getListBook);

router.post('/', (req, res, next) => {
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
} );

// router.route('/:bookId')
//     .get(bookController.getBookID)
//     .patch(upload.single('image'),bookController.updateBook )
//     .put(upload.single('image'),bookController.updateBook)
//     .delete(bookController.deleteBook);

module.exports = router;