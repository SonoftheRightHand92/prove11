const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

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

app.get('/', (req, res) => res.sendFile('finder.html', { root: __dirname + "/views/pages"}));

app.set("port", (process.env.PORT || 5000));

app.get("/remove", remove);

app.get("/add", add);

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