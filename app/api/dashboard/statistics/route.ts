import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
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
    let startDate = new Date(searchParams.get("startDate") || "");
    let endDate = new Date(searchParams.get("endDate") || "");

    // if no valid dates provided -> default to last 6 months
    const now = new Date();
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      endDate = now;
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);
    }

    // Get all URLs owned by this user
    if (session.user.role === "USER") {
      const userUrls = await prisma.url.findMany({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (userUrls.length === 0) {
        return NextResponse.json(
          { message: "No URLs found for this user", statistics: [] },
          { status: HttpStatusCode.Ok }
        );
      }

      const urlIds = userUrls.map((u) => u.id);

      const clicksPerDay: IClicksPerDay[] = await prisma.$queryRaw`
      SELECT 
        DATE("createdAt") AS date,
        CAST(COUNT(*) AS INT) AS count
      FROM "Clicks"
      WHERE "createdAt" BETWEEN ${startDate} AND ${endDate}
      AND "urlId" IN (${Prisma.join(urlIds)})
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt");
    `;

      const formatted = clicksPerDay.map((item) => {
        const d = new Date(item.date);
        return {
          ...item,
          date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(d.getDate()).padStart(2, "0")}`,
        };
      });

      return NextResponse.json(
        { statistics: formatted },
        { status: HttpStatusCode.Ok }
      );
    } else {
      const userUrls = await prisma.url.findMany({
        select: { id: true },
      });

      if (userUrls.length === 0) {
        return NextResponse.json(
          { statistics: [] },
          { status: HttpStatusCode.Ok }
        );
      }

      const urlIds = userUrls.map((u) => u.id);

      const clicksPerDay: IClicksPerDay[] = await prisma.$queryRaw`
      SELECT 
        DATE("createdAt") AS date,
        CAST(COUNT(*) AS INT) AS count
      FROM "Clicks"
      WHERE "createdAt" BETWEEN ${startDate} AND ${endDate} 
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt");
    `;

      const formatted = clicksPerDay.map((item) => {
        const d = new Date(item.date);
        return {
          ...item,
          date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(d.getDate()).padStart(2, "0")}`,
        };
      });

      return NextResponse.json(
        { statistics: formatted },
        { status: HttpStatusCode.Ok }
      );
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
