require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const classRoutes = require("./routes/class.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/enrollments", enrollmentRoutes);


app.get("/", (req, res) => {
    res.json({ ok: true, message: "API funcionando" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API corriendo en puerto", PORT));
