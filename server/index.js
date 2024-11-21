import express from "express";
import cors from "cors";
import router from "./routes.js"

const app = express();

// CORS
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router)

app.listen(3000, () => {
  console.log("Server está rodando na porta 3000...")
})