import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import bcrypt from "bcryptjs";
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

    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid user" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (!user.password) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        { message: "Password changed successfully!" },
        { status: HttpStatusCode.Ok }
      );
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password changed successfully!" },
      { status: HttpStatusCode.Ok }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
