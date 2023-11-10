module.exports = app => {
    const router = require("express").Router();
    const profileService = require("../services/profileService");

    router.get("/", profileService.getAllProfiles)
    router.get("/:id", profileService.getProfile)
    router.put("/:id", profileService.updateProfile)
    router.post("/", profileService.createProfile)
    router.delete("/:id", profileService.deleteProfile)
    app.use("/api/users", router)
}