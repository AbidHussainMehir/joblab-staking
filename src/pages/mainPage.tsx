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
import { ethers } from "ethers";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useTheme } from "next-themes";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useNetwork } from "@thirdweb-dev/react";

import { useEffect, useState } from "react";
import { Input } from "@/components/FormElements";
import Analytics from "./analytics";
import axios from "axios";
import Header from "@/components/Typography/Header";
import LineChart from "@/components/chart/line-chart";
import {
  REWARD_TOKEN_ADDRESSES,
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
} from "./../components/addresses";
import { Switch } from "@headlessui/react";
function MainPage() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);

  const address = useAddress();

  const { contract: stakeTokenContract } = useContract(
    STAKE_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    REWARD_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKE_CONTRACT_ADDRESSES,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const [jobCount, setCompanies] = useState<any[]>([]);
  const [loading1, setLoading] = useState<Boolean>(true);
  const [active, setActive] = useState("presale");
  const [stakeAmount, setStakeAmount] = useState<any>("");
  const [unstakeAmount, setUnstakeAmount] = useState<any>("");
  const [selectedNetwork, setNetwork] = useState(false);
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
  const data1 = [
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

  const stakeChangeHandler = (e: any) => {
    console.log(e.target.value);
    setStakeAmount(e.target.value);
  };
  const unstakeChangeHandler = (e: any) => {
    setUnstakeAmount(e.target.value);
  };

  const { data: tokenBalance, isLoading: loadingTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  const { data: StaketokenBalance, isLoading: StakeloadingTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const [{ error }, switchNetwork] = useNetwork();
  const changeToMainNet = async () => {
    if (!switchNetwork) {
      console.log("can not switch network");
      return;
    }
    const result = await switchNetwork(1);
    if (result.data) {
      console.log("Switched to Mumbai testnet successfully");
    } else {
      console.log("Error switching to Mumbai testnet", result.error);
    }
  };
  return (
    <div className=" flex justify-center lg:px-[150px]  bg-[#f4f7fc] dark:bg-black p-[20px] ">
      <Tabs value={active}>
        <TabsHeader
          className="bg-transparent grid lg:grid-cols-4 grid-cols-2 gap-2"
          indicatorProps={{
            className: "dark:bg-blue-400 bg-blue-500  rounded ",
          }}
        >
          {data1.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              // style={{ borderRadius: "10px" }}
              className={
                active === value
                  ? "text-white py-2 px-5    bg-[#e2eaf8]  rounded"
                  : "text-brand-black-50 py-2 px-5    bg-[#e2eaf8]  rounded"
              }
              onClick={() => setActive(value)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="mt-[20px]">
          {data1.map(({ value, desc, title, subTitle }) => (
            <TabPanel key={value} value={value}>
              <div className="rounded-lg flex flex-col items-center justify-center hover:shadow-containerbg-[#f4f7fc] dark:bg-transparent dark:border dark:border-brand-dark-100 border border-black  pt-5 px-8 pb-8">
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

                    <div className="flex-grow" />
                  </>
                )}
                {/* <button className="px-7 py-4  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                  Purchase Jobs Token
                </button> */}
                {value == "staking" && (
                  <>
                    <div className="flex p-2">
                      <span
                        className={`flex items-center gap-2 text-lg font-medium ${
                          selectedNetwork
                            ? "text-brand-gray-500 dark:text-white "
                            : " text-brand-blue-450 "
                        }`}
                      >
                        {/* <UserCircleIcon
                          className={`w-7 h-7 ${
                            employers
                              ? "text-brand-gray-500 dark:text-white "
                              : " text-brand-blue-450 "
                          }`}
                        /> */}
                        Ethereum
                      </span>
                      <Switch
                        checked={selectedNetwork}
                        onChange={() => setNetwork(!selectedNetwork)}
                        className={`m-2 relative inline-flex bg-brand-blue-450 h-7 w-14 items-center rounded-full`}
                      >
                        <span className="sr-only">Type</span>
                        <span
                          className={`${
                            selectedNetwork ? "translate-x-8" : "translate-x-1"
                          } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                      <span
                        className={`flex items-center gap-2 text-lg font-medium ${
                          selectedNetwork
                            ? "text-brand-blue-450"
                            : "  text-brand-gray-500 dark:text-white "
                        }`}
                      >
                        Polygon
                      </span>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-x-2 gap-y-2">
                      {/* <button className="px-5 py-3  bg-brand-blue-150 dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      Stake
                    </button> */}

                      <Web3Button
                        contractAddress={STAKE_CONTRACT_ADDRESSES}
                        action={async (contract: any) => {
                          await stakeTokenContract?.erc20.setAllowance(
                            STAKE_CONTRACT_ADDRESSES,
                            stakeAmount
                          );

                          await contract.call("stake", [
                            ethers.utils.parseEther(stakeAmount),
                          ]);
                          setStakeAmount(0);
                        }}
                        onSuccess={() => console.log("Success")}
                      >
                        Stake
                      </Web3Button>
                      <Web3Button
                        contractAddress={STAKE_CONTRACT_ADDRESSES}
                        action={async (contract: any) => {
                          await contract.call("withdraw", [
                            ethers.utils.parseEther(stakeAmount),
                          ]);
                          setStakeAmount(0);
                        }}
                        onSuccess={() => {
                          console.log("Unstaked Successfully");
                        }}
                      >
                        Unstake
                      </Web3Button>
                      <Web3Button
                        contractAddress={STAKE_CONTRACT_ADDRESSES}
                        action={async (contract: any) => {
                          await contract.call("claimRewards");
                          setStakeAmount(0);
                        }}
                        onSuccess={() =>
                          console.log("Reward Received Successfully")
                        }
                      >
                        Claim
                      </Web3Button>
                    </div>
                  </>
                )}
                {value == "staking" && (
                  <div className="grid  w-full lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 gap-x-2  mt-5  ">
                    <div className="px-6 py-4 grid grid-cols-1 border dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg bg-white">
                      <span className="text-brand-black-50 dark:text-white text-[20px] font-medium">
                        Stake Token
                      </span>
                      <span className="text-brand-black-50 dark:text-white text-[13px] font-medium">
                        $SCOIN
                      </span>
                      <span className="text-brand-black-50 dark:text-white">
                        {StaketokenBalance?.displayValue}
                      </span>
                    </div>

                    <div className="px-6 py-4 grid grid-cols-1  border dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg bg-white">
                      <span className="text-brand-black-50 dark:text-white text-[20px] font-medium">
                        Reward Token
                      </span>
                      <span className="text-brand-black-50 dark:text-white text-[13px] font-medium">
                        $REWARD
                      </span>
                      <span className="text-brand-black-50 dark:text-white">
                        {tokenBalance?.displayValue}
                      </span>
                    </div>
                    <div className="px-6 py-4 grid grid-cols-1  border dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg bg-white">
                      <span className="text-brand-black-50 dark:text-white text-[20px] font-medium">
                        Earn Reward Token
                      </span>
                      <div className="flex justify-center  items-center flex-col py-[25px]">
                        <span className="text-brand-black-50 dark:text-white text-[20px] font-medium">
                          Stake Token
                        </span>
                        <span className="text-brand-black-50 dark:text-white text-[13px] font-medium">
                          {stakeInfo && stakeInfo[0]
                            ? ethers.utils.formatEther(stakeInfo[0])
                            : 0}
                          &nbsp;$SCOIN
                        </span>
                      </div>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-3">
                        <input
                          onChange={stakeChangeHandler}
                          placeholder="0"
                          value={stakeAmount}
                          type="Number"
                          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-1  dark:bg-transparent border dark:border-white border-[#e5e7eb] placeholder:text-brand-gray-100 leading-[30px] w-full font-light  dark:text-white text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
                        />
                        <input
                          onChange={unstakeChangeHandler}
                          placeholder="0"
                          value={unstakeAmount}
                          type="Number"
                          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-1  dark:bg-transparent border dark:border-white border-[#e5e7eb] placeholder:text-brand-gray-100 leading-[30px] w-full font-light  dark:text-white text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
                        />
                        <button
                          className={`py-2 px-5 text-[15px] rounded-[10px] border font-light bg-brand-blue-150 text-brand-black-50 font-medium `}
                        >
                          Stake
                        </button>
                        <button
                          className={`py-2 px-5 text-[15px] rounded-[10px] border font-light bg-brand-blue-150 text-brand-black-50 font-medium`}
                        >
                          Unstake
                        </button>
                      </div>
                      {/* <span className="text-brand-black-50 dark:text-white "></span> */}
                    </div>
                    <div className="px-6 py-4 flex justify-center items-center flex-col border dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg bg-white">
                      <div className="flex justify-center items-center flex-col mt-[30px]">
                        <span className="text-brand-black-50 dark:text-white font-medium">
                          Reward Token:
                        </span>

                        <span className="text-brand-black-50 dark:text-white">
                          {stakeInfo && stakeInfo[0]
                            ? ethers.utils.formatEther(stakeInfo[1])
                            : 0}
                        </span>
                        <span className="text-brand-black-50 dark:text-white text-[13px] font-medium">
                          $REWARD
                        </span>
                      </div>
                      <div className="flex-grow" />
                      <button
                        className={`py-2 px-5 text-[15px] w-full rounded-[10px] border font-light bg-brand-blue-150 text-brand-black-50 font-medium `}
                      >
                        Claim
                      </button>
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
