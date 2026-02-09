import { Router } from "express";
import {
    getAllTicketsController,
    getTicketByIdController,
    createTicketController,
    updateTicketController,
    deleteTicketController
} from "../controllers/ticketsController";
import { getTicketUrgencyController } from "../controllers/urgencyController";

const router = Router();

router.get("/tickets", getAllTicketsController);
router.get("/tickets/:id", getTicketByIdController);
router.post("/tickets", createTicketController);
router.put("/tickets/:id", updateTicketController);
router.delete("/tickets/:id", deleteTicketController);
router.get("/tickets/:id/urgency", getTicketUrgencyController);

export default router;