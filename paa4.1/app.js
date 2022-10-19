const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request } = require('http');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const { check, validationResult } = require('express-validator');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//flash messages
app.use(session({
    secret:'secret',
    saveUninitialized: false,
    resave: false
}));
app.use(flash());

//external css
app.use('/assets', express.static('assets'));

//mysql connect
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'paa4DB'
});
connection.connect(function(err){
    if(!!err) console.log(err);
    else console.log('Database Connected!');
}); 

app.get('/',(req, res) => {
    res.render('home_index', {
        title : 'AdDU Management System'
    });
});
//////////////////////////////////////////////////////////////  
//show all teachers
app.get('/teachers',(req, res) => {
    let sql = "SELECT * FROM teachers";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('teacher_index', {
            title : 'Teacher Management System',
            teachers : rows,
            message : req.flash('message')
        });
    });
});
//add teacher
app.post('/teachers/save', [
    check('teacher_lname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('teacher_fname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('teacher_mname').isLength({min:1}).matches(/^[A-Za-z\s]+$/)
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        req.flash('message', 'Input must be LETTERS only and should not be EMPTY. Please try again!');
        res.redirect('/teachers');
    }else{
        let data = {teacher_id: req.body.teacher_id, teacher_lname: req.body.teacher_lname,
            teacher_fname: req.body.teacher_fname, teacher_mname: req.body.teacher_mname};
        let sql = "INSERT INTO teachers SET ?";
        let query = connection.query(sql, data,(err, results) => {
          if(err) throw err;
          req.flash('message', 'Teacher "' + req.body.teacher_lname + ', ' + req.body.teacher_fname + ' ' + req.body.teacher_mname + '" successfully added!');
          res.redirect('/teachers');
        });
    }
});
//update teacher
app.post('/teachers/update', [
    check('teacher_lname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('teacher_fname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('teacher_mname').isLength({min:1}).matches(/^[A-Za-z\s]+$/)
],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must be LETTERS only and should not be EMPTY. Please try again!');
        res.redirect('/teachers');
    }else{
        const teacher_id = req.body.teacher_id;
        let sql = "UPDATE TEACHERS SET teacher_lname='"+req.body.teacher_lname+"',  teacher_fname='"+req.body.teacher_fname+"',  teacher_mname='"+req.body.teacher_mname+"' WHERE teacher_id ="+ teacher_id;
        let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Teacher ID: ' + teacher_id +' successfully updated!');
        res.redirect('/teachers');
        });
    }
});
//delete teacher
app.get('/teachers/delete/:teacher_id',(req, res) => {
    const teacher_id = req.params.teacher_id;
    console.log(teacher_id);
    let sql = `DELETE FROM teachers WHERE teacher_id = ${teacher_id}`;
    let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Teacher ID: "' + teacher_id + '" successfully deleted!');
        res.redirect('/teachers');
    });
});
//search teacher
app.get('/teachers/search/', [
    check('term').isLength({min:1}).matches(/^[a-zA-Z0-9 ]+$/),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must not contain SPECIAL CHARACTERS. Fields should not be EMPTY. Please try again!');
        res.redirect('/teachers');
    }else{      
        const { term } = req.query;
        let sql = `SELECT * FROM teachers WHERE teacher_id LIKE '${term}' OR teacher_lname LIKE '${term}' OR teacher_fname LIKE '${term}' OR teacher_mname LIKE '${term}'`;
        let query = connection.query(sql, (err,rows) => {
            if(err) throw err;
            if(rows.length < 1){
                req.flash('message', rows.length + ' result/s for : ' + '"' + term + '"');
                res.render('teacher_index', {
                    title : 'Teacher Management System',
                    teachers : rows,
                    message : req.flash('message')
                });
            }else {
                req.flash('message', rows.length + ' result/s for : ' + '"' + term + '"');
                res.render('teacher_index', {
                    title : 'Teacher Management System',
                    teachers : rows,
                    message : req.flash('message')
                });
            }
        });
    }
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////  
//show all students
app.get('/students',(req, res) => {
    let sql = "SELECT * FROM students";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('student_index', {
            title : 'Student Management System',
            students : rows,
            message : req.flash('message')
        });
    });
});
//add student
app.post('/students/save', [
    check('student_lname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('student_fname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('student_mname').isLength({min:1}).matches(/^[A-Za-z\s]+$/)
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        req.flash('message', 'Input must be LETTERS only and should not be EMPTY. Please try again!');
        res.redirect('/students');
    }else{
        let data = {student_id: req.body.student_id, student_lname: req.body.student_lname,
            student_fname: req.body.student_fname, student_mname: req.body.student_mname};
        let sql = "INSERT INTO students SET ?";
        let query = connection.query(sql, data,(err, results) => {
          if(err) throw err;
          req.flash('message', 'Student "' + req.body.student_lname + ', ' + req.body.student_fname  + ' ' + req.body.student_mname + '" successfully added!');
          res.redirect('/students');
        });
    }
});
//update student
app.post('/students/update',[
    check('student_lname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('student_fname').isLength({min:1}).matches(/^[A-Za-z\s]+$/),
    check('student_mname').isLength({min:1}).matches(/^[A-Za-z\s]+$/)
],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must be LETTERS only and should not be EMPTY. Please try again!');
        res.redirect('/students');
    }else{
        const student_id = req.body.student_id;
        let sql = "UPDATE studentS SET student_lname='"+req.body.student_lname+"',  student_fname='"+req.body.student_fname+"',  student_mname='"+req.body.student_mname+"' WHERE student_id ="+ student_id;
        let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Student ID: "' + student_id + '" successfully updated!');
        res.redirect('/students');
        });
    }
});
//delete student
app.get('/students/delete/:student_id',(req, res) => {
    const student_id = req.params.student_id;
    let sql = `DELETE FROM students WHERE student_id = ${student_id}`;
    let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Student ID: "' + student_id + '" successfully deleted!');
        res.redirect('/students');
    });
});
//search student
app.get('/students/search/', [
    check('term').isLength({min:1}).matches(/^[a-zA-Z0-9 ]+$/),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must not contain SPECIAL CHARACTERS. Fields should not be EMPTY. Please try again!');
        res.redirect('/students');
    }else{ 
        const { term } = req.query;
        let sql = `SELECT * FROM students WHERE student_id LIKE '${term}' OR student_lname LIKE '${term}' OR student_fname LIKE '${term}' OR student_mname LIKE '${term}'`;
        let query = connection.query(sql, (err,rows) => {
            if(err) throw err;
            if(rows.length < 1){
                req.flash('message', rows.length + ' result/s for : ' + '"' + term + '"');
                res.render('student_index', {
                    title : 'Student Management System',
                    students : rows,
                    message : req.flash('message')
                });
            }else {
                req.flash('message', rows.length + ' result/s for : ' + '"' + term + '"');
                res.render('student_index', {
                    title : 'Student Management System',
                    students : rows,
                    message : req.flash('message')
                });
            }
        });
    }
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//show all subjects
app.get('/subjects',(req, res) => {
    let sql = "SELECT * FROM subjects";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('subject_index', {
            title : 'Subject Management System',
            subjects : rows,
            message : req.flash('message')
        });
    });
});
//add subject
app.post('/subjects/save', [
    check('subject_title').isLength({min:1}).matches(/^[A-Za-z -]+$/),
    check('subject_no').isLength({min:1}).matches(/^[a-zA-Z 0-9]+$/),
    check('transcript_load').matches(/^[0-9]+$/),
    check('paying_load').matches(/^[0-9]+$/),
    check('teaching_load').matches(/^[0-9]+$/)
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must be LETTERS only for TITLE, LETTERS AND NUMBERS for NUMBER, and NUMBERS ONLY for LOADS. Fields should not be EMPTY. Please try again!');
        res.redirect('/subjects');
    }else{ 
        let data = {subject_id: req.body.subject_id, subject_title: req.body.subject_title, subject_no: req.body.subject_no, 
            transcript_load: req.body.transcript_load, paying_load: req.body.paying_load, teaching_load: req.body.teaching_load};
        let sql = "INSERT INTO subjects SET ?";
        let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Subject "' + req.body.subject_title + ' - ' + req.body.subject_no + '" successfully added!');
        res.redirect('/subjects');
        });
    }
});
//update subject
app.post('/subjects/update',[
    check('subject_title').isLength({min:1}).matches(/^[A-Za-z -]+$/),
    check('subject_no').isLength({min:1}).matches(/^[a-zA-Z 0-9]+$/),
    check('transcript_load').matches(/^[0-9]+$/),
    check('paying_load').matches(/^[0-9]+$/),
    check('teaching_load').matches(/^[0-9]+$/)
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must be LETTERS only for TITLE, LETTERS AND NUMBERS for NUMBER, and NUMBERS ONLY for LOADS. Fields should not be empty. Please try again!');
        res.redirect('/subjects');
    }else{ 
        const subject_id = req.body.subject_id;
        let sql = "UPDATE subjects SET subject_title='"+req.body.subject_title+"',  subject_no='"+req.body.subject_no+"',  transcript_load='"+req.body.transcript_load+"',\
        paying_load='"+req.body.paying_load+"', teaching_load='"+req.body.teaching_load+"'WHERE subject_id ="+ subject_id;
        let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Subject "' + req.body.subject_title + ' - ' + req.body.subject_no + '" successfully updated!');
        res.redirect('/subjects');
        });
    }
});
//delete subject
app.get('/subjects/delete/:subject_id',(req, res) => {
    const subject_id = req.params.subject_id;
    let sql = `DELETE FROM subjects WHERE subject_id = ${subject_id}`;
    let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', 'Subject ID: "' + subject_id + '" successfully deleted!');
        res.redirect('/subjects');
    });
});
//search subject
app.get('/subjects/search/', [
    check('term').isLength({min:1}).matches(/^[a-zA-Z0-9 ]+$/),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('message', 'Input must not contain SPECIAL CHARACTERS. Fields should not be EMPTY. Please try again!');
        res.redirect('/subjects');
    }else{ 
        const { term } = req.query;
        let sql = `SELECT * FROM subjects WHERE subject_id LIKE '${term}' OR subject_title LIKE '${term}' OR subject_no LIKE '${term}'`;
        let query = connection.query(sql, (err,rows) => {
            if(err) throw err;
            if(rows.length < 1){
                req.flash('message', rows.length + ' result/s for : ' + '"' + term + '"');
                res.render('subject_index', {
                    title : 'Subject Management System',
                    subjects : rows,
                    message : req.flash('message')
                });
            }else {
                req.flash('message', rows.length + ' result/s for : ' + '"' + term + '"');
                res.render('subject_index', {
                    title : 'Subject Management System',
                    subjects : rows,
                    message : req.flash('message')
                });
            }
        });
    }
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

//server check
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
//
