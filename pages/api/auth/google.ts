import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "utils/prisma";
import { getJWT } from "utils/jwt";
import { setCookie } from "nookies";

type Data =
  | {
      user: { name: string; id: string };
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let { name, email, photoUrl } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email_provider: {
          email,
          provider: "GOOGLE",
        },
      },
    });

    if (!user) {
      user = await prisma.user.upsert({
        where: {
          email_provider: {
            email,
            provider: "GOOGLE",
          },
        },
        update: {
          name,
          photoUrl,
        },
        create: {
          name,
          email,
          provider: "GOOGLE",
          photoUrl,
        },
      });
    }

    let token = getJWT(user, false);

    await prisma.token.create({ data: { token, userId: user.id } });

    // setCookie({ res }, "gym-app:auth", token);
    res.setHeader("set-cookie", [`gym-app:auth=${token}`]);
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(401).json({ error: "Email already in use" });
    }

    console.log(err, err.code);

    return res.status(500).json({ error: err.message });
  }
}
