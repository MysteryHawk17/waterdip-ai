import React from "react";
import { render, screen } from "@testing-library/react";
import VisitorStats from "../../src/components/VisitorStats";
import { describe, it, expect, vi, Mock } from "vitest";
import ApexChart from "react-apexcharts";

import "@testing-library/jest-dom/vitest";

// Mocking ApexChart component
vi.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="apex-chart" />),
  };
});
describe("VisitorStats Component", () => {
  const title = "Adult Visitors";
  const stats = {
    total: 100,
    trend: [
      { date: "2023-01-01", value: 20 },
      { date: "2023-01-02", value: 30 },
      { date: "2023-01-03", value: 50 },
    ],
  };

  it("renders without crashing", () => {
    render(<VisitorStats title={title} stats={stats} />);
    const total = screen.getByText(stats.total.toString());
    expect(total).toBeInTheDocument();
  });

  it("renders the title correctly in the chart series", () => {
    render(<VisitorStats title={title} stats={stats} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.series[0].name).toBe(title);
  });

  it("renders the correct data points in the chart series", () => {
    render(<VisitorStats title={title} stats={stats} />);
    const expectedData = stats.trend.map((item) => item.value);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.series[0].data).toEqual(expectedData);
  });

  it("displays the ApexChart component with the correct height", () => {
    render(<VisitorStats title={title} stats={stats} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.height).toBe(100);
  });

  it("uses the correct chart options", () => {
    render(<VisitorStats title={title} stats={stats} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.chart.type).toBe("line");
    expect(apexChartProps.options.chart.sparkline.enabled).toBe(true);
    expect(apexChartProps.options.stroke.curve).toBe("smooth");
  });

  it("displays a tooltip formatter function with no title", () => {
    render(<VisitorStats title={title} stats={stats} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.tooltip.y.title.formatter()).toBe("");
  });

  it("renders an empty state if no data is provided", () => {
    render(<VisitorStats title={title} stats={{ total: 0, trend: [] }} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
