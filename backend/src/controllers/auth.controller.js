const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../config/db");

async function register(req, res) {
  try {
    const { email, nombre, password, role } = req.body;

    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ message: "Email ya registrado" });

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        nombre,
        password: hash,
        role: role || "ALUMNO",
      },
      select: { id: true, email: true, nombre: true, role: true },
    });

    res.json({ message: "Usuario creado", user });
  } catch (error) {
    res.status(500).json({ message: "Error en register", error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, nombre: user.nombre, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
}

module.exports = { register, login };
