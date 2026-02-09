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
        // Arrange
        await request(app).get("/api/v1/tickets");
        // Assert
        expect(ticketControllers.getAllTicketsController).toHaveBeenCalled();
    });

    it("should call getTicketByIdController", async () => {
        // Arrange
        await request(app).get("/api/v1/tickets/1");
        // Assert
        expect(ticketControllers.getTicketByIdController).toHaveBeenCalled();
    });

    it("should call createTicketController", async () => {
        // Arrange
        await request(app)
          .post("/api/v1/tickets")
          .send({ title: "Test", description: "Test desc", priority: "low" });
        // Assert
        expect(ticketControllers.createTicketController).toHaveBeenCalled();
    });

    it("should call updateTicketController", async () => {
        // Arrange
        await request(app)
          .put("/api/v1/tickets/1")
          .send({ title: "Updated" });
        // Assert
        expect(ticketControllers.updateTicketController).toHaveBeenCalled();
    });

    it("should call deleteTicketController", async () => {
        // Arrange
        await request(app).delete("/api/v1/tickets/1");
        // Assert
        expect(ticketControllers.deleteTicketController).toHaveBeenCalled();
    });

    it("should call getTicketUrgencyController", async () => {
        // Arrange
        await request(app).get("/api/v1/tickets/1/urgency");
        // Assert
        expect(urgencyController.getTicketUrgencyController).toHaveBeenCalled();
    });
})