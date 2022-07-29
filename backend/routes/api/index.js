const router = require('express').Router();
const bankRouter = require("./banks")

router.use("/banks", bankRouter)


module.exports = router;
