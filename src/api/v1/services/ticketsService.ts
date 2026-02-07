import { tickets } from "src/data/tickets";

export interface  Ticket {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string
}

export const getAllTickets = (): Ticket[] => {
    return tickets
};

export const getTicketById = (id: number): Ticket | null => {
    const ticket = tickets.find((x) => x.id === id);
    return ticket || null;
};

export const createTicket = (
  title: string,
  description: string,
  priority: string
): Ticket => {
  const newTicket: Ticket = {
    id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1,
    title,
    description,
    priority,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  tickets.push(newTicket);
  return newTicket;
};

export const updateTicket = (
  id: number,
  updates: Partial<Omit<Ticket, "id" | "createdAt">>
): Ticket | null => {
  const ticket = tickets.find((x) => x.id === id);

  if (!ticket) {
    return null;
  }

  Object.assign(ticket, updates);
  return ticket;
};