module.exports = () => {
    const router = require("express").Router();
    const workoutService = require("../services/workoutService");

    router.get("/", workoutService.findAll)
    // router.get("/:type", workoutService.findAllByType)
    // router.post("/", workoutService.create)
    return router
}

