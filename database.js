const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('muse', 'root', 'breitling',{
    host: 'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(() => {
    console.log('connection established successfully');
})
    .catch(err => {
    console.error('error connecting to database: ', err)
    })

    
module.exports = sequelize