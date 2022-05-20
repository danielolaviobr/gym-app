// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "utils/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { email, password } = req.body;

  let user = await prisma.user.upsert({
    where: { email_provider: { email: "daniel@mail.com", provider: "EMAIL" } },
    update: {},
    create: {
      email: "daniel@mail.com",
      name: "Daniel",
      provider: "EMAIL",
      password: "123",
    },
  });
  console.log(user);
  let token = await prisma.token.create({ data: { userId: user.id } });
  console.log(token);
  return res.status(200).json({ name: "John Doe" });
}
