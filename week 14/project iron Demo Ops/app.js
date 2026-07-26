import env from "dotenv";
import express from "express";
import middleErrors from "./middleware/middleErrors.js";
import incidentsRouter from "./routes/incidentsRoute.js";
import operatorsRouter from "./routes/operatorsRoute.js";

env.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/operators", operatorsRouter);
app.use("/incidents", incidentsRouter);

app.use(middleErrors);

app.listen(PORT, () => {
    console.log(`App start running on port ${PORT} ...`);
});
