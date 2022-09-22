require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
// import the cors
const cors = require('cors');
// import routers
const router = require('./routes/baseRoutes');

const app = express();

// register view engine (ejs)
app.set('view engine', 'ejs');

// giving api access to only this url
var coroptions = {
    origin: 'http://localhost'
}


// set the middleware
app.use(cors(coroptions));
// used when you want to grab data from a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// middleware to make some files available especially static files
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routers
app.use('', router)

// render 404 page if no router was matched
app.use((req, res) => {
    res.status(404).render('404');
});


const PORT = process.env.PORT || 3001
// listen for request
app.listen(PORT);
console.log(PORT)
