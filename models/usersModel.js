module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verified: {
            type: DataTypes.INTEGER,
            defaultValue: 1

        },
        deleted: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }

    })

    return Users

}