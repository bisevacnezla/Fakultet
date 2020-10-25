module.exports = (sequelize, type) => {
    return sequelize.define('termin', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        redovni: type.BOOLEAN,
        dan: type.INTEGER,
        datum: type.STRING,
        semestar: type.STRING,
        pocetak: type.TIME,
        kraj: type.TIME
    })
}