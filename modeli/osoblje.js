module.exports = (sequelize, type) => {
    return sequelize.define('osoblje', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ime: type.STRING,
        prezime: type.STRING,
        uloga: type.STRING,
        
    })
}