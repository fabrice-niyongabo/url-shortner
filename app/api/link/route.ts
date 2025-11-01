import { auth } from "@/auth";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
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

    const { url, title, icon } = await req.json();
    if (!url || url.trim() === "" || !title || title.trim() === "") {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const shortCode = nanoid(6); // 6-character code
    await prisma.url.create({
      data: {
        userId: session.user.id,
        shortCode,
        longUrl: url,
        title,
        icon,
      },
    });

    return NextResponse.json(
      { message: "Success", data: { url, title, icon } },
      { status: HttpStatusCode.Ok }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
