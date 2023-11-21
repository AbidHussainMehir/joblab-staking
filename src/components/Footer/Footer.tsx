import Image from "next/image";
import { FC } from "react";
import TwIcon from "../icons/TwIcon";
import YtIcon from "../icons/YtIcon";
import logoWhite from "../../../public/assets/logo-white.png";
import Link from "next/link";
import DiscordIconIcon from "../icons/DiscordIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import useUser from "@/hooks/api/useUser";
import { useSelector } from "react-redux";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const { data } = useUser();
  const isLogged = useSelector((state: any) => state.user.isLogged);
  return (
    <footer className="bg-brand-blue-450 dark:bg-[#111111] dark:border-t dark:border-brand-gray-100 py-12">
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-y-8 w-full pbox">
        <div className="flex flex-col items-start text-white dark:text-brand-dark-50">
          <span className=" text-lg font-medium leading-7 mb-4 cursor-pointer">
            JobLab.ai
          </span>
          <span className=" cursor-pointer text-sm leading-[30px]">
            43 west 23 Street New York, <br /> NY 10010
          </span>
          <Link
            href={"mailto:Bobby@JobLab.ai"}
            className=" text-sm leading-[30px]"
          >
            Bobby@JobLab.ai
          </Link>
        </div>
        {
          <div className="flex flex-col gap-y-7 text-white dark:text-brand-dark-50 ">
            <h4 className="text-lg font-medium cursor-pointer">
              For Candidates
            </h4>
            <ul className="space-y-[15px] text-sm font-light">
              <li>
                <Link href={"/"}>Upload Resume</Link>
              </li>
              <li>
                <Link href={"/candidates-dashboard/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <Link href={"/"}>Find Jobs</Link>
              </li>
            </ul>
          </div>
        }
        {
          <div className="flex flex-col gap-y-7 text-white dark:text-brand-dark-50 ">
            <h4 className="text-lg font-medium cursor-pointer">
              For Employers
            </h4>
            <ul className="space-y-[15px] text-sm font-light">
              <li>
                <Link href={"/"}>Post Job</Link>
              </li>
              <li>
                <Link href={"/employers-dashboard/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <Link href={"/"}>Find Candidates</Link>
              </li>
            </ul>
          </div>
        }
        <div className="flex flex-col gap-y-7 text-white dark:text-brand-dark-50 ">
          <h4 className="text-lg font-medium cursor-pointer">Our Roadmap</h4>
          <ul className="space-y-[15px] text-sm font-light">
            <li>
              <Link href={"/"}>Product Roadmap</Link>
            </li>
            <li>
              <Link href={"/"}>RecruitAI</Link>
            </li>
            <li>
              <Link href={"/"}>HR</Link>
            </li>
          </ul>
        </div>
        <div className="text-white dark:text-brand-dark-50">
          <div className="relative aspect-video w-[110px]">
            <Link href={"/"}>
              <Image
                alt="company"
                src={logoWhite}
                fill
                className="object-contain w-full h-full"
              />
            </Link>
          </div>
          <div className="space-x-8 flex items-center mt-4 ml-2">
            <Link href={"/"}>
              <TwIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href={"/"}>
              <DiscordIconIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href={"/"}>
              <YtIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href={"/"}>
              <LinkedinIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
