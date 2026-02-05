const router = require("express").Router();

const { authMiddleware } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");
const {
  joinClass,
  getMyEnrollments,
} = require("../controllers/enrollment.controller");

router.post("/join", authMiddleware, requireRole("ALUMNO"), joinClass);
router.get("/mine", authMiddleware, requireRole("ALUMNO"), getMyEnrollments);

module.exports = router;
