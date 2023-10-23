const express = require("express");
const router = express.Router();
const workoutService = require("../services/workoutService");

router.get("/", async function(req, res, next) {
    try {
        res.json(await workoutService.getAll())
    } catch (error) {
        console.error("Error when getting workouts: ", error.message)
        next(error)
    }
})


module.exports = {
    router
}
