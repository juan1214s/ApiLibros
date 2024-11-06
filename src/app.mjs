import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.mjs';
import bookRoutes from "./routes/bookRoutes.mjs";
import loginRoutes from "./routes/loginRoutes.mjs";
import recoverPassword from "./routes/recoverPasswordRoutes.mjs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/Api/", userRoutes);
app.use("/Api/", bookRoutes);
app.use("/Api/", loginRoutes);
app.use("/Api/", recoverPassword);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

export default app;
