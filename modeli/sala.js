module.exports = (sequelize, type) => {
    return sequelize.define('sala', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        naziv: type.STRING,
        
    })
}