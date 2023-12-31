import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import MobileMenu from "./MobileMenu";
import logoWhite from "../../../public/assets/logowhite2.png";
import logo from "../../../public/assets/mainlogo.svg";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { ConnectWallet } from "@thirdweb-dev/react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };
  useEffect(() => {
    setTheme("light");
  }, []);
  const { theme, setTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const returnLogo = (t: any) => {
    let cc = t == "dark";
    return (
      <>
        {!cc ? (
          <Image
            alt="company"
            src={logo}
            fill
            className="object-contain w-full h-full"
          />
        ) : (
          <Image
            alt="company"
            src={logoWhite}
            fill
            className="object-contain w-full h-full"
          />
        )}
      </>
    );
  };
  const themeColor = (t: any) => {
    let cc = t == "light";
    return (
      <>
        {cc ? (
          <MoonIcon className="text-blue-800 w-6 h-6" />
        ) : (
          <SunIcon className="text-yellow-400 w-6 h-6" />
        )}
      </>
    );
  };

  return (
    <nav className="fixed top-0 z-[9999] shadow-container bg-white dark:bg-[#000000] dark:border-b dark:border-brand-dark-100 dark:bg-opacity-95 w-full">
      <div
        // className={`pbox pb-[2px] pt-[4px] lg:grid lg:grid-cols-[1fr,280px] flex items-center justify-between`}
        className={`pbox pb-[2px] pt-[4px] lg:flex flex-row flex items-center justify-between`}
      >
        <div
          className="flex justify-between lg:flex "
          style={{ width: "100%" }}
        >
          {/* <section className="flex items-center"> */}
          <div className="relative aspect-video w-[95px]">
            <a href={"https://www.joblab.ai"}>{returnLogo(theme)}</a>
          </div>
          {/* </section> */}

          <div className="justify-center text-[25px] whitespace-nowrap font-light lg:hidden flex items-center  text-brand-black-50 dark:text-brand-dark-50">
            <ConnectWallet
              switchToActiveChain={true}
              modalTitle={"Web3 Connect"}
              modalSize={"wide"}
              welcomeScreen={{
                img: {
                  src: "https://api.joblab.ai/uploads/logos/chat-company.png",
                  width: 180,
                  height: 180,
                },

                title: "Your gateway to decentralized jobs",
                subtitle: "Connect your wallet to join the future of work",
              }}
              modalTitleIconUrl={
                "https://api.joblab.ai/uploads/logos/chat-company.png"
              }
              // className="bg-brand-blue-450"
              className={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-450 dark:text-white text-white `}
              style={{
                fontSize: "15px",
                fontWeight: 300,
                margin: "0px 0px 0px 10px",
                borderRadius: "50px",
                color: "#fff",
                // backgroundColor: "rgb(7 24 196 / var(--tw-bg-opacity))",
                backgroundColor: "#0718c4",
              }}
              theme={theme === "dark" ? "light" : "light"}
            />
            <button
              className="ml-2 cursor-pointer"
              onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {theme == "dark" ? (
                <SunIcon className="text-yellow-400 w-6 h-6" />
              ) : (
                <MoonIcon className="text-brand-blue-450 w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div className="justify-center text-[25px] whitespace-nowrap font-light lg:flex hidden items-center  text-brand-black-50 dark:text-brand-dark-50">
          <span
            className={`  ${
              theme === "dark"
                ? "text-yellow-400 border-yellow-400"
                : "text-brand-blue-450 border-brand-blue-450 "
            }  font-medium pb-1 pt-1  `}
          >
            JobLab Token Dashboard
          </span>
        </div>
        <div className="w-full lg:flex hidden items-center justify-end space-x-3">
          {/* testing walletConnect */}
          <button
            className="ml-10 cursor-pointer"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme == "dark" ? (
              <SunIcon className="text-yellow-400 w-6 h-6" />
            ) : (
              <MoonIcon className="text-brand-blue-450 w-6 h-6" />
            )}
          </button>
          <button
            className="ml-10 cursor-pointer"
            id="btn"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon
                className={`w-6 h-6  ${
                  theme === "dark" ? "text-white" : "text-brand-blue-450"
                }`}
              />
            ) : (
              <ArrowsPointingOutIcon
                className={`w-6 h-6  ${
                  theme === "dark" ? "text-white" : "text-brand-blue-450"
                }`}
              />
            )}
          </button>
          <ConnectWallet
            switchToActiveChain={true}
            modalTitle={"Web3 Connect"}
            modalSize={"wide"}
            welcomeScreen={{
              img: {
                src: "https://api.joblab.ai/uploads/logos/chat-company.png",
                width: 180,
                height: 180,
              },

              title: "Your gateway to decentralized jobs",
              subtitle: "Connect your wallet to join the future of work",
            }}
            modalTitleIconUrl={
              "https://api.joblab.ai/uploads/logos/chat-company.png"
            }
            // className="bg-brand-blue-450"
            className={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-450 dark:text-white text-white `}
            style={{
              fontSize: "15px",
              fontWeight: 300,
              margin: "0px 0px 0px 10px",
              borderRadius: "50px",
              color: "#fff",
              // backgroundColor: "rgb(7 24 196 / var(--tw-bg-opacity))",
              backgroundColor: "#0718c4",
            }}
            theme={theme === "dark" ? "dark" : "light"}
          />
        </div>
        {/* <div className="lg:hidden flex items-center">
          <button
            className="mr-5 cursor-pointer"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {themeColor(theme)}
          </button>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden flex items-center justify-center"
          >
            <MenuIcon className="w-5 h-5 text-brand-black-50 dark:text-brand-dark-50" />
          </button>
        </div> */}
      </div>
      {/* <MobileMenu setOpenMenu={setOpenMenu} openMenu={openMenu} /> */}
    </nav>
  );
};

export default Navbar;
