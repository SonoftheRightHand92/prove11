const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bcrypt = require('bcrypt');
const saltRounds = 10;


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var app = express();
var table = "";

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => res.sendFile('homepage.html', { root: __dirname + "/views/pages"}));

app.get('/homepage.html', (req, res) => res.sendFile('homepage.html', { root: __dirname + "/views/pages"}));

app.get('/finder.html', (req, res) => res.sendFile('finder.html', { root: __dirname + "/views/pages"}));

app.get('/create_account.html', (req, res) => res.sendFile('create_account.html', { root: __dirname + "/views/pages"}));

app.set("port", (process.env.PORT || 5000));

app.get("/remove", remove);

app.get("/add", add);

app.post("/login", function(req, res) {
    console.log("Searching for User Account");

    name = req.body.name;
    password = req.body.password;

    console.log("Name: ", name, "Password: ", password);

    var sql = "SELECT name FROM users";

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database: USERS occured");
            console.log(err);
        }

        console.log("Found database result: " + JSON.stringify(result.rows));

        names = result.rows;

        found = false;
        names.forEach(function (element) {
            if (element.name === name) {
                found = true;
            }
        });

        if (!found) {
            console.log("Invalid User Name");
            res.sendFile('homepage.html', { root: __dirname + "/views/pages"})
            return;
        }
    });
 
    var sql = "SELECT password FROM users WHERE name = '" + name + "'";

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database: USERS occured");
            console.log(err);
        }

        console.log("Found database result: " + JSON.stringify(result.rows));

        passwords = result.rows;

        found = false;
        passwords.forEach(async function (element) {
            console.log("COMPARING: ", password, element.password);
            found = await bcrypt.compare(password, element.password);
            console.log("FOUND: ", found);
            if (found) {
                console.log("Going to next page");
                res.sendFile('finder.html', { root: __dirname + "/views/pages"});
            }
    
            else {
                console.log("Invalid Password");
                res.sendFile('homepage.html', { root: __dirname + "/views/pages"});
            }
        });
    });

});

app.post("/create", async function(req, res) {
    console.log("Creating a new User Account");

    name = req.body.name;
    password = req.body.password;

    hashPassword = await bcrypt.hash(password, saltRounds);

    var sql = "INSERT INTO users (name, password) VALUES ('" + name + "', '" + hashPassword + "')";

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database: USERS occured");
            console.log(err);
        }

        console.log(result.affectedRows);

        res.sendFile('homepage.html', { root: __dirname + "/views/pages"});

    });
});

app.post("/getGames", function(req, res) {
    console.log("getting table");


    table = req.body.consoles;
    console.log("grabbing from table", table);

    var sql = "SELECT * FROM " + table;

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database occured");
            console.log(err);
        }

        console.log("Found database result: " + JSON.stringify(result.rows));

        var games = result.rows;

        res.render('getGames', {games});
    });
});

app.listen(app.get("port"), function () {
    console.log("Now listening for connections on port: ", app.get("port"));
});

function remove(req, res) {
    console.log("Removing a game");

    id = req.query.id;
    console.log("ID is", id);

    console.log("Table is", table);

    var sql = "DELETE FROM " + table + " WHERE id = " + id;

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database occured");
            console.log(err);
        }

        console.log("Number of records deleted: " + result.affectedRows);
    });

    console.log("DONE DELETING NOW SENDING BACK NEW TABLE");

    var sql = "SELECT * FROM " + table;

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database occured");
            console.log(err);
        }

        console.log("Found database result: " + JSON.stringify(result.rows));

        res.json(result.rows);
    });

}

function add(req, res) {
    console.log("Add a game");

    name = req.query.name;
    console.log("Name is", name);

    date = req.query.date;
    console.log("Date is", date);

    var sql = "INSERT INTO " + table + " (game, release) VALUES ('" + name + "', '" + date + "')";

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database occured");
            console.log(err);
        }

        console.log(result.affectedRows);
    });

    console.log("DONE ADDING NOW SENDING BACK NEW TABLE");

    var sql = "SELECT * FROM " + table;

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("error with the database occured");
            console.log(err);
        }

        console.log("Found database result: " + JSON.stringify(result.rows));

        res.json(result.rows);
    });

}