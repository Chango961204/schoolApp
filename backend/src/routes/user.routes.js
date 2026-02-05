const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { prisma } = require("../config/db");

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, nombre: true, role: true },
    });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error en /me" });
  }
});

module.exports = router;
