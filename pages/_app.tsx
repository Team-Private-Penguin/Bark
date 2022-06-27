import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "@auth0/nextjs-auth0";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <UserProvider>
      <Head>
        <title>Bark</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </UserProvider>
  );
}
