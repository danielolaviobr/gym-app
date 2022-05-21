import { PrismaClient } from "@prisma/client";
import registerMiddlewares from "./middlewares";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["info"],
  });
}
prisma = global.prisma;

registerMiddlewares(prisma);

export default prisma;
