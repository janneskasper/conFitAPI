module.exports = (checkJwt) => {
    const {requiredScopes } = require('express-oauth2-jwt-bearer');
    const router = require("express").Router();
    const profileService = require("../services/profileService");

    const adminScope = requiredScopes('admin');

    router.get("/", profileService.getAll)
    router.get("/:id", checkJwt, profileService.getById)
    router.put("/:id", checkJwt, profileService.updateById)
    router.post("/", profileService.createOne)
    router.delete("/:id", checkJwt, adminScope, profileService.deleteById)

    return router
}