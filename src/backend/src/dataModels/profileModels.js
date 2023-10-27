const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../config/database")

const ProfileIdentification = sequelize.define("profileIdentification", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
})

const ProfileInterests = sequelize.define("profileInterest", {
    profileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Profile,
            key: "id"
        }
    }
})

const Profile = sequelize.define("profile",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.ENUM,
        values: ["NO INFO", "MALE", "FEMALE", "SOMETHING SPECIAL"]
    },
    weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    height: {
        type: DataTypes.INTEGER
    }
})

Profile.hasOne(ProfileIdentification)
ProfileIdentification.belongsTo(Profile)
ProfileInterests.belongsTo(Profile)
Profile.hasOne(ProfileInterests)

module.exports = {Profile, ProfileIdentification, ProfileInterests}
