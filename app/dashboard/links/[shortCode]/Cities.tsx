import prisma from "@/lib/prisma";

interface IProps {
  urlId: number;
}
async function Cities({ urlId }: IProps) {
  const results = await prisma.$queryRaw<{ city: string; clicks: bigint }[]>`
    SELECT 
      COALESCE(city, 'Unknown') AS city,
      COUNT(*) AS clicks
    FROM "Clicks"
    WHERE "urlId" = ${urlId}
    GROUP BY city
    ORDER BY clicks DESC
  `;

  // Convert BigInt values to number for rendering
  const total = results.reduce((sum, r) => sum + Number(r.clicks), 0);
  const formatted = results.map((r, i) => ({
    id: i + 1,
    city: r.city,
    clicks: Number(r.clicks),
    percentage: total ? ((Number(r.clicks) / total) * 100).toFixed(1) : "0.0",
  }));

  return (
    <div className="bg-white p-10 rounded-lg mt-5">
      <h2 className="text-lg font-semibold mb-4">Cities</h2>
      <div className="space-y-2">
        {formatted.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center gap-2 mb-2"
          >
            <span>{item.city}</span>
            <div className="flex-1 relative h-[10px] rounded-full bg-gray-400">
              <div
                className="h-full bg-blue-600 transition-all duration-700 rounded-full"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <span className="text-right">{item.clicks}</span>
            <span className="font-semibold text-right">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;
