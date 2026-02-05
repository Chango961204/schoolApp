const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const {
    createClass,
    getMyClasses,
    getMyEnrolledClasses,
    getAllClasses,
    getClassById,
} = require("../controllers/class.controller");

// MAESTRO crea clase
router.post("/", authMiddleware, requireRole("MAESTRO"), createClass);

// MAESTRO ve sus clases
router.get("/mine", authMiddleware, requireRole("MAESTRO"), getMyClasses);

// ALUMNO ve sus clases inscritas
router.get("/enrolled", authMiddleware, requireRole("ALUMNO"), getMyEnrolledClasses);

// ADMIN ve todas las clases
router.get("/", authMiddleware, requireRole("ADMIN"), getAllClasses);

//Maestro o Alumno puede ver detalles de una clase si pertenece
router.get("/:id", authMiddleware, getClassById);

module.exports = router;
