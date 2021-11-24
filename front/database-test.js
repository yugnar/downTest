const sqlite3 = require("sqlite3").verbose();

db = new sqlite3.Database("routing.db", createTable);

let people;

function createTable() {
  db.run(
    "CREATE TABLE RoutingTable (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT, full_url TEXT)",
    insertRows
  );
}

function insertRows() {
  console.log("Creating table");
  db.run(
    "INSERT INTO RoutingTable (code, full_url) VALUES ('wasasd', 'http://www.google.com')",
    queryProper
  );
}

// db.serialize(function() {
//     db.run("CREATE TABLE RoutingTable (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT, full_url TEXT)");

//     var stmt = db.prepare("INSERT INTO RoutingTable VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//         console.log(row.id + ": " + row.info);
//     });
//   });

async function queryProper() {
    console.log("Query proper initial");
    db.each("SELECT rowid AS id, code FROM RoutingTable", function(err, row) {
        console.log(row.id + ": " + row.code);
    });
}

db.close();