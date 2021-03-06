import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "utils/prisma";
import { getJWT } from "utils/jwt";
import { setCookie } from "nookies";
import { serialize } from "v8";

type Data =
  | {
      user: { name: string; id: string };
      token: string;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let { name, email, password } = req.body;

    let { user, token } = await signUp({ name, email, password });
    console.log(token);
    console.log("return");
    // res.setHeader(
    //   "set-cookie",
    //   // serialize("gym-app:auth", token, {
    //   //   path: "/",
    //   //   // sameSite: "lax",
    //   // })
    // );
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.log(err, err.code);
    if (err.code === "P2002") {
      return res.status(401).json({ error: "Email already in use" });
    }

    return res.status(500).json({ error: err.message });
  }
}

export async function signUp({ name, email, password }: SignUpProps) {
  let salt = 10;
  let hashedPassword = await bcrypt.hash(password, salt);

  let user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      provider: "EMAIL",
    },
  });
  console.log(user);
  let { password: removePassword, ...userWithoutPassword } = user;

  let token = getJWT(userWithoutPassword, false);

  await prisma.token.create({ data: { token, userId: user.id } });

  return { user, token };
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}
