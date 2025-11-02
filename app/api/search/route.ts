import { auth } from "@/auth";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { searchTerm } = await req.json();
    if (!searchTerm) {
      const urls = await prisma.url.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          title: true,
          shortCode: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10, // limit the number of results
      });
      return NextResponse.json(urls, { status: HttpStatusCode.Ok });
    }

    const urls = await prisma.url.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            longUrl: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        shortCode: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // limit the number of results
    });

    return NextResponse.json(urls, { status: HttpStatusCode.Ok });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
