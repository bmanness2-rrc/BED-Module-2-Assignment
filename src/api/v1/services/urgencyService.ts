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