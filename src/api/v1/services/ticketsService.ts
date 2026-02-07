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

