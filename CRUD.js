const sql = require("./db");
var currentUser = {"first_name": null, "last_name": null, "email": null, "username": null, "password": null};

const createNewUser = function(req,res){
    // Validate request
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const newUser = {
        "first_name": req.body.fName,
        "last_name": req.body.lName,
        "email": req.body.mail,
        "username": req.body.newUsername,
        "password": req.body.newPassword
    };
    sql.query("SELECT * FROM USERS where username like ?", newUser.username + '%' , (err, mysqlres) => {
        if (mysqlres.length>0) {
            console.log("got user by username: " + newUser.username);
            res.status(400).render('SignUp',{SignUpError:"*Username taken, try another one"});
            return;
        }
        else{
            currentUser = newUser;
            sql.query("INSERT INTO USERS SET ?", newUser, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({message: "error in creating user: " + err});
                    return;
                }
                console.log("created user: ", { id: mysqlres.insertId, ...newUser });
                res.redirect('HomePage');
                return;
            });
        }
    }); 
};

const checkLogIn = function(req,res){
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    console.log(req.body.Username);
    sql.query("SELECT * FROM USERS WHERE username = ? AND password = ?", [req.body.Username,req.body.Password], (err, mysqlres) => {
        console.log(mysqlres);
        if(mysqlres.length > 0){
            currentUser = {
                "first_name": mysqlres[0].first_name,
                "last_name": mysqlres[0].last_name,
                "email": mysqlres[0].email,
                "username": mysqlres[0].username,
                "password": mysqlres[0].password
            };
            res.redirect('/HomePage');
            return;
        }
        else{
            console.log("error: ", err);
            res.status(400).render('SignIn',{SignInError:"*Invalid username or password"});
            return;
        }
    });
};

const updateShiftTable = (req,res)=>{
    sql.query("SELECT * FROM SHIFTS WHERE username= ?", currentUser.username , (err, mysqlres)=>{
        if (err) {
            console.log("error in getting all projects " + err);
            res.status(400).send({message:"error in getting all projects " + err})
            return;
        }
        res.render('HomePage', {firstName: currentUser.first_name, shifts: mysqlres});
    });
}

module.exports = {createNewUser, checkLogIn, updateShiftTable};

// const getAllUsers = function(req, res){
//     sql.query("SELECT * FROM USERS", (err, mysqlres) => {
//     if (err) {
//         console.log("error: ", err);
//         res.status(400).send({message: "error in getting all users: " + err});
//         return;
//     }
//     console.log("got all users");
//     res.send(mysqlres);
//     return;
//     });
// };

// const updateUser = (req,res) =>{
//     // check if body is empty
//     if (!req.body) {
//         res.status(400).send({message: "content can not be empty"});
//         return;
//     }
//     const updateUser = {
//         "first_name": req.body.updateFName,
//         "last_name": req.body.updateLName,
//         "email": req.body.updateMail,
//         "username": req.body.updateUsername,
//         "password": req.body.updatePassword
//     };
//     let query = "UPDATE users set email = ? WHERE username = ?";
//     let data = [updateUser.first_name, updateUser.last_name, updateUser.email, updateUser.username, updateUser.password];
//     // execute query
//     sql.query(query, data, (err, results)=>{
//         if (err) {
//             console.log("error is: " + err);
//             res.status(400).send({message: "error in updating user " + err});
//             return;
//         }
//         console.log(results.affectedRows, "rows effected");
//         res.send({message: results.affectedRows + " rows effected"});
//     });
// };

// const findUser = function(req, res) {
//     const username = req.body.newUsername;
//     sql.query("SELECT * FROM USERS where username like ?", username + '%' , (err, mysqlres) => {
//         if (err) {
//             console.log("error: ", err);
//             res.status(400).send({message: "error in getting user by username: " + err});
//             return;
//         }
//         console.log("got user by username" + username);
//         res.status(200).send(mysqlres);
//         return;
//         });
//     };