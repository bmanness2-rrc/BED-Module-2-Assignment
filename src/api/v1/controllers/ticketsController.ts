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

export const getTicketByIdController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket retrieved",
    data: ticket,
  });
};