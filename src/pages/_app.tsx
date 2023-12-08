// @ts-nocheck
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import Head from "next/head";
import { BubbleChat } from "flowise-embed-react";
import { useEffect, useState } from "react";
import Document from "next/document";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
} from "@thirdweb-dev/react";
import ChainContext from "./context/Chain";

import { PersistGate } from "redux-persist/integration/react";
import { BaseGoerli, Mumbai, Goerli } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: any) {
  const [selectedChain, setSelectedChain] = useState("goerli");
  console.log(ChainContext);
  const replaceName = () => {
    const badgeElement = document.getElementById("lite-badge");
    if (badgeElement) {
      badgeElement.innerHTML = "John";
    }
  };
  useEffect(() => {
    try {
      replaceName();
    } catch (error) {}
  }, []);
  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider
        activeChain={selectedChain}
        clientId="c17ae4f3c142f9fb029795f0c6de71ef"
        autoConnect={true}
        supportedWallets={[
          metamaskWallet({ recommended: true }),
          coinbaseWallet(),
          walletConnect(),
          trustWallet(),
        ]}
      >
        <ThemeProvider attribute="class">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                <Head>
                  <title>AI Job Matching Platform</title>
                  <meta
                    name="description"
                    content="AI Powered Job Matching Platform"
                  />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Toaster position="top-right" />
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </ThirdwebProvider>
    </ChainContext.Provider>
  );
}
