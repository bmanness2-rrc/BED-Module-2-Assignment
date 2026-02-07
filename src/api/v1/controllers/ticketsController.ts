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

export const createTicketController = (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  if (!title) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: title",
    });
  }

  if (!description) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: description",
    });
  }

  if (
    priority !== "critical" &&
    priority !== "high" &&
    priority !== "medium" &&
    priority !== "low"
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
  }

  const newTicket = createTicket(title, description, priority);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Ticket created",
    data: newTicket,
  });
};

export const updateTicketController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { priority, status, title, description } = req.body;

  if (
    priority &&
    priority !== "critical" &&
    priority !== "high" &&
    priority !== "medium" &&
    priority !== "low"
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
  }

  if (
    status &&
    status !== "open" &&
    status !== "in-progress" &&
    status !== "resolved"
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid status. Must be one of: open, in-progress, resolved",
    });
  }

  const updatedTicket = updateTicket(id, {
    title,
    description,
    priority,
    status,
  });

  if (!updatedTicket) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket updated",
    data: updatedTicket,
  });
};