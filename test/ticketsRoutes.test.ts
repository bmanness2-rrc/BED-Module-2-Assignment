import request from "supertest";
import express, { Express } from "express";
import ticketsRouter from "../src/api/v1/routes/ticketsRoutes";
import * as ticketsService from "../src/api/v1/services/ticketsService";
import { HTTP_STATUS } from "../src/constants/httpConstants";

const app: Express = express();
app.use(express.json());
app.use("/api/v1", ticketsRouter);

jest.mock("../src/api/v1/services/ticketsService");

describe("Ticket Routes", () => {
    const mockTickets = [
    {
      id: 1,
      title: "Test Ticket 1",
      description: "Desc 1",
      priority: "low",
      status: "open",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Test Ticket 2",
      description: "Desc 2",
      priority: "medium",
      status: "open",
      createdAt: new Date().toISOString(),
    },
  ];
});