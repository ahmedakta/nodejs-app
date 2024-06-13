// **** Load Libraries ****
const express = require('express');
const path = require('path');
const app = express();
const data = require('./users.json');
const fileSystem = require("fs");
app.use('/public' , express.static(path.join(__dirname, 'public'))); // This serves static files from the public directory

// **** Set Layout ****
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

// **** Set view engine to EJS ****
app.set('view engine', 'ejs');
app.set('layout' , './layouts/layout')


// **** Get Data Function ****
app.get(
    '/',
    // callback baslangici
    (req, res) => {
        // fileSystem baslangici
        fileSystem.readFile(__dirname + "/" + "users.json",
            // 2. callback baslagici
            (err, data) => {
                if (err) { return console.error(err.message) };
                obj = JSON.parse(data);

                console.log(data);
                console.log(obj);
                res.render('index', { data: obj , Header : "Users" ,query: ''});

            } // 2. callback sonu
        ) // fileSystem sonu
    } //callback sonu
); // get sonu


// **** Filter function ****
app.get('/search', (req, res) => {
    const query = req.query.query ? req.query.query : '';
    const filteredData = data.filter(item => 
        item.name.includes(query) ||
        item.surname.includes(query) ||
        item.department.includes(query)
    );
    res.render('index', { data: filteredData,Header : 'Users' ,query: req.query.query });
});

// **** Pages Links ****
// Contact Us page 
app.get('/contact', (req, res) => {
    res.render('contact_us');
});

// Listen Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});