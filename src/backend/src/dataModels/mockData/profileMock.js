const {Profile, ProfileIdentification, ProfileSetting} = require("../models/profileModels")
require("../associations")
const {randomIntInRange} = require("../../utils/utils")
const {GENDER_ENUM_LIST, UNIT_ENUM_LIST, PRIVACY_ENUM_LIST} = require("../enums")

async function createProfiles(){
    for (let i = 0; i < 20; i+=2) {
        await Profile.create({
            id: i,
            firstName: "firstName_" + i,
            lastName: "lastName_" + i,
            birthday: Date.now(),
            gender: GENDER_ENUM_LIST[randomIntInRange(0, GENDER_ENUM_LIST.length-1)],
            weight: [randomIntInRange(50, 100)],
            height: randomIntInRange(150, 200),
            profileIdentification: {
                username: "username_" + i,
                password: "password_" + i,
                email: "email_" + i
            },
            profileSetting: {
                unit: UNIT_ENUM_LIST[randomIntInRange(0, UNIT_ENUM_LIST.length-1)],
                profilePrivacy: PRIVACY_ENUM_LIST[randomIntInRange(0, PRIVACY_ENUM_LIST.length-1)]
            }
        }, {
            include: [ProfileIdentification, ProfileSetting]
        })
    }
}

module.exports = createProfiles