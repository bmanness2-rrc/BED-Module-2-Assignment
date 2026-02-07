import express, { Express } from "express";
import ticketsRoutes from "./api/v1/routes/ticketsRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1", ticketsRoutes);

export default app;