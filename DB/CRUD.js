const sql = require("./db");
var currentUser = {"first_name": null, "last_name": null, "email": null, "username": null, "password": null};

const createNewUser = function(req,res){
    if(!req.body){
        res.status(400).render('Error', {var1: "ERROR 400", var2: "content cannot be empty"});
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
        if (mysqlres.length > 0) {
            console.log("got user by username: " + newUser.username);
            res.status(400).render('SignUp',{SignUpError:"*Username taken, try another one"});
            return;
        }
        else{
            currentUser = newUser;
            sql.query("INSERT INTO USERS SET ?", newUser, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).render('Error', {var1: "ERROR 400", var2: "error in creating user: " + err});
                    return;
                }
                console.log("created user: ", {newUser});
                res.redirect('HomePage');
                return;
            });
        }
    }); 
};

const checkLogIn = function(req,res){
    if(!req.body){
        res.status(400).render('Error', {var1: "ERROR 400", var2: "content cannot be empty"});
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

const HomePageUpload = (req,res)=>{
    sql.query("SELECT * FROM SHIFTS WHERE username= ?", currentUser.username , (err, mysqlres)=>{
        if (err) {
            console.log("error in getting shifts " + err);
            res.status(400).render('Error', {var1: "ERROR 400", var2: "error in getting shifts " + err});
            return;
        }
        var time = new Date().getHours();
        let greeting;
        if (time > 5 && time < 12) {
            greeting = "Good morning";} 
        else if (time >= 12 && time < 21) {
            greeting = "Good Day";} 
        else {
            greeting = "Good night";}
        let name = currentUser.first_name;  
        let fullGreeting = greeting +" "+ name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        let bColor;
        let bValue;
        if(mysqlres.length == 0 || mysqlres[mysqlres.length-1].end_time != null){
            bColor = '#009F3D';
            bValue = 'Start New Shift';
        }
        else{
            bColor = '#DF0024';
            bValue = 'End This Shift';
        }
        res.render('HomePage', {greet: fullGreeting, shifts: mysqlres, bColor:bColor, bValue:bValue});
    });
}

const startEndShift = (req,res)=>{
    var dateTime = new Date();
    sql.query("SELECT * FROM SHIFTS WHERE username= ?", currentUser.username , (err, mysqlres)=>{
        if (err) {
            console.log("error in getting shifts " + err);
            res.status(400).render('Error', {var1: "ERROR 400", var2: "error in getting shifts " + err});
            return;
        }
        else if(mysqlres.length == 0 || mysqlres[mysqlres.length-1].end_time != null){
            const newShift = {
                "username": currentUser.username,
                "date": dateTime.toISOString().substring(0, 10),
                "start_time": dateTime.toLocaleTimeString()
            };
            sql.query("INSERT INTO SHIFTS SET ?", newShift , (err, mysqlres)=>{
                if (err) {
                    console.log("error: ", err);
                    res.status(400).render('Error', {var1: "ERROR 400", var2: "eerror in creating shift: " + err});
                    return;
                }
                console.log("created shift: ", {newShift});
                res.redirect('HomePage');
                return;
            });
        }
        else{
            const end_time = dateTime.toLocaleTimeString();
            const date = dateTime.toISOString().substring(0, 10);
            const query = "UPDATE SHIFTS SET end_time = ? WHERE username = ? AND date = ?;"
            sql.query(query, [end_time, currentUser.username, date] , (err, mysqlres)=>{
                if (err) {
                    console.log("error: ", err);
                    res.status(400).render('Error', {var1: "ERROR 400", var2: "error in updating the end of the shift: " + err});
                    return;
                }
                console.log("shift ended in: ", {end_time});
                res.redirect('HomePage');
                return;
            });
        }
    });
}

const updateUserUpload = (req,res)=>{
    res.render('UserDetails', 
    {   firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email,
        password: currentUser.password
    })
}

const updateUser = function(req,res){
    if(!req.body){
        res.status(400).render('Error', {var1: "ERROR 400", var2: "content cannot be empty"});
        return;
    }
    const UpdatedUser = {
        "first_name": req.body.firstName,
        "last_name": req.body.lastName,
        "email": req.body.email,
        "username": currentUser.username,
        "password": req.body.updatedPassword
    };
    sql.query("UPDATE USERS SET ? WHERE username = ? ", [UpdatedUser,currentUser.username]  , (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).render('Error', {var1: "ERROR 400", var2: "error in updating user: " + err});
            return;
        }
        currentUser = UpdatedUser;
        console.log("updated user: ", {UpdatedUser});
        res.render('UserDetails', 
        {   firstName: currentUser.first_name,
            lastName: currentUser.last_name,
            email: currentUser.email,
            password: currentUser.password,
            updated: "The user has been updated successfully",
            mColor: "green"
        })
        return;
    }); 
};

const deleteUser = function(req,res){
    sql.query("DELETE FROM SHIFTS WHERE username = ?", currentUser.username , (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).render('Error', {var1: "ERROR 400", var2: "error in deleting user's shifts: " + err});
            return;
        }
        sql.query("DELETE FROM USERS WHERE username = ? ", currentUser.username , (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).render('Error', {var1: "ERROR 400", var2: "error in deleting the user: " + err});
                return;
            }
            console.log("user: "+ currentUser.username + " deleted");
            currentUser = {"first_name": null, "last_name": null, "email": null, "username": null, "password": null};
            res.redirect('/');
            return;
        });
    });
}

module.exports = {createNewUser, checkLogIn, HomePageUpload, startEndShift, updateUserUpload, updateUser, deleteUser};
