import express from "express";
import router from "./routes/index.js";
import createTables from "./database/createTables.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT ?? 3001;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

createTables();

app.use("/api_v1", router);

app.listen(PORT, () => {
  console.log(`Server listenting on port: ${PORT}`);
});
