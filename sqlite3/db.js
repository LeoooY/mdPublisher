const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.mdfiles.db', (err) => {
    if (err) {
        console.error('SQLite Open Error', err.message);
    }
    console.log('SQLite Connected!');
    // const sql = `SELECT * FROM mdfilesinfo`;
    // db.all(sql, [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     rows.forEach((row) => {
    //         console.log(row.name);
    //     });
    // });
});

db.serialize(() => {
    // db.run("CREATE TABLE mdinfo (info TEXT)");
    var stmt = db.prepare("INSERT INTO mdinfo VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each(`SELECT *
             FROM mdinfo`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log('row0');
        console.log('row', row);
        // row.id + "\t" + row.date
    });
});



db.close((err) => {
    if (err) {
        console.error('SQLite Close Error', err.message);
    }
    console.log('SQLite Closed!');
});