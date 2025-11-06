import NotFound from "@/components/NotFound";
import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";

async function Countries() {
  const results = await prisma.$queryRaw<{ country: string; clicks: bigint }[]>`
    SELECT 
      COALESCE(country, 'Unknown') AS country,
      COUNT(*) AS clicks
    FROM "Clicks" 
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
      <h2 className="text-lg font-semibold mb-4">Countries</h2>
      <div className="space-y-2">
        {formatted.length == 0 ? (
          <NotFound className="h-auto" hideLabel />
        ) : (
          formatted.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-2 mb-2"
            >
              <p className="w-[150px] text-sm">{item.country}</p>
              <div className="flex-1 relative h-[10px] rounded-full bg-gray-300">
                <div
                  className="h-full bg-blue-600 transition-all duration-700 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-right text-sm">
                {minifyNumber(item.clicks)}
              </span>
              <span className="font-semibold text-right text-sm">
                {item.percentage}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Countries;
