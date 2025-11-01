import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { IClicksPerDay } from "@/types/statistics";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { searchParams } = new URL(req.url);
    const urlId = parseInt(searchParams.get("urlId") || "");
    const startDate = new Date(searchParams.get("startDate") || "");
    const endDate = new Date(searchParams.get("endDate") || "");

    if (!urlId) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // find the url by id
    const url = await prisma.url.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!url) {
      return NextResponse.json(
        { message: "Invalid urlId" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // restrict users to view their own statistics
    if (url.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "You don't have permission to view this statistics" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const clicksPerDay: IClicksPerDay[] = await prisma.$queryRaw`
        SELECT 
            DATE("createdAt") AS date, 
            CAST(COUNT(*) AS INT) AS count
        FROM "Clicks"
        WHERE "createdAt" BETWEEN ${startDate} AND ${endDate}
        AND "urlId" = ${urlId}
        GROUP BY DATE("createdAt")
        ORDER BY DATE("createdAt");
        `;
      return NextResponse.json(
        {
          statistics: clicksPerDay.map((item) => ({
            ...item,
            date: `${new Date(item.date).getFullYear()}-${new Date(
              item.date
            ).getMonth()}-${new Date(item.date).getDate()}`,
          })),
        },
        { status: HttpStatusCode.Ok }
      );
    } else {
      const clicksPerDay: IClicksPerDay[] = await prisma.$queryRaw`
        SELECT 
            DATE("createdAt") AS date, 
            CAST(COUNT(*) AS INT) AS count
        FROM "Clicks"
        WHERE "urlId" = ${urlId}
        GROUP BY DATE("createdAt")
        ORDER BY DATE("createdAt")
        LIMIT 30;
        `;

      return NextResponse.json(
        {
          statistics: clicksPerDay.map((item) => ({
            ...item,
            date: `${new Date(item.date).getFullYear()}-${new Date(
              item.date
            ).getMonth()}-${new Date(item.date).getDate()}`,
          })),
        },
        { status: HttpStatusCode.Ok }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
