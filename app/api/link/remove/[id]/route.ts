import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

//  export async function DELETE(
//       req: NextRequest,
//       { params }: { params: { userId: string } }
//     )

export async function DELETE(request: Request, context: any) {
  try {
    const session = await auth();
    const id = Number(context.params.id);

    if (!session?.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: "Invalid id" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const url = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    if (!url) {
      return NextResponse.json(
        { message: "Invalid urlId" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    if (url.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "You don't have permission to delete this link" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // delete clicks
    await prisma.clicks.deleteMany({
      where: {
        urlId: id,
      },
    });

    await prisma.url.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Link deleted successfully" },
      {
        status: HttpStatusCode.Ok,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
