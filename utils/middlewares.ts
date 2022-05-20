import prisma from "utils/prisma";
import { addDays } from "date-fns";

prisma.$use(async (params, next) => {
  console.log(params.action, params.model);
  if (params.action === "create" && params.model === "Token") {
    let today = new Date();
    let validForDays = 1;
    console.log(params.args.data.expiresAt);
    console.log({ args: params.args });
    params.args.data.expiresAt = addDays(today, validForDays);
    return next(params);
  }
});
