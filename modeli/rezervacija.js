module.exports = (sequelize, type) => {
    return sequelize.define('rezervacija', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
    })
}