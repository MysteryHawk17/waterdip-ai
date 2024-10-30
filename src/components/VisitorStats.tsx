import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type VisitorStatsProps = {
  title: string;
  stats: { total: number; trend: { date: string; value: number }[] };
};

export default function VisitorStats({ title, stats }: VisitorStatsProps) {
  const options: ApexOptions = {
    chart: { type: "line", sparkline: { enabled: true } },
    stroke: { curve: "smooth" },
    tooltip: { x: { show: false }, y: { title: { formatter: () => "" } } },
  };

  return (
    <div className="md:col-span-1 lg:col-span-2">
      <div className="text-3xl font-bold">{stats.total}</div>
      <ApexChart
        options={options}
        series={[{ name: title, data: stats.trend.map((item) => item.value) }]}
        type="line"
        height={100}
      />
    </div>
  );
}
