const router = require("express").Router();

const { job } = require("../controllers");

router.get("/all", job.allJobPagination);
router.get("/detail/:id", job.jobDetail);

module.exports = router;
