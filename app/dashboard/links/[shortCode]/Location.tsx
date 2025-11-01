import NotFound from "@/components/NotFound";
import prisma from "@/lib/prisma";

interface IProps {
  urlId: number;
}
async function Location({ urlId }: IProps) {
  const results = await prisma.$queryRaw<{ country: string; clicks: bigint }[]>`
    SELECT 
      COALESCE(country, 'Unknown') AS country,
      COUNT(*) AS clicks
    FROM "Clicks"
    WHERE "urlId" = ${urlId}
    GROUP BY country
    ORDER BY clicks DESC
  `;

  // Convert BigInt values to number for rendering
  const total = results.reduce((sum, r) => sum + Number(r.clicks), 0);
  const formatted = results.map((r, i) => ({
    id: i + 1,
    country: r.country,
    clicks: Number(r.clicks),
    percentage: total ? ((Number(r.clicks) / total) * 100).toFixed(1) : "0.0",
  }));

  return (
    <div className="bg-white p-10 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Locations</h2>
      <div className="space-y-2">
        {formatted.length == 0 ? (
          <NotFound className="h-auto" />
        ) : (
          formatted.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-2 mb-2"
            >
              <span>{item.country}</span>
              <div className="flex-1 relative h-[10px] rounded-full bg-gray-400">
                <div
                  className="h-full bg-blue-600 transition-all duration-700 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-right">{item.clicks}</span>
              <span className="font-semibold text-right">
                {item.percentage}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Location;
