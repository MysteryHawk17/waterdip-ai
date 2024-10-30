import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type TimeSeriesChartProps = {
  data: { date: string; visitors: number }[];
};

export default function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Total Visitors",
      },
    },
    xaxis: {
      type: "datetime",
      categories: data.map((item) => item.date),
    },
    tooltip: {
      shared: false,
    },
  };

  const series = [
    {
      data: data.map((item) => item.visitors),
    },
  ];

  return (
    <ApexChart options={options} series={series} type="area" height={350} />
  );
}
