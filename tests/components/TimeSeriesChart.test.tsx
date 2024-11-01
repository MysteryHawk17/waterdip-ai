import React from "react";
import { render, screen } from "@testing-library/react";
import TimeSeriesChart from "../../src/components/TimeSeriesChart";
import { describe, it, expect, vi, Mock, afterEach } from "vitest";
import ApexChart from "react-apexcharts";

import "@testing-library/jest-dom/vitest";

// Mocking ApexChart component
vi.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="apex-chart" />),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("TimeSeriesChart Component", () => {
  const mockData = [
    { date: "2024-01-01", visitors: 100 },
    { date: "2024-01-02", visitors: 150 },
    { date: "2024-01-03", visitors: 120 },
    { date: "2024-01-04", visitors: 180 },
    { date: "2024-01-05", visitors: 200 },
  ];

  it("renders without crashing", () => {
    render(<TimeSeriesChart data={mockData} />);
    expect(screen.getByTestId("apex-chart")).toBeInTheDocument();
  });

  it("passes correct series data to ApexChart", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const expectedData = mockData.map((item) => item.visitors);
    expect(apexChartProps.series[0].data).toEqual(expectedData);
  });

  it("configures chart type and height correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.type).toBe("area");
    expect(apexChartProps.height).toBe(350);
  });

  it("sets correct x-axis categories from dates", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const expectedCategories = mockData.map((item) => item.date);
    expect(apexChartProps.options.xaxis.categories).toEqual(expectedCategories);
  });

  it("configures chart options correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];

    // Chart basic options
    expect(apexChartProps.options.chart.type).toBe("area");
    expect(apexChartProps.options.chart.stacked).toBe(false);
    expect(apexChartProps.options.chart.height).toBe(350);

    // Zoom options
    expect(apexChartProps.options.chart.zoom.type).toBe("x");
    expect(apexChartProps.options.chart.zoom.enabled).toBe(true);
    expect(apexChartProps.options.chart.zoom.autoScaleYaxis).toBe(true);
  });

  it("configures toolbar options correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.chart.toolbar.autoSelected).toBe("zoom");
  });

  it("configures data labels correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.dataLabels.enabled).toBe(false);
  });

  it("configures markers correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.markers.size).toBe(0);
  });

  it("configures gradient fill correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const fill = apexChartProps.options.fill;

    expect(fill.type).toBe("gradient");
    expect(fill.gradient.shadeIntensity).toBe(1);
    expect(fill.gradient.inverseColors).toBe(false);
    expect(fill.gradient.opacityFrom).toBe(0.5);
    expect(fill.gradient.opacityTo).toBe(0);
    expect(fill.gradient.stops).toEqual([0, 90, 100]);
  });

  it("configures y-axis title correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.yaxis.title.text).toBe("Total Visitors");
  });

  it("configures x-axis type correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.xaxis.type).toBe("datetime");
  });

  it("configures tooltip correctly", () => {
    render(<TimeSeriesChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.tooltip.shared).toBe(false);
  });

  it("handles empty data array", () => {
    render(<TimeSeriesChart data={[]} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.series[0].data).toEqual([]);
    expect(apexChartProps.options.xaxis.categories).toEqual([]);
  });

  it("handles single data point", () => {
    const singleDataPoint = [{ date: "2024-01-01", visitors: 100 }];
    render(<TimeSeriesChart data={singleDataPoint} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.series[0].data).toEqual([100]);
    expect(apexChartProps.options.xaxis.categories).toEqual(["2024-01-01"]);
  });

  it("maintains data order in series and categories", () => {
    const unorderedData = [
      { date: "2024-01-03", visitors: 120 },
      { date: "2024-01-01", visitors: 100 },
      { date: "2024-01-02", visitors: 150 },
    ];
    render(<TimeSeriesChart data={unorderedData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.series[0].data).toEqual([120, 100, 150]);
    expect(apexChartProps.options.xaxis.categories).toEqual([
      "2024-01-03",
      "2024-01-01",
      "2024-01-02",
    ]);
  });
});
