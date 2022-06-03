import { Fragment, useEffect, useState } from "react";

import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SSRProvider } from "@react-aria/ssr";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Toaster, resolveValue } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { Header } from "../components/Header";
import { SUPPORTED_CHAINS } from "../const";
import "../css/tailwind.css";

const { chains, provider } = configureChains(SUPPORTED_CHAINS, [
  alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Smol Quests",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 2000,
      refetchOnWindowFocus: false,
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Smol Quests</title>
        <meta name="title" content="Smol Quests" />
        <meta
          name="description"
          content="Wrap your Smol to go on quests and transform your Smol."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smol.quest" />
        <meta property="og:title" content="Smol Quests" />
        <meta
          property="og:description"
          content="Wrap your Smol to go on quests and transform your Smol."
        />
        <meta
          property="og:image"
          content="https://smol.quest/img/seo-banner.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://smol.quest" />
        <meta property="twitter:title" content="Smol Quests" />
        <meta
          property="twitter:description"
          content="Wrap your Smol to go on quests and transform your Smol."
        />
        <meta
          property="twitter:image"
          content="https://smol.quest/img/seo-banner.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="XBZCEUKN"
          defer
        ></script>
      </Head>
      <ThemeProvider attribute="class">
        <SSRProvider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              theme={darkTheme({
                accentColor: "#7752de",
              })}
            >
              <QueryClientProvider client={queryClient}>
                <Main Component={Component} pageProps={pageProps} />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </RainbowKitProvider>
          </WagmiConfig>
          <Toaster
            position="top-left"
            toastOptions={{
              success: {
                duration: 10000,
              },
            }}
          >
            {(t) => (
              <Transition
                show={t.visible}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full bg-gray-primary shadow-dark-sharp pointer-events-auto overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0">
                        {(() => {
                          switch (t.type) {
                            case "success":
                              return (
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                              );
                            case "error":
                              return (
                                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                              );
                            default:
                              return (
                                <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
                              );
                          }
                        })()}
                      </div>
                      <div className="ml-3 w-0 flex-1">
                        <p className="text-sm text-white">
                          {resolveValue(t.message, t)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            )}
          </Toaster>
        </SSRProvider>
      </ThemeProvider>
    </>
  );
}

const Main = ({ pageProps, Component }) => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
