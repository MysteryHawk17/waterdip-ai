import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import hotelData from "../data.json";
import DatePicker from "./DatePicker";
import TimeSeriesChart from "./TimeSeriesChart";
import CountryBarChart from "./CountryBarChart";
import VisitorStats from "./VisitorStats";

type BookingData = {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
};

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

const getProcessedData = (dateRange: DateRange | undefined) => {
  if (!dateRange?.from || !dateRange?.to)
    return {
      timeSeriesData: [],
      countryData: [],
      adultStats: { total: 0, trend: [] },
      childrenStats: { total: 0, trend: [] },
    };

  const filteredData = hotelData.filter((booking: BookingData) => {
    const bookingDate = new Date(
      booking.arrival_date_year,
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(booking.arrival_date_month),
      booking.arrival_date_day_of_month
    );
    return (
      bookingDate >= (dateRange.from ?? new Date(0)) &&
      bookingDate <= (dateRange.to ?? new Date(0))
    );
  });

  const timeSeriesMap = new Map<string, number>();
  filteredData.forEach((booking: BookingData) => {
    const dateStr = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
    const totalVisitors = booking.adults + booking.children + booking.babies;
    timeSeriesMap.set(
      dateStr,
      (timeSeriesMap.get(dateStr) || 0) + totalVisitors
    );
  });

  const timeSeriesData = Array.from(timeSeriesMap, ([date, visitors]) => ({
    date,
    visitors,
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


  const countryData = filteredData.reduce(
    (acc: Record<string, number>, booking: BookingData) => {
      const totalVisitors = booking.adults + booking.children + booking.babies;
      acc[booking.country] = (acc[booking.country] || 0) + totalVisitors;
      return acc;
    },
    {}
  );

  const sortedCountryData = Object.entries(countryData)
    .map(([country, visitors]) => ({ country, visitors }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);

  const totalAdults = filteredData.reduce(
    (sum, booking) => sum + booking.adults,
    0
  );
  const totalChildren = filteredData.reduce(
    (sum, booking) => sum + booking.children,
    0
  );

  const adultTrend = timeSeriesData.map((day) => ({
    date: day.date,
    value: filteredData
      .filter(
        (b) =>
          `${b.arrival_date_year}-${b.arrival_date_month}-${b.arrival_date_day_of_month}` ===
          day.date
      )
      .reduce((sum, b) => sum + b.adults, 0),
  }));

  const childrenTrend = timeSeriesData.map((day) => ({
    date: day.date,
    value: filteredData
      .filter(
        (b) =>
          `${b.arrival_date_year}-${b.arrival_date_month}-${b.arrival_date_day_of_month}` ===
          day.date
      )
      .reduce((sum, b) => sum + b.children, 0),
  }));

  return {
    timeSeriesData,
    countryData: sortedCountryData,
    adultStats: { total: totalAdults, trend: adultTrend },
    childrenStats: { total: totalChildren, trend: childrenTrend },
  };
};

const HotelBookingsDashboard = () => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(2015, 6, 1),
    to: new Date(2015, 7, 31),
  });
  const processedData = useMemo(() => getProcessedData(date), [date]);

  return (
    <div className="p-6 space-y-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Hotel Bookings Dashboard</h1>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visitors per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSeriesChart data={processedData.timeSeriesData} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visitors by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <CountryBarChart data={processedData.countryData} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Adult Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorStats
              title="Adult Visitors"
              stats={processedData.adultStats}
            />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Children Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorStats
              title="Children Visitors"
              stats={processedData.childrenStats}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelBookingsDashboard;
