module.exports = (app, checkJwt) => {
    const {requiredScopes } = require('express-oauth2-jwt-bearer');
    const router = require("express").Router();
    const profileService = require("../services/profileService");

    const adminScope = requiredScopes('admin');

    router.get("/", profileService.getAllProfiles)
    router.get("/:id", checkJwt, profileService.getProfile)
    router.put("/:id", checkJwt, profileService.updateProfile)
    router.post("/", profileService.createProfile)
    router.delete("/:id", checkJwt, adminScope, profileService.deleteProfile)
    app.use("/api/users", router)
}