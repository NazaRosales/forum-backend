import express from "express";
import router from "./routes/index.js";
import createTables from "./database/createTables.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 3001;
app.use(express.json());

createTables();

app.use("/api_v1", router);

app.listen(PORT, () => {
  console.log(`Server listenting on port: ${PORT}`);
});
