const { prisma } = require("../config/db");

// MAESTRO crea clase
async function createClass(req, res) {
    try {
        const { nombre } = req.body;
        const maestroId = req.user.id;

        if (!nombre) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        // código aleatorio 6 chars
        const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

        const nuevaClase = await prisma.class.create({
            data: {
                nombre,
                codigo,
                maestroId,
            },
        });

        res.json({ message: "Clase creada", class: nuevaClase });
    } catch (error) {
        res.status(500).json({ message: "Error creando clase", error });
    }

}

// MAESTRO ve sus clases
async function getMyClasses(req, res) {
    try {
        const maestroId = req.user.id;

        const clases = await prisma.class.findMany({
            where: { maestroId },
            orderBy: { nombre: "asc" },
        });

        res.json({ classes: clases });
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo clases", error });
    }
}

// ADMIN ve todas
async function getAllClasses(req, res) {
    try {
        const clases = await prisma.class.findMany({
            include: {
                maestro: { select: { id: true, nombre: true, email: true } },
            },
            orderBy: { nombre: "asc" },
        });

        res.json({ classes: clases });
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo clases", error });
    }
}


// ALUMNO: ver clases donde está inscrito
async function getMyEnrolledClasses(req, res) {
    try {
        const studentId = req.user.id;

        const inscripciones = await prisma.enrollment.findMany({
            where: { studentId },
            include: {
                class: {
                    include: {
                        maestro: { select: { id: true, nombre: true, email: true } },
                    },
                },
            },
        });

        const classes = inscripciones.map((i) => i.class);

        res.json({ classes });
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo clases", error });
    }
}

// MAESTRO o ALUMNO ve detalles de una clase si pertenece
async function getClassById(req, res) {
    try {
        const classId = req.params.id;
        const userId = req.user.id;
        const role = req.user.role;

        const clase = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                maestro: { select: { id: true, nombre: true, email: true } },
            },
        });

        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }

        // Si es maestro, solo puede ver sus clases
        if (role === "MAESTRO" && clase.maestroId !== userId) {
            return res.status(403).json({ message: "No tienes acceso a esta clase" });
        }

        // Si es alumno, debe estar inscrito
        if (role === "ALUMNO") {
            const inscripcion = await prisma.enrollment.findFirst({
                where: {
                    studentId: userId,
                    classId: classId,
                },
            });

            if (!inscripcion) {
                return res.status(403).json({ message: "No estás inscrito en esta clase" });
            }
        }

        // Admin puede ver cualquiera
        res.json({ class: clase });
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo clase", error });
    }
}



module.exports = {
    createClass,
    getMyClasses,
    getMyEnrolledClasses,
    getAllClasses,
    getClassById,
};
