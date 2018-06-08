var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var mysql = require('mysql')
    //var app = express();

var feedback_connection = mysql.createConnection({
    host: "talent4.ckjt6njuljwt.us-west-2.rds.amazonaws.com",
    user: "ahmed",
    password: "ahmedsooty4",
    database: "talent4"
})

//Inserts a new course in database
function insertNewCourse(course) {
    return new Promise((resolve, reject) => {
        let query = "insert into feedback_courses set ?"
        feedback_connection.query(query, course, (err, res) => {
            if (err) {
                throw err
            } else {
                console.log("inserted new course")
                resolve(course)
            }
        })
    })
}


/*insertNewCourse({
    course_name: 'course_name',
    competency: 'competency',
    start_date: '2/2/2018',
    end_date: '3/2/2018',
    result: 'result',
    comment: 'comment',
    feedback_lecturer: 'feedback_lecturer',
    feedback_course: 'feedback_course',
    feedback_institute: 'feedback_institute',
    staff_name: 'staff_name',
    assigned_by: 'assigned_by',
    cost: '12',
    institute_name: 'institute_name'

})
*/

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/manage', (req, res) => {
    res.render("feed/feedback_courses.hbs", { layout: null })
})
router.post('/manage', (req, res) => {
    var postBody = req.body;
    console.log('begin\n\n', postBody, '\n\nend');
    insertNewCourse(postBody)
    res.sendStatus(200);
});

module.exports = router