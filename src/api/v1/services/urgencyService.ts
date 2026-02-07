import { Ticket } from "../services/ticketsService"

const BASE_URGENCY: Record<string, number> = {
  low: 10,
  medium: 20,
  high: 30,
  critical: 50,
};

export const calculateTicketAge = (createdAt: string): number => {
  const createdDate = new Date(createdAt).getTime();
  const now = Date.now();

  const diffInMs = now - createdDate;
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
};

export const calculateUrgencyScore = (
  ticket: Ticket,
  ticketAge: number
): number => {
  if (ticket.status === "resolved") {
    return 0;
  }

  const baseScore = BASE_URGENCY[ticket.priority] || 0;
  return baseScore + ticketAge * 5;
};

export const getUrgencyLevel = (
  urgencyScore: number,
  status: string
): string => {
  if (status === "resolved") {
    return "Minimal. Ticket resolved.";
  }

  if (urgencyScore >= 75) {
    return "Critical. Immediate attention required.";
  }

  if (urgencyScore > 50) {
    return "High urgency. Prioritize resolution.";
  }

  if (urgencyScore >= 30) {
    return "Moderate. Schedule for attention.";
  }

  return "Low urgency. Address when capacity allows.";
};