import { PrismaClient } from "@prisma/client";

declare global {
    var cachedPrisma: PrismaClient | undefined;
}

export const prisma = global.cachedPrisma ?? new PrismaClient();