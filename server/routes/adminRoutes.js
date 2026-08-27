const express = require("express")
const router = express.Router()

router.use(require("../middleware/authMiddleware"))
router.use(require('../middleware/adminMiddleware'))

module.exports = router