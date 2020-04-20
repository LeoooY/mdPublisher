const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite')
/* 
    Api
    https://www.npmjs.com/package/sqlite 
*/

const path = require('path')
const dbpath = path.resolve('server/sqlite3/mdfiles.db')
/* console.log('dbpath',dbpath) */

const connDB = async () => {
    try {
        const db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        })
        return db;
    } catch (err) {
        return;
    }
}

const closeDB = async (db) => {
    try {
        await db.close()
        return 1;
    } catch (err) {
        return;
    }
}

module.exports = {
    connDB,
    closeDB,
}