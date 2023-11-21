// const MainPage: any = () => {
//   return (
//     <div className=" w-full h-full bg-[#f4f7fc] dark:bg-[#0000]">
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//         <button
//           className={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-150 text-brand-blue-100 `}
//         >
//           Presale
//         </button>
//         <button
//           className={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-150 text-brand-blue-100 `}
//         >
//           Staking
//         </button>
//         <button
//           classNameName={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-150 text-brand-blue-100 `}
//         >
//           Governance
//         </button>
//         <button
//           classNameName={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-150 text-brand-blue-100 `}
//         >
//           Analytics
//         </button>
//       </div> */}
//     </div>
//   );
// };

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Input } from "@/components/FormElements";
import Analytics from "./analytics";
import axios from "axios";
import Header from "@/components/Typography/Header";
import LineChart from "@/components/chart/line-chart";
function MainPage() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  const [jobCount, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const getCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.joblab.ai/job/job-count-by-categories`
      );
      const jobCount = res.data;
      setCompanies(jobCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);
  const data = [
    {
      label: "Presale",
      value: "presale",
      title: "Welcome to JobLab Presale",
      desc: `
      JobLab Presale represents an exclusive opportunity for early supporters and contributors to secure JobLab tokens before the public launch. Participants in the presale gain a strategic advantage by accessing tokens at a discounted rate, setting the stage for potential future growth.`,
    },
    {
      label: "Staking",
      title: "Welcome to JobLab Staking",
      subTitle: "Stake JOBS to earn WORK rewards",
      value: "staking",
    },
    {
      label: "Governance",
      title: "Welcome to JobLab Governance",
      value: "governance",
      desc: `JobLab Governance serves as the backbone of our platform, ensuring transparency, fairness, and active participation in decision-making processes. Through a decentralized governance model, users have a voice in shaping the platform's policies and features.`,
    },
    {
      label: "Analytics",
      title: "Welcome to JobLab Analytics",
      value: "analytics",
      desc: `JobLab Analytics empowers users with robust insights and data-driven decision-making capabilities. Leveraging cutting-edge technology, our analytics platform provides a comprehensive view of job market trends, user engagement, and performance metrics.`,
    },
  ];

  return (
    <div className=" flex justify-center lg:px-[150px]  bg-[#f4f7fc] dark:bg-black p-[20px] ">
      <Tabs value="presale">
        <TabsHeader
          className="bg-transparent grid lg:grid-cols-4 grid-cols-2 gap-2"
          indicatorProps={{
            className: "dark:bg-blue-400 bg-blue-500  rounded ",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              // style={{ borderRadius: "10px" }}
              className="
              py-2 px-5  text-brand-black-50  bg-[#e2eaf8]  rounded"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="mt-[20px]">
          {data.map(({ value, desc, title, subTitle }) => (
            <TabPanel key={value} value={value}>
              <div className="rounded-lg flex flex-col items-center justify-center hover:shadow-container bg-white dark:bg-transparent dark:border dark:border-brand-dark-100 border border-black  pt-5 px-8 pb-8">
                {(value == "presale" ||
                  value == "staking" ||
                  value == "governance") && (
                  <>
                    {title && (
                      <h4 className="text-[25px] text-center text-brand-black-50 dark:text-brand-dark-50 mb-1 leading-6 font-medium">
                        {title}
                      </h4>
                    )}
                    {subTitle && <span className="mt-2 mb-2">{subTitle}</span>}
                    {desc && <>{desc}</>}
                    <ConnectWallet
                      theme={theme === "dark" ? "dark" : "light"}
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
                        subtitle:
                          "Connect your wallet to join the future of work",
                      }}
                      modalTitleIconUrl={
                        "https://api.joblab.ai/uploads/logos/chat-company.png"
                      }
                      // className="bg-brand-blue-450"
                      className={`py-2 px-5 text-[15px] rounded-[50px] border font-light bg-brand-blue-150  text-brand-blue-100 `}
                      style={{
                        fontSize: "15px",
                        fontWeight: 300,
                        margin: "0px 0px 0px 10px",
                        borderRadius: "10px",
                        color: "#2870d5",
                        // backgroundColor: "rgb(7 24 196 / var(--tw-bg-opacity))",
                        backgroundColor:
                          theme === "dark" ? "#61a5fa" : "#e2eaf8 ",
                      }}
                    />
                    <div className="flex-grow" />
                  </>
                )}
                {/* <button className="px-7 py-4  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                  Purchase Jobs Token
                </button> */}
                {value == "staking" && (
                  <div className="grid lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-1 gap-x-2">
                    {/* <button className="px-5 py-3  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      Stake
                    </button> */}
                    <Input
                      props={{
                        // ...register("fullName"),
                        placeholder: "0",
                      }}
                      // error={errors.fullName?.message}
                      // error={
                      //   touchedFields?.fullName
                      //     ? errors.fullName?.message || ""
                      //     : undefined
                      // }
                    />
                    <button className="px-4 py-2  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 dark:text-white  text-brand-dark-100 text-base rounded-lg">
                      Stake!
                    </button>
                    <button className="px-4 py-2  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 dark:text-white text-brand-dark-100 text-base rounded-lg">
                      Unstake!
                    </button>
                    <button className="px-4 py-2  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 dark:text-white  text-brand-dark-100 text-base rounded-lg">
                      Claim rewards!
                    </button>
                  </div>
                )}
                {value == "staking" && (
                  <div className="grid lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-x-2 mt-5 ">
                    <div className="px-6 py-4 grid grid-cols-1 bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      <span className="text-brand-black-50 dark:text-white font-medium">
                        Stake token balance
                      </span>
                      <span className="text-brand-black-50 dark:text-white">
                        0.0
                      </span>
                    </div>

                    <div className="px-6 py-4 grid grid-cols-1  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      <span className="text-brand-black-50 dark:text-white font-medium">
                        Reward token balance
                      </span>
                      <span className="text-brand-black-50 dark:text-white">
                        0.0
                      </span>
                    </div>
                    <div className="px-6 py-4 grid grid-cols-1  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      <span className="text-brand-black-50 dark:text-white font-medium">
                        Stakeed amount
                      </span>
                      <span className="text-brand-black-50 dark:text-white">
                        0.0
                      </span>
                    </div>
                    <div className="px-6 py-4 grid grid-cols-1 bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      <span className="text-brand-black-50 dark:text-white font-medium">
                        Current reward
                      </span>
                      <span className="text-brand-black-50 dark:text-white">
                        0.0
                      </span>
                    </div>
                  </div>
                )}
                {value == "presale" && (
                  <>
                    <div className="text-[14px] space-x-1 flex items-center mt-[10px]">
                      <span>Token Price:$ 0.25</span>
                    </div>
                    <div className="text-[14px] space-x-1 flex items-center">
                      <span>Supply:50M</span>
                    </div>
                    <div className="text-[14px] space-x-1 flex items-center">
                      <span>Market Cap: $1M</span>
                    </div>
                    <div className="text-[14px] space-x-1 flex items-center">
                      <span>Claim phase I: $0.25 by January 1,2024</span>
                    </div>
                    <div className="text-[14px] space-x-1 flex items-center">
                      <span>Claim phase II: $0.3 by Fabruary 1,2024</span>
                    </div>
                  </>
                )}
                {value == "analytics" && (
                  <div className="w-full bg-[#f4f7fc] dark:bg-[#0000]">
                    <div className=" pb-[100px] pbox mt-14">
                      <Header title="Total Jobs Count" />
                      <div className="flex flex-col gap-y-10 mt-5">
                        <div className="flex items-center justify-center p-5 bg-white dark:bg-transparent dark:border dark:border-brand-dark-100 h-[300px] shadow-container rounded-lg">
                          <LineChart data={jobCount} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
export default MainPage;
