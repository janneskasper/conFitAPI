const {Op} = require("sequelize")
const sequelize = require("./database");
const {Profile, ProfileIdentification, ProfileInterests} = require("../dataModels/profileModels")
const Message = require("../dataModels/messageModels")
const Activity = require("../dataModels/activityModels")
const {Exercise, Workout, WorkoutDay, WorkoutProgram} = require("../dataModels/workoutModels")
require("../dataModels/associations")

async function startDb(){
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({force: true}).then(() => {
            console.log("DB Sync was successful!")
        })

    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
}

startDb().then(e => {
//     sequelize.drop().then(e => {
//     console.log("Dropped all tables")
// })
    console.log("DB synced!")
})
// startDb().then(e => {
//
//     createMockData().then(e => {
//         console.log("Mock Data created!!")
//     }).catch(e => {
//         console.error("Mock data failed!")
//     })
//     console.log("DB created!")
// })

async function createMockData(){
    try {
        await createExercises()
        await createWorkouts()
        await createWorkoutDays()
        await createWorkoutPrograms()
    }catch (e) {
        console.error("Error: ", e.message)
    }
}

async function createExercises(){
    for (let i = 0; i < 8; i++) {
        await Exercise.create({
            id: i,
            exerciseType: "type_" + i,
            targetMuscle: "muscle_" + i
        })
    }
}
async function createWorkouts(){
    for (let i = 0; i < 4; i++) {
        await Exercise.findAll({
            where: {
                [Op.and]: [
                    {id: {
                            [Op.gte]: i*2
                        }},
                    {id: {
                            [Op.lte]: i*2+1
                        }}
                ]
            }
        }).then(async exercises => {
            const workout = await Workout.create({
                id: i,
                workoutType: "workout_" + `${i}`
            })
            await workout.addExercises(exercises)
        })
    }
}

async function createWorkoutDays(){
    for (let i = 0; i < 2; i++) {
        await Workout.findAll({
            where: {
                [Op.and]: [
                    {id: {
                        [Op.gte]: i*2
                        }},
                    {id: {
                        [Op.lte]: i*2+1
                        }}
                ]
            }
        }).then(async workouts => {
            console.log("Workouts found; ", workouts)
            const day = await WorkoutDay.create({
                id: i,
                dayId: Math.floor(Math.random() * 7)
            })
            await day.addWorkouts(workouts)
        })
    }
}
async function createWorkoutPrograms(){
    await WorkoutDay.findAll().then(async days => {
        const pr = await WorkoutProgram.create({
            id: 1
        })
        await pr.addWorkoutDays(days)
    })
}
