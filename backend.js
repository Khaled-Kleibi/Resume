// khaled Kleibi 2040015
console.log("the server is on");

const { request } = require("express");
//create the server
const express = require("express");
const app = express();

//validator
const {check, validationResult} = require("express-validator");
let registerValidate = getFormValidation();


//to read from the body
app.use(express.urlencoded({extended:false}));
//routing
app.use("/", express.static("./"))
app.post("/process",registerValidate, (request,response)=>{
    
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        //there is some issues
        const msg = "<h1>Something went wrong! </h1>";

        response.send(msg);
    }else{
        // no issues
        //read from body
        const fname = request.body.fname;
        const lname = request.body.lname;
        const gender = request.body.gender;
        const email = request.body.email;
        const mobile = request.body.mobile;
        const service = request.body.service;
        const details = request.body.details;


        //save to the database
        addRequist(fname,lname,gender,email,mobile,service,details);
        //inform the user
        const msg = "<h1>thanks, we will get in touch ASAP XD</h1>";
        response.send(msg);
    }    
})

//server
app.listen(8000, () =>{
    console.log("inside listen");
})

//validate the form
function getFormValidation(){
    //resturn the rules as opjects
    return [
        // first name
        check('fname').isLength({min:1, max:100}).withMessage('first name must be 1 to 100 characters')//length
        .isString().withMessage('the first name must be a string')//type
        .matches('[A-Za-z]+').withMessage('ths first name must contain letters only')//format
        .trim().escape(), //cleaning

        // first name
        check('lname').isLength({min:1, max:100}).withMessage('last name must be 1 to 100 characters')//length
        .isString().withMessage('the last name must be a string')//type
        .matches('[A-Za-z]+').withMessage('ths last name must contain letters only')//format
        .trim().escape(), //cleaning

        //gender
        check('gender').custom(val =>{
            const whiteList = ['male','female'];
            if(whiteList.includes(val)) return true;
            return false;
        }).withMessage("the gender must be selected from the list")
        .trim().escape(),

        //mobile
        check('mobile').matches("[0-9]{10}").trim().escape(),
        //email
        check('email').isEmail().withMessage('please write a valid email')
        .trim().escape(),

        //service 
        check('service').custom(val =>{
            const whiteList = ["Website development","Compititve programming training"];
            if(whiteList.includes(val)) return true;
            return false;
        }).withMessage("the service must be selected from the list")
        .trim().escape(),

        //details
        check('details').isLength({min:1, max:2000}).withMessage('username must be 1 to 2000 characters')//length
        .trim().escape() //cleaning,
    ]
}

function addRequist(fname,lname,gender,email,mobile,service,details){
    // database connection
    const mysql = require("mysql2");
    let db = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password:'root',
        port: '3306',
        database: 'assignment2'
    });

    db.connect(function(err){
        //sql commands
        let sql = "INSERT INTO `contact`(`fname`, `lname`, `gender`, `email`, `tel`, `service`, `details`) VALUES ('"+fname+"','"+lname+"','"+gender+"','"+email+"','"+mobile+"','"+service+"','"+details+"')";
        //execute commands
        db.query(sql, function(err,result){
            if (err) throw err;

            //if no errors
            console.log("user have been registerd")
        });
    });
    
}