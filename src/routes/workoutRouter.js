module.exports = () => {
    const router = require("express").Router();
    const workoutService = require("../services/workoutService");

    router.get("/", workoutService.getAll)
    // router.get("/:type", workoutService.findAllByType)
    // router.post("/", workoutService.create)
    return router
}

