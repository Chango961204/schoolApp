function requireRole(...rolesPermitidos) {
    return (req, res, next) => {
        const role = req.user?.role;

        if (!role) {
            return res.status(401).json({ message: "No autenticado" });
        }

        if (!rolesPermitidos.includes(role)) {
            return res.status(403).json({ message: "No tienes permisos" });
        }

        next();
    };
}

module.exports = { requireRole };
