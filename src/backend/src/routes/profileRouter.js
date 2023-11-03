module.exports = app => {
    const router = require("express").Router();
    const profileService = require("../services/profileService");

    router.get("/", profileService.findAllProfiles)
    router.get("/:id", profileService.findProfile)
    // router.get("/:type", workoutService.findAllByType)
    // router.post("/", workoutService.create)
    app.use("/api/users", router)
}