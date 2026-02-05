const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function crearUsuario({ email, password, nombre, role }) {
  const existe = await prisma.user.findUnique({ where: { email } });

  if (existe) {
    console.log(`Ya existe: ${email} (${existe.role})`);
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      nombre,
      password: hash,
      role,
    },
  });

  console.log(`Creado: ${user.email} (${user.role})`);
}

async function main() {
  console.log("Ejecutando seed...");

  await crearUsuario({
    email: "luis@admin.com",
    password: "Battery..1Chekelete961204",
    nombre: "Luis Admin",
    role: "ADMIN",
  });

  await crearUsuario({
    email: "maestro@school.com",
    password: "password123",
    nombre: "Maestro Prueba",
    role: "MAESTRO",
  });

  await crearUsuario({
    email: "alumno@school.com",
    password: "password123",
    nombre: "Alumno Prueba",
    role: "ALUMNO",
  });

  console.log("Seed terminado");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
