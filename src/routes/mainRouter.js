const express = require('express');
const {auth} = require("express-oauth2-jwt-bearer");
const router = express.Router();

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    tokenSigningAlg: 'RS256'
});

const profileRouter = require('./profileRouter')(jwtCheck);
const workoutRouter = require('./workoutRouter');

router.use("/profiles", profileRouter);
router.use("/workouts", workoutRouter);

module.exports = router;