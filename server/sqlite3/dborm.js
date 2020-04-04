const Sequelize = require('sequelize')
const path=require('path')
const dbpath=path.resolve('sqlite3/mdfiles.db')
// console.log('dbpath',dbpath)

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbpath
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const mdLists = sequelize.define('mdLists', {
    // attributes
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uuid: {
        type: Sequelize.NUMBER,
        allowNull: false
        // allowNull defaults to true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

mdLists.findAll().then(mdLists => {
    console.log("All mdLists:", JSON.stringify(mdLists, null, 4));
  });