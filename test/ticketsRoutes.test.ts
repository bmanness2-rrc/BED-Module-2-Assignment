import request from "supertest";
import app from "../src/app";
import * as ticketControllers from "../src/api/v1/controllers/ticketsController";
import * as urgencyController from "../src/api/v1/controllers/urgencyController";

jest.mock("../src/api/v1/controllers/ticketsController", () => ({
  getAllTicketsController: jest.fn((req, res) => res.status(200).send()),
  getTicketByIdController: jest.fn((req, res) => res.status(200).send()),
  createTicketController: jest.fn((req, res) => res.status(201).send()),
  updateTicketController: jest.fn((req, res) => res.status(200).send()),
  deleteTicketController: jest.fn((req, res) => res.status(200).send()),
}));

jest.mock("../src/api/v1/controllers/urgencyController", () => ({
  getTicketUrgencyController: jest.fn((req, res) => res.status(200).send()),
}));

describe("Ticket API Endpoints", () => {

    it("should call getAllTicketsController", async () => {
        await request(app).get("/api/v1/tickets");
        expect(ticketControllers.getAllTicketsController).toHaveBeenCalled();
    });

    it("should call getTicketByIdController", async () => {
        await request(app).get("/api/v1/tickets/1");
        expect(ticketControllers.getTicketByIdController).toHaveBeenCalled();
    });

    it("should call createTicketController", async () => {
        await request(app)
          .post("/api/v1/tickets")
          .send({ title: "Test", description: "Test desc", priority: "low" });
        expect(ticketControllers.createTicketController).toHaveBeenCalled();
    });

    it("should call updateTicketController", async () => {
        await request(app)
          .put("/api/v1/tickets/1")
          .send({ title: "Updated" });
        expect(ticketControllers.updateTicketController).toHaveBeenCalled();
    });

    it("should call deleteTicketController", async () => {
        await request(app).delete("/api/v1/tickets/1");
        expect(ticketControllers.deleteTicketController).toHaveBeenCalled();
    });
})