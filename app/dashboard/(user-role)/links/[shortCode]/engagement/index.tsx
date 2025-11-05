"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { returnAxiosErrorMesssage, toastMessage } from "@/lib/helpers";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { IClicksPerDay } from "@/types/statistics";
import Header from "./Header";
import Statistics from "./Statistics";

interface IProps {
  urlId: number;
}

const emptyStatistics: IClicksPerDay[] = [
  {
    count: 0,
    date: "May",
  },
  {
    count: 0,
    date: "June",
  },
  {
    count: 0,
    date: "July",
  },
];

function Engagement({ urlId }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [statistics, setStatistics] =
    useState<IClicksPerDay[]>(emptyStatistics);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const startDate = `${dateRange?.from?.getFullYear()}-${dateRange?.from?.getMonth()}-${dateRange?.from?.getDate()}`;
      const endDate = `${dateRange?.to?.getFullYear()}-${dateRange?.to?.getMonth()}-${dateRange?.to?.getDate()}`;
      const url =
        dateRange?.from && dateRange?.to
          ? `/api/statistics?urlId=${urlId}&startDate=${startDate}&endDate=${endDate}`
          : `/api/statistics?urlId=${urlId}`;
      const res = await axios.get(url);
      setStatistics(
        res.data.statistics.length ? res.data.statistics : emptyStatistics
      );
    } catch (error) {
      const errorMessage = returnAxiosErrorMesssage(error);
      toastMessage("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-5 bg-white rounded-md p-10">
      <Header
        setDateRange={setDateRange}
        dateRange={dateRange}
        fetchData={fetchData}
      />
      <Statistics isLoading={isLoading} statistics={statistics} />
    </div>
  );
}

export default Engagement;
