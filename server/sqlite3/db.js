const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbpath = path.resolve('server/sqlite3/mdfiles.db')
// console.log('dbpath',dbpath)

const connDB = async () => {
    let db;
    const rs = await new Promise((resolve, reject) => {
        db = new sqlite3.Database(dbpath, (err) => {
            if (err) {
                console.error('SQLite Open Error', err.message);
                reject(-1)
            }
            console.log('SQLite Connected!');
            resolve(1)
        });
    }).catch(rs=>rs)
    return rs>0 ? db : undefined
}

/* db.serialize(() => {
    db.each(`SELECT *
             FROM mdLists`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log('row', row.date, row.uuid, row.name);

    });
}); */

const insertDB = (db) => {

}

const updateDB = (db) => {

}

const findDB = (db) => {

}


const closeDB = (db) => {
    db.close((err) => {
        if (err) {
            console.error('SQLite Close Error', err.message);
        }
        console.log('SQLite Closed!');
    });
}

module.exports = {
    connDB,
    closeDB,
    findDB,
    insertDB,
    updateDB,
}