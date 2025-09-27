import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { getPrismaErrorMessage } from "@/lib/prismaErrorHandler";

export async function POST(request: NextRequest) {
  try {
    const { password, email, name } = await request.json();

    if (!password || !email || !name) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with the same email already exists" },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name } as any,
    });

    return NextResponse.json({
      message: "Your account has been registered",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: getPrismaErrorMessage(error) },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
