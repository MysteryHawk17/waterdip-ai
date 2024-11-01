import React from "react";
import { render, screen } from "@testing-library/react";
import CountryBarChart from "../../src/components/CountryBarChart";
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

describe("CountryBarChart Component", () => {
  const mockData = [
    { country: "USA", visitors: 45 },
    { country: "UK", visitors: 30 },
    { country: "India", visitors: 25 },
  ];

  it("renders without crashing", () => {
    render(<CountryBarChart data={mockData} />);
    expect(screen.getByTestId("apex-chart")).toBeInTheDocument();
  });

  it("passes correct series data to ApexChart", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const expectedData = mockData.map((item) => item.visitors);
    expect(apexChartProps.series[0].data).toEqual(expectedData);
    expect(apexChartProps.series[0].name).toBe("Visitor");
  });

  it("configures chart type and height correctly", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.type).toBe("bar");
    expect(apexChartProps.height).toBe(300);
  });

  it("sets correct x-axis categories from country names", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const expectedCategories = mockData.map((item) => item.country);
    expect(apexChartProps.options.xaxis.categories).toEqual(expectedCategories);
  });

  it("configures bar plot options correctly", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.options.plotOptions.bar.borderRadius).toBe(10);
    expect(apexChartProps.options.plotOptions.bar.dataLabels.position).toBe(
      "top"
    );
  });

  it("configures data labels correctly", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const dataLabels = apexChartProps.options.dataLabels;
    expect(dataLabels.enabled).toBe(true);
    expect(dataLabels.offsetY).toBe(-20);
    expect(dataLabels.style.fontSize).toBe("12px");
    expect(dataLabels.style.colors).toEqual(["#304758"]);
  });

  it("formats data labels with percentage sign", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const formatter = apexChartProps.options.dataLabels.formatter;
    expect(formatter(42)).toBe("42%");
  });

  it("configures yaxis labels correctly", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const yaxis = apexChartProps.options.yaxis;
    expect(yaxis.axisBorder.show).toBe(false);
    expect(yaxis.axisTicks.show).toBe(false);
    expect(yaxis.labels.show).toBe(false);
  });

  it("handles empty data array", () => {
    render(<CountryBarChart data={[]} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    expect(apexChartProps.series[0].data).toEqual([]);
    expect(apexChartProps.options.xaxis.categories).toEqual([]);
  });

  it("configures crosshairs gradient correctly", () => {
    render(<CountryBarChart data={mockData} />);
    const apexChartProps = (ApexChart as Mock).mock.calls[0][0];
    const gradient = apexChartProps.options.xaxis.crosshairs.fill.gradient;
    expect(gradient.colorFrom).toBe("#D8E3F0");
    expect(gradient.colorTo).toBe("#BED1E6");
    expect(gradient.stops).toEqual([0, 100]);
    expect(gradient.opacityFrom).toBe(0.4);
    expect(gradient.opacityTo).toBe(0.5);
  });
});
