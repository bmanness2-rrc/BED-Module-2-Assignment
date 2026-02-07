import { Request, Response } from "express";
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} from "../services/ticketsService";
import { HTTP_STATUS } from "../../../constants/httpConstants";