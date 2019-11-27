// define denpendence
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// content 
const app = express();
const bookRoutes = require('./app/routes/books');
const orderRoutes = require('./app/routes/orders')
const userRoutes = require('./app/routes/users');
const jwt = require('./app/middleware/auth')


// connect to mongoose Atlase
// change password ==> change nodemon.json
mongoose.connect(//'mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@sellingbook-vj42r.mongodb.net/test?retryWrites=true&w=majority',
'mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@sellingbook-shard-00-00-vj42r.mongodb.net:27017,sellingbook-shard-00-01-vj42r.mongodb.net:27017,sellingbook-shard-00-02-vj42r.mongodb.net:27017/test?ssl=true&replicaSet=SellingBook-shard-0&authSource=admin&retryWrites=true&w=majority',
                    {
                        useUnifiedTopology: true,
                        useNewUrlParser: true,
                    }
);

// Authentication 
 app.use(auth);
//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
// ROUTES Request
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);
app.use('/users',userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// set up bodyparser
//app.use(bodyParser.urlencoded)

module.exports = app;