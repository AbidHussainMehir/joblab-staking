/* eslint-disable @next/next/no-img-element */
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import logo from "../../../public/assets/mainlogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useTheme } from "next-themes";

interface MobileMenuProps {
  openMenu: boolean;
  setOpenMenu: any;
  size?: "lg" | "full";
}

const MobileMenu: FC<MobileMenuProps> = ({ openMenu, setOpenMenu, size }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpenMenu(false));

  const { theme, setTheme } = useTheme();

  return (
    <>
      <Transition
        className="fixed min-w-[300px] overflow-hidden z-[999] bg-[rgba(76,78,100,0.5)] bg-opacity-40 inset-0 lg:hidden"
        as="div"
        ref={ref}
        show={openMenu}
      >
        <Transition.Child
          enter="transition-transform duration-300"
          enterFrom="-translate-x-[100%]"
          enterTo="translate-x-[0px]"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-[0px]"
          leaveTo="-translate-x-[100%]"
          className={`w-full ${
            size === "lg" ? "max-w-md" : "max-w-[300px]"
          } left-0 absolute overflow-y-auto bg-white p-5 h-full shadow-2xl`}
        >
          <nav className="flex h-full gap-y-7 flex-col">
            <div className="flex -mt-2 pb-4 border-b border-brand-primary sticky top-0 z-20 items-center shadow-custom2 justify-between">
              <Link
                className="lg:mx-auto max-w-[120px] flex items-center justify-center w-full"
                href="/"
              >
                <div className="relative aspect-[100/60] mx-auto w-full max-w-[100px]">
                  <Image
                    alt="company"
                    src={logo}
                    fill
                    className="object-contain"
                  />
                </div>{" "}
              </Link>
              <button
                onClick={() => {
                  setOpenMenu(false);
                }}
                className="flex h-6 w-6 items-center justify-center "
              >
                <XMarkIcon className="w-7 stroke-[1.5] stroke-black" />
              </button>
            </div>

            <Link
              onClick={() => {
                setOpenMenu(false);
              }}
              href="/"
              className="flex items-center justify-start"
            >
              <div className="flex flex-col text-brand-black-50">
                <span>Home </span>
              </div>
            </Link>

            <ConnectWallet
              theme={theme === "dark" ? "dark" : "light"}
              switchToActiveChain={true}
              modalTitle={"Web3 Connect"}
              modalSize={"wide"}
              welcomeScreen={{
                img: {
                  src: `https://api.joblab.ai/uploads/logos/chat-company.png`,
                  width: 150,
                  height: 150,
                },
                title: "Your gateway to decentralized jobs",
                subtitle: "Connect your wallet to join the future of work",
              }}
              modalTitleIconUrl={`https://api.joblab.ai/uploads/logos/chat-company.png`}
              className="bg-brand-blue-450"
              style={{
                fontSize: "15px",
                fontWeight: 300,
                margin: "0px 0px 0px 10px",
                borderRadius: "50px",
                color: "#fff",
                backgroundColor: "rgb(7 24 196 / var(--tw-bg-opacity))",
              }}
            />
          </nav>
        </Transition.Child>
      </Transition>
    </>
  );
};

export default MobileMenu;
