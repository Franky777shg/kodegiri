const router = require("express").Router();

const { user } = require("../controllers");

router.post("/login", user.login);

module.exports = router;
