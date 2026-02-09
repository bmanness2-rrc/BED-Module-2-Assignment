import {
  calculateTicketAge,
  calculateUrgencyScore,
  getUrgencyLevel,
} from "../src/api/v1/services/urgencyService";
import { Ticket } from "../src/api/v1/services/ticketsService";

describe("Urgency Service Functions", () => {
  describe("calculateTicketAge", () => {
    it("should calculate age in days correctly", () => {
      // Arrange
      const today = new Date();
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(today.getDate() - 2);
      const createdAt = twoDaysAgo.toISOString();
      // Act
      const age = calculateTicketAge(createdAt);
      // Assert
      expect(age).toBe(2);
    });
  });

  describe("calculateUrgencyScore", () => {
    it("should calculate correct urgency for open ticket", () => {
      // Arrange
      const ticket: Ticket = {
        id: 1,
        title: "Test",
        description: "Test",
        priority: "high",
        status: "open",
        createdAt: new Date().toISOString(),
      };
      const age = 3;
      // Act
      const score = calculateUrgencyScore(ticket, age);
      // Assert
      // high base 30 + 3*5 = 45
      expect(score).toBe(45);
    });

    it("should return 0 urgency for resolved ticket", () => {
      // Arrange
      const ticket: Ticket = {
        id: 2,
        title: "Resolved Ticket",
        description: "Test",
        priority: "critical",
        status: "resolved",
        createdAt: new Date().toISOString(),
      };
      const age = 10;
      // Act
      const score = calculateUrgencyScore(ticket, age);
      // Assert
      expect(score).toBe(0);
    });
  });
});