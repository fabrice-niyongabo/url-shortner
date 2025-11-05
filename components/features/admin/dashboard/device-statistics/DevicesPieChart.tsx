"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IChartData } from ".";

interface IProps {
  chartData: IChartData[];
}

export function DevicesPieChart({ chartData }: IProps) {
  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[item.device] = {
      label: item.device.toUpperCase(),
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="device" />} />
        <Pie data={chartData} dataKey="percentage">
          <LabelList
            dataKey="device"
            className="fill-background"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
