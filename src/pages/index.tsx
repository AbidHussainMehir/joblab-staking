// @ts-nocheck
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@/components/Typography/Header";
import Button from "../components/Button";
import aggr from "../../public/assets/aggr.svg";
import applicant from "../../public/assets/applicant.svg";
import leader from "../../public/assets/leader.svg";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import MainPage from "./mainPage";
// import MainPage from "@/components/MainPage";
export default function Home() {
  return (
    <>
      <Head>
        <title>AI Job Matching Platform</title>
        <meta name="description" content="AI Powered Job Matching Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white dark:bg-black mt-[60px]">
        <MainPage />
      </main>
    </>
  );
}
