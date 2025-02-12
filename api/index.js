import express from "express";
import crypto from "crypto";

const app = express();

// Lista de palabras directamente en el código
const palabras = [
  "casa",
  "perro",
  "gato",
  "nube",
  "flor",
  "tren",
  "dardo",
  "luzco",
  "mango",
  "riego",
  "truco",
  "vacas",
  "zorro",
  "hondo",
  "nacer",
];

// Función para obtener un índice basado en la fecha actual
const getDailyIndex = (length) => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const hash = crypto.createHash("md5").update(today).digest("hex");
  const number = parseInt(hash.substring(0, 8), 16);
  return number % length;
};

app.get("/", (req, res) => {
  res.json({
    message: "Hello World Welcome to Wordle API",
    status: "ok 👌",
    code: 200,
  });
});

app.get("/wordle", (req, res) => {
  if (!palabras || palabras.length === 0) {
    return res.status(500).json({
      message: "No hay palabras en la lista.",
      status: "error ❌",
      code: 500,
    });
  }

  const index = getDailyIndex(palabras.length);
  const palabra = palabras[index];

  res.json({
    message: "Palabra del día",
    status: "ok ✅",
    code: 200,
    data: { palabra },
  });
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
    status: "not found 😒",
    code: 404,
  });
});

// Iniciamos el servidor en el puerto 3000

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Exportamos la app en lugar de usar app.listen()
export default app;
