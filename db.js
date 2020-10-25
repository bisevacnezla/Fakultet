const Sequelize = require('sequelize')
const OsobljeModel = require('./modeli/osoblje')
const SalaModel = require('./modeli/sala')
const RezervacijaModel = require('./modeli/rezervacija')
const TerminModel = require('./modeli/termin')

const sequelize = new Sequelize('DBWT19', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


const Osoblje       = OsobljeModel(sequelize, Sequelize)
const Sala          = SalaModel(sequelize, Sequelize)
const Rezervacija   = RezervacijaModel(sequelize, Sequelize)
const Termin        = TerminModel(sequelize, Sequelize)


Osoblje.hasOne(Sala, {foreignKey: {name: 'zaduzenaOsoba', type: Sequelize.INTEGER, unique: 'compositeIndex'}});
Sala.belongsTo(Osoblje, {foreignKey: {name: 'zaduzenaOsoba', type: Sequelize.INTEGER, unique: 'compositeIndex'}}); //

Rezervacija.belongsTo(Osoblje)
Rezervacija.belongsTo(Sala)

Sala.hasMany(Rezervacija) //
Osoblje.hasMany(Rezervacija)
Termin.hasOne(Rezervacija, {foreignKey: {name: 'terminId', type: Sequelize.INTEGER, unique: 'compositeIndex'}});
Rezervacija.belongsTo(Termin, {foreignKey:{ name:'terminId', type: Sequelize.INTEGER , unique: 'compositeIndex'}})



sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    })



module.exports = {
    Osoblje,
    Sala,
    Rezervacija,
    Termin
}