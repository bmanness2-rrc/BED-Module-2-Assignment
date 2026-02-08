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
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket retrieved",
    data: ticket,
  });
};

export const createTicketController = (req: Request, res: Response) => {
  const body = req.body || {};
  const { title, description, priority } = body;

  if (!title) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: title",
    });
    return;
  }

  if (!description) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: description",
    });
    return;
  }

  if (
    priority !== "critical" &&
    priority !== "high" &&
    priority !== "medium" &&
    priority !== "low"
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
    return;
  }

  const newTicket = createTicket(title, description, priority);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Ticket created",
    data: newTicket,
  });
};

export const updateTicketController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body || {};
  const { priority, status, title, description } = body;

  if (
    priority &&
    priority !== "critical" &&
    priority !== "high" &&
    priority !== "medium" &&
    priority !== "low"
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
    return;
  }

  if (
    status &&
    status !== "open" &&
    status !== "in-progress" &&
    status !== "resolved"
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid status. Must be one of: open, in-progress, resolved",
    });
    return;
  }

  const updatedTicket = updateTicket(id, {
    title,
    description,
    priority,
    status,
  });

  if (!updatedTicket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket updated",
    data: updatedTicket,
  });
};

export const deleteTicketController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = deleteTicket(id);

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket deleted",
  });
};