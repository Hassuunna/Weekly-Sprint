var express = require('express')
var router = express.Router()
const fileUpload = require('express-fileupload')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'test'
})

/*
insertNewUser({
        first_name: 'aa',
        last_name: 'ka',
        phone_number: '010'
    })*/
//Inserts a new user in database
function insertNewUser(user) {
    return new Promise((resolve, reject) => {
        let query = "insert into test_form set ?"
        connection.query(query, user, (err, res) => {
            if (err) {
                throw err
            } else {
                console.log("inserted new user")
                resolve(user)
            }
        })
    })
}


router.get('/', (req, res) => {
    res.render("form.hbs", { layout: null })
})
router.post('/', (req, res) => {
    var postBody = req.body;
    console.log('begin\n\n', postBody, '\n\nend');
    insertNewUser(postBody);
    console.log('after insert')
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    res.sendStatus(200);
});

module.exports = router