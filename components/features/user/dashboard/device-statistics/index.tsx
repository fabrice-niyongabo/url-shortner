import prisma from "@/lib/prisma";
import React from "react";
import { DevicesPieChart } from "./DevicesPieChart";
import { protectedUserSession } from "@/lib/authProtected";

export interface IChartData {
  device: string;
  percentage: number;
  fill: string;
}

async function DeviceStatistics() {
  const session = await protectedUserSession();
  const deviceStats = await prisma.clicks.groupBy({
    by: ["device"],
    where: {
      url: {
        userId: session.user.id,
      },
    },
    _count: {
      _all: true,
    },
  });

  const total = deviceStats.reduce((sum, r) => sum + Number(r._count._all), 0);

  const chartData: IChartData[] = deviceStats.map((r, index) => ({
    device: r.device || "Unknown",
    percentage: total
      ? Number(((Number(r._count._all) / total) * 100).toFixed(1))
      : 0,
    fill: `var(--chart-${(index % 5) + 1})`, // automatically assign a chart color
  }));

  return (
    <div className="bg-white p-5 rounded-md">
      <p className="text-lg font-semibold">Devices</p>
      <DevicesPieChart chartData={chartData} />
    </div>
  );
}

export default DeviceStatistics;
