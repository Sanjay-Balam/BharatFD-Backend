import express from "express";
import faqRoutes from "./routes/faqRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/api", faqRoutes);


app.use(errorHandler);
export default app;
