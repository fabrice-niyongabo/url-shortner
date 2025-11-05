import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IClicksPerDay } from "@/types/statistics";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface IProps {
  isLoading: boolean;
  statistics: IClicksPerDay[];
}

const chartConfig = {
  desktop: {
    label: "Total Clicks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function Statistics({ isLoading, statistics }: IProps) {
  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="flex flex-col gap-1">
          {new Array(5).fill(null).map((_, index) => (
            <p
              key={index}
              className="bg-gray-300 h-4 animate-pulse [animation-duration:1s] rounded-md"
            ></p>
          ))}
        </div>
      ) : (
        <div>
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <AreaChart
              accessibilityLayer
              data={statistics}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" title="test" />}
              />
              <Area
                dataKey="count"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      )}
    </div>
  );
}

export default Statistics;
