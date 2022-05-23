import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "utils/prisma";
import { getJWT } from "utils/jwt";
import AuthError from "errors/AuthError";
import { setCookie } from "nookies";

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
  let { email, password, rememberMe } = req.body;

  try {
    let { user, token } = await signIn({
      email,
      password,
      rememberMe: !!rememberMe,
    });

    // setCookie({ res }, "gym-app:auth", token);
    res.setHeader("set-cookie", [`gym-app:auth=${token}`]);

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    if (err.name === "AuthError") {
      return res.status(401).json({ error: err.message });
    }

    return res.status(500).json({ error: err.message });
  }
}

export async function signIn({
  email,
  password,
  rememberMe = false,
}: SignInProps) {
  let salt = 10;
  let hashedPassword = await bcrypt.hash(password, salt);

  let user = await prisma.user.findFirst({
    where: {
      email,
      password: hashedPassword,
      provider: "EMAIL",
    },
  });
  console.log({ user });
  if (!user) {
    throw new AuthError("Invalid email or password");
  }

  let { password: removePassword, ...userWithoutPassword } = user;

  let token = getJWT(userWithoutPassword, rememberMe);

  await prisma.token.create({ data: { token, userId: user.id } });

  return { user: userWithoutPassword, token };
}

interface SignInProps {
  email: string;
  password: string;
  rememberMe?: boolean;
}
