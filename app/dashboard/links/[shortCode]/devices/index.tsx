import prisma from "@/lib/prisma";
import { DevicesPie } from "./DevicesPie";
import NotFound from "@/components/NotFound";

export interface IChartData {
  device: string;
  clicks: number;
  percentage: string;
  fill: string;
}

interface IProps {
  urlId: number;
}
async function Devices({ urlId }: IProps) {
  const results = await prisma.$queryRaw<{ device: string; clicks: bigint }[]>`
        SELECT 
        COALESCE(device, 'Unknown') AS device,
        COUNT(*) AS clicks
        FROM "Clicks"
        WHERE "urlId" = ${urlId}
        GROUP BY device
        ORDER BY clicks DESC
        LIMIT 5
    `;

  const total = results.reduce((sum, r) => sum + Number(r.clicks), 0);

  const chartData: IChartData[] = results.map((r, index) => ({
    device: r.device,
    clicks: Number(r.clicks),
    percentage: total ? ((Number(r.clicks) / total) * 100).toFixed(1) : "0.0",
    fill: `var(--chart-${(index % 5) + 1})`, // automatically assign a chart color
  }));
  return (
    <div className="bg-white rounded-md p-5">
      <h1 className="text-lg font-semibold mb-4">Devices</h1>
      {chartData.length == 0 ? (
        <NotFound className="h-auto" hideLabel />
      ) : (
        <DevicesPie chartData={chartData} />
      )}
    </div>
  );
}

export default Devices;
