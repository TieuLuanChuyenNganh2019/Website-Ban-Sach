const express = require('express');
const app = express();

// ROUTES
app.get('/',(req,res) =>{
    res.send('We are number one');
});

// Listening to the sever 
app.listen(3000);