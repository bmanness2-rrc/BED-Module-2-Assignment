import request from "supertest";
import express, { Express } from "express";
import ticketsRouter from "../src/api/v1/routes/ticketsRoutes";
import * as ticketsService from "../src/api/v1/services/ticketsService";
import { HTTP_STATUS } from "../src/constants/httpConstants";

const app: Express = express();
app.use(express.json());
app.use("/api/v1", ticketsRouter);

jest.mock("../src/api/v1/services/ticketsService");