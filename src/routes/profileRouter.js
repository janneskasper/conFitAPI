module.exports = (checkJwt) => {
    const {requiredScopes } = require('express-oauth2-jwt-bearer');
    const router = require("express").Router();
    const profileService = require("../services/profileService");

    const adminScope = requiredScopes('admin');

    router.get("/", profileService.getAllProfiles)
    router.get("/:id", checkJwt, profileService.getProfile)
    router.put("/edit/:id", checkJwt, profileService.updateProfile)
    router.post("/create", profileService.createProfile)
    router.delete("/delete/:id", checkJwt, adminScope, profileService.deleteProfile)

    return router
}