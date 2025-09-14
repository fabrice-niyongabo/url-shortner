import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { getPrismaErrorMessage } from "@/lib/prismaErrorHandler";
import { signToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { password, email } = await request.json();

    if (!password || !email) {
      return NextResponse.json(
        { message: "Please provide email and password" },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: httpStatus.UNAUTHORIZED }
      );

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: httpStatus.UNAUTHORIZED }
      );

    const token = signToken(user);
    NextResponse.json({ token });

    return NextResponse.json({
      message: "Logged in successfull!",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: getPrismaErrorMessage(error) },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
