const { INTEGER } = require('sequelize')

const entity = {
    id: {
        type: INTEGER,
        field: 'Id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}

const options = {
    timestamps: false
}

module.exports = { entity, options };
