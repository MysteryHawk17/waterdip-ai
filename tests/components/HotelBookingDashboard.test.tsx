import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import HotelBookingsDashboard from "../../src/components/HotelBookingDashboard";
import { describe, it, expect, vi, Mock, afterEach } from "vitest";
import DatePicker from "../../src/components/DatePicker";
import "@testing-library/jest-dom/vitest";

// Mocking the sub-components
vi.mock("../../src/components/DatePicker", () => {
  return {
    __esModule: true,
    default: vi.fn(({ date, setDate }) => (
      <div data-testid="date-picker" onClick={() => setDate(date)} />
    )),
  };
});
vi.mock("../../src/components/TimeSeriesChart", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="time-series-chart" />),
  };
});
vi.mock("../../src/components/CountryBarChart", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="country-bar-chart" />),
  };
});
vi.mock("../../src/components/VisitorStats", () => {
  return {
    __esModule: true,
    default: vi.fn(({ title }) => (
      <div
        data-testid={`visitor-stats-${title.replace(" ", "-").toLowerCase()}`}
      />
    )),
  };
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("HotelBookingsDashboard Component", () => {
  it("renders without crashing and displays the title", () => {
    render(<HotelBookingsDashboard />);
    expect(screen.getByText("Hotel Bookings Dashboard")).toBeInTheDocument();
  });

  it("renders DatePicker components", () => {
    render(<HotelBookingsDashboard />);
    const datePickers = screen.getAllByTestId("date-picker");
    expect(datePickers.length).toBe(1); // Adjust the expected count as necessary
  });

    it("renders TimeSeriesChart component with data", () => {
      render(<HotelBookingsDashboard />);
      expect(screen.getByTestId("time-series-chart")).toBeInTheDocument();
    });

    it("renders CountryBarChart component with data", () => {
      render(<HotelBookingsDashboard />);
      expect(screen.getByTestId("country-bar-chart")).toBeInTheDocument();
    });

    it("renders VisitorStats component for adult visitors", () => {
      render(<HotelBookingsDashboard />);
      expect(screen.getByTestId("visitor-stats-adult-visitors")).toBeInTheDocument();
    });

    it("renders VisitorStats component for children visitors", () => {
      render(<HotelBookingsDashboard />);
      expect(screen.getByTestId("visitor-stats-children-visitors")).toBeInTheDocument();
    });

    it("updates data when date range changes", () => {
      render(<HotelBookingsDashboard />);
      const newDate = { from: new Date(2016, 0, 1), to: new Date(2016, 11, 31) };

      const datePickerProps = (DatePicker as Mock).mock.calls[0][0];
      datePickerProps.setDate(newDate);

      expect(screen.getByTestId("time-series-chart")).toBeInTheDocument();
      expect(screen.getByTestId("country-bar-chart")).toBeInTheDocument();
    });

    it("renders correct titles for each section", () => {
      render(<HotelBookingsDashboard />);
      expect(screen.getByText("Visitors per Day")).toBeInTheDocument();
      expect(screen.getByText("Visitors by Country")).toBeInTheDocument();
      expect(screen.getByText("Adult Visitors")).toBeInTheDocument();
      expect(screen.getByText("Children Visitors")).toBeInTheDocument();
    });

});
