import { Request, Response } from "express";
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} from "../services/ticketsService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getAllTicketsController = (req: Request, res: Response) => {
  const allTickets = getAllTickets();

  res.status(HTTP_STATUS.OK).json({
    message: "Tickets retrieved",
    count: allTickets.length,
    data: allTickets,
  });
};