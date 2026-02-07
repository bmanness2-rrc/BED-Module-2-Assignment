import { Request, Response} from "express";
import { getTicketById } from "../services/ticketsService";
import {
    calculateTicketAge,
    calculateUrgencyScore,
    getUrgencyLevel
} from "../services/urgencyService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getTicketUrgencyController = (
  req: Request,
  res: Response
): void => {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  const ticketAge = calculateTicketAge(ticket.createdAt);
  const urgencyScore = calculateUrgencyScore(ticket, ticketAge);
  const urgencyLevel = getUrgencyLevel(urgencyScore, ticket.status);

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket urgency calculated",
    data: {
      id: ticket.id,
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
      createdAt: ticket.createdAt,
      ticketAge,
      urgencyScore,
      urgencyLevel,
    },
  });
};