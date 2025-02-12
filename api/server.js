import express from "express";
import { promises as fs } from "fs";
import crypto from "crypto";

const app = express();

const getDailyIndex = (length) => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const hash = crypto.createHash("md5").update(today).digest("hex");
  const number = parseInt(hash.substring(0, 8), 16);
  return number % length;
};

app.get("/", (req, res) => {
  res.json({
    message: "Hello World Welcome to Wordle API by Pablo Martin Lopez",
    status: "ok 👌",
    code: 200,
  });
});

app.get("/api/wordle", async (req, res) => {
  try {
    const data = await fs.readFile("./palabras.json", "utf8");
    const palabras = JSON.parse(data).palabras;

    if (!palabras || palabras.length === 0) {
      throw new Error("No hay palabras en la lista.");
    }

    const index = getDailyIndex(palabras.length);
    const palabra = palabras[index];

    res.json({
      message: "Palabra del día",
      status: "ok ✅",
      code: 200,
      data: { palabra },
    });
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    res.status(500).json({
      message: "Error interno del servidor",
      status: "error ❌",
      code: 500,
    });
  }
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
    status: "not found 😒",
    code: 404,
  });
});

// Exportar para Vercel
export default app;
