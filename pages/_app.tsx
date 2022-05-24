import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<Spinner className="text-neutral-500" />}>
      <Component {...pageProps} />
    </Suspense>
  );
}

export default MyApp;
