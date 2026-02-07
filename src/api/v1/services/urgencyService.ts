import { Ticket } from "../services/ticketsService"

const BASE_URGENCY: Record<string, number> = {
  low: 10,
  medium: 20,
  high: 30,
  critical: 50,
};