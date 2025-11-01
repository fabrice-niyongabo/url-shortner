"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { IChartData } from ".";

interface IProps {
  chartData: IChartData[];
}

export function DevicesPie({ chartData }: IProps) {
  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[item.device] = {
      label: item.device,
      color: `var(--chart-${(index % 5) + 1})`,
    };
    return acc;
  }, {} as ChartConfig);
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="clicks"
          nameKey="device"
          labelLine={false}
          //   label={({ name, percent }) =>
          //     `${name} ${(percent * 100).toFixed(0)}%`
          //   }
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="device" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
