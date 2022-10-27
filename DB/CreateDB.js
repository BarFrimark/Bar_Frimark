var sql = require('./db')
var query = "";

const createTables = (req,res)=> {
    query = "CREATE TABLE USERS (first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, PRIMARY KEY (username))";
    sql.query(query,(err,mysqlres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log("created users table");
        query = "CREATE TABLE SHIFTS (username VARCHAR(50) NOT NULL, date DATE NOT NULL, start_time TIME DEFAULT NULL, end_time TIME DEFAULT NULL, total_time TIME AS (TIMEDIFF(end_time, start_time)) STORED, PRIMARY KEY (username, date), FOREIGN KEY (username) REFERENCES users(username))";
        sql.query(query,(err,mysqlres)=>{
            if (err) {
                console.log("error ", err);
                res.status(400).send({message: "error in creating shifts table"});
                return;
            }
            console.log("created shifts table");
            return;
        })
        res.send("tables created");
        return;
    })      
};

const insertData = (req,res)=>{
    query = "INSERT INTO USERS (first_name, last_name, email, username, password) VALUES ?";
    var values = [
        ['bar', 'bar lev', 'bar@gmail.com', 'bary', '123456Aa'],
        ['mey', 'tal', 'mey@gmail.com', 'meyTal111', 'meyTal111']
    ];
    sql.query(query, [values], (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on creating user" + err});
            console.log("error on creating users" + err);
            return;            
        }
        console.log("users inserted");
        query = "INSERT INTO SHIFTS (username, date, start_time, end_time) VALUES ?";
        values = [
            ['bary','2022-11-01','08:03:27','16:30:05'],
            ['bary','2022-11-02','08:50:07','17:04:50'],
            ['bary','2022-11-03','08:15:03','16:05:08'],
            ['bary','2022-11-04','09:00:23','12:00:50'],
            ['bary','2022-11-06','08:00:08','16:45:20'],
            ['bary','2022-11-07','08:06:20','17:00:15'],
            ['bary','2022-11-08','08:18:27','16:33:05'],
            ['bary','2022-11-09','08:40:07','17:18:50'],
            ['bary','2022-11-10','08:15:03','16:05:08'],
            ['bary','2022-11-11','09:15:03','13:00:04'],
            ['meyTal111','2022-11-01','08:00:08','16:45:20'],
            ['meyTal111','2022-11-02','08:04:20','17:00:15'],
            ['meyTal111','2022-11-03','09:00:23','16:55:50'],
            ['meyTal111','2022-11-04','09:15:03','13:00:04'],
            ['meyTal111','2022-11-06','08:15:03','16:05:08'],
            ['meyTal111','2022-11-07','08:00:08','16:47:30'],
            ['meyTal111','2022-11-08','08:04:20','17:00:15'],
            ['meyTal111','2022-11-09','08:12:27','16:56:05'],
            ['meyTal111','2022-11-10','08:50:07','17:04:50'],
            ['meyTal111','2022-11-11','08:15:03','12:05:08'],
            ['meyTal111','2022-11-13','08:06:20','17:00:15']
        ];
        sql.query(query, [values], (err, mysqlres)=>{
            if (err) {
                res.status(400).send({message: "error on creating user" + err});
                console.log("error on creating shifts" + err);
                return;            
            }
            console.log("shifts inserted");
            return;
        });
        res.send("tables inserted");
        return;
    });
};

const showUsers = (req,res)=>{
    query = "SELECT * FROM USERS";
    sql.query(query, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing users ", err);
            res.send("error in showing users ");
            return;
        }
        console.log("showing users");
        res.send(mysqlres);
        return;
    })
};

const showShifts = (req,res)=>{
    query = "SELECT * FROM SHIFTS";
    sql.query(query, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing shifts ", err);
            res.send("error in showing shifts ");
            return;
        }
        console.log("showing shifts");
        res.send(mysqlres);
        return;
    })
};


const dropTables = (req, res)=>{
    query = "DROP TABLE SHIFTS";
    sql.query(query, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping shifts table ", err);
            res.status(400).send({message: "error on dropping shifts table" + err});
            return;
        }
        console.log("shifts table drpped");
        query = "DROP TABLE USERS";
        sql.query(query, (err, mysqlres)=>{
            if (err) {
                console.log("error in droping users table ", err);
                res.status(400).send({message: "error on dropping users table" + err});
                return;
            }
            console.log("users table drpped");
            res.send("all tables drpped");
            return;
        })
        return;
    })
}

module.exports = {createTables, insertData, showUsers, showShifts, dropTables};