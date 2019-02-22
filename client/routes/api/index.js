const router = require("express").Router();
const saveRoutes = require("./saved");

// Book routes
router.use("/saved", saveRoutes);

module.exports = router;
