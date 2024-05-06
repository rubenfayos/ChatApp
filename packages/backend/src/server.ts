// Permite usar las variables de entorno (archivo .env)
import { config } from "dotenv";
config();
import express from "express";
import { setupSocket } from "./utils/sockets";
import { authRouter, chatsRouter, usersRouter } from "./routes";
import cors from "cors";
import { initializeDatabase } from "./utils/db/db";
import cookiePaser from "cookie-parser";
import morgan from "morgan";
import { verifyJWT } from "./middleware";

const PORT = process.env.PORT || 3000;

const app = express();

// middleware para logear las peticiones a la consola
app.use(morgan("common"));

// Configuración cors
app.use(
  cors({
    origin: ["http://localhost:5173", "http://172.21.0.3:4173"], // localhost and docker origins
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookie parser middleware
app.use(cookiePaser());

// asigna las rutas a los endpoints
app.use("/auth", authRouter);

// Rutas protegidas por JWT (verifica el token antes de ejecutar la ruta)
app.use(verifyJWT);

app.use("/users", usersRouter);

app.use("/chats", chatsRouter);

// inicializa el socket server y lo asigna al app
setupSocket(app);

app.listen(PORT, async () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);

  await initializeDatabase();
});
