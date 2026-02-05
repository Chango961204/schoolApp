const { prisma } = require("../config/db");

// ALUMNO se une por código
async function joinClass(req, res) {
  try {
    console.log("====== JOIN CLASS ======");
    console.log("HEADERS content-type:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const studentId = req.user.id;
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ message: "El código es obligatorio" });
    }

    const clase = await prisma.class.findUnique({
      where: { codigo: codigo.toUpperCase() },
    });

    if (!clase) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    const inscripcion = await prisma.enrollment.create({
      data: {
        studentId,
        classId: clase.id,
      },
    });

    res.json({ message: "Inscripción exitosa", enrollment: inscripcion });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Ya estás inscrito en esta clase" });
    }

    res.status(500).json({ message: "Error al inscribirse", error });
  }
}

// ALUMNO: ver sus clases inscritas
async function getMyEnrollments(req, res) {
  try {
    const studentId = req.user.id;

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        class: {
          include: {
            maestro: { select: { id: true, nombre: true, email: true } },
          },
        },
      },
    });

    res.json({ enrollments });
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo inscripciones", error });
  }
}

module.exports = { joinClass, getMyEnrollments };
