import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { getPrismaErrorMessage } from "@/lib/prismaErrorHandler";

export async function POST(request: NextRequest) {
  try {
    const { password, email } = await request.json();

    if (!password || !email) {
      return NextResponse.json(
        { message: "Please provide email and password" },
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
      data: { email, password: hashedPassword } as any,
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
