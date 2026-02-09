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
});