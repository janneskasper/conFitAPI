module.exports = app => {
    const router = require("express").Router();
    const workoutService = require("../services/workoutService");

    router.get("/:type", workoutService.findAllByType)
    router.get("/", workoutService.findAll)
    router.post("/", workoutService.create)
    app.use("/api/workout", router)
}

