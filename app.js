import express from "express";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();
app.use(express.json()); 
const PORT = 3000;


app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});