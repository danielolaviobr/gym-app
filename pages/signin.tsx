import Button from "@/components/Button";
import GoogleSignIn from "@/components/GoogleSignIn";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/use-auth";
import api from "@/utils/api";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface SignInForm {
  email: { value: string };
  password: { value: string };
  rememberMe: { value: string };
}

export default function SignIn() {
  let [loading, setLoading] = useState(false);
  let { currentUser, status } = useAuth();
  console.log({ currentUser, status });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let {
      email: { value: email },
      password: { value: password },
      rememberMe: { value: rememberMe },
    } = event.target as unknown as SignInForm;
    try {
      setLoading(true);
      let result = await api.post("/auth/signin", {
        email,
        password,
        rememberMe,
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-5xl leading-relaxed font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-sky-500">
            Gym App
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesse a sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ou{" "}
            <Link href="/signup">
              <a className="font-medium text-blue-600 hover:active:text-blue-500">
                clique aqui para criar a sua conta
              </a>
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-900">
                    Lembre de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500">
                    Esqueci minha senha
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" disabled={loading} variant="primary">
                  {loading ? <Spinner className="text-blue-100" /> : "Entrar"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Ou entrar com
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <GoogleSignIn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
