import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { names } = await req.json();
    if (!names) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: names,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully!" },
      { status: HttpStatusCode.Ok }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
