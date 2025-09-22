import { Prisma } from "@prisma/client";

export function getPrismaErrorMessage(error: any): string {
  // Known request errors (e.g. unique constraint violation)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        // Check if error.meta.target is an array
        const target =
          error.meta && typeof error.meta === "object" && "target" in error.meta
            ? error.meta.target
            : null;
        const fields = Array.isArray(target)
          ? target.join(", ")
          : "unknown field(s)";
        return `Unique constraint failed on the field(s): ${fields}.`;
      // Handle other Prisma error codes if necessary
      default:
        return `Prisma error (code: ${error.code}): ${error.message}`;
    }
  }
  // Unknown request errors
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return `Unknown Prisma request error: ${error.message}`;
  }
  // Prisma client Rust panic errors
  else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return `Prisma client panicked: ${error.message}`;
  }
  // Prisma initialization errors
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    return `Prisma initialization error: ${error.message}`;
  }
  // Prisma validation errors
  else if (error instanceof Prisma.PrismaClientValidationError) {
    return `Prisma validation error: ${error.message}`;
  }
  // Fallback for any other error types
  else {
    return `Unexpected error: ${error.message || error.toString()}`;
  }
}
