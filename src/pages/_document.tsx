// @ts-nocheck
import React, { FC } from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document: FC<any> = () => {
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&family=Roboto+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <body className="overflow-x-hidden min-w-[360px]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
