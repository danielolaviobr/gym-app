import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gym App</title>
        <meta
          name="description"
          content="Track your progress and share with friends with the Gym App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col justify-between py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-5xl leading-relaxed font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 animate-text">
            Gym App
          </h1>
          <h2 className="mt-2 text-center text-xl font-extrabold text-gray-400">
            Evolua junto dos seus amigos
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 space-y-4">
            <div>
              <Link href="/signin">
                <a className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Acessar minha conta
                </a>
              </Link>
            </div>
            <div>
              <Link href="/signup">
                <a className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Me cadastrar
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
