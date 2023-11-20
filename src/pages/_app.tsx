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
import { useEffect } from "react";
import Document from "next/document";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
} from "@thirdweb-dev/react";
import { PersistGate } from "redux-persist/integration/react";
import { BaseGoerli } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: any) {
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
    <ThirdwebProvider
      activeChain={BaseGoerli}
      clientId="c17ae4f3c142f9fb029795f0c6de71ef"
      autoConnect={false}
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
              <BubbleChat
                chatflowid="a633fc84-a322-460b-a6ea-359eb4786c73"
                apiHost="https://jobgpt.onrender.com"
                theme={{
                  button: {
                    backgroundColor: "#0718C4",
                    right: 20,
                    bottom: 20,
                    size: "large",
                    iconColor: "white",
                    // customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
                  },
                  chatWindow: {
                    welcomeMessage: "Hi there! How can I help",
                    backgroundColor: "#ffffff",
                    height: 600,
                    width: 400,
                    fontSize: 16,
                    poweredByTextColor: "#fff",
                    botMessage: {
                      backgroundColor: "#f7f8ff",
                      textColor: "#303235",
                      showAvatar: true,
                      avatarSrc:
                        "https://api.joblab.ai/uploads/logos/chat-company.png",
                    },
                    userMessage: {
                      backgroundColor: "#3B81F6",
                      textColor: "#ffffff",
                      showAvatar: true,
                      avatarSrc:
                        "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                      placeholder: "Type your question",
                      backgroundColor: "#ffffff",
                      textColor: "#303235",
                      sendButtonColor: "#3B81F6",
                    },
                  },
                }}
              />
              <Toaster position="top-right" />
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ThirdwebProvider>
  );
}
