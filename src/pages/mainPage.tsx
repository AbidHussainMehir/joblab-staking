import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  ThirdwebSDK,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useNetwork } from "@thirdweb-dev/react";
import { VoteType } from "@thirdweb-dev/sdk";

import { useEffect, useState, useContext } from "react";
import { Input } from "@/components/FormElements";
import Header from "@/components/Typography/Header";
import LineChart from "@/components/chart/line-chart";
import {
  REWARD_TOKEN_ADDRESSES,
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
  ETH_REWARD_TOKEN_ADDRESSES,
  ETH_STAKE_CONTRACT_ADDRESSES,
  ETH_STAKE_TOKEN_ADDRESSES,
  VOTING_CONTRACT_ADDRESS,
} from "./../components/addresses";
import { Switch } from "@headlessui/react";
import ChainContext from "./context/Chain";
import Image from "next/image";
import logowhite from "../../public/assets/mainlogo2.svg";
import logo from "../../public/assets/logowhite.svg";
import EthermLogo from "../../public/assets/full-ethereum-logo-grey.svg";
import PolygonLogo from "../../public/assets/full-polygon-logo.svg";
import JobsTokenIcon from "../../public/assets/jobs-token-logo-transparent.svg";
import WorkTokenIcon from "../../public/assets/work-token-logo-transparent.svg";
import JobsTokenWhiteIcon from "../../public/assets/jobs-token-logo-white-transparent.svg";
import WorkTokenWhiteIcon from "../../public/assets/work-token-logo-white-transparent.svg";
import ReCharts from "../components/Charts/rechat";
import ReCharts2 from "../components/Charts/rechat2";
import axios from "axios";
function MainPage() {
  const [jobCount, setCompanies] = useState<any[]>([]);
  const [loading1, setLoading] = useState<Boolean>(true);
  const [active, setActive] = useState("presale");
  const [stakeAmount, setStakeAmount] = useState<any>("");
  const [unstakeAmount, setUnstakeAmount] = useState<any>("");
  const [selectedNetwork, setNetwork] = useState(false);
  const [stakeAddress, setStakeAddress] = useState(STAKE_CONTRACT_ADDRESSES);
  const [rewardTokenAddres, setRewardTokenAddress] = useState(
    REWARD_TOKEN_ADDRESSES
  );
  const [stakingTokenAddress, setStakingTokenAddress] = useState(
    STAKE_TOKEN_ADDRESSES
  );
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);

  const address = useAddress();
  useEffect(() => {
    if (selectedNetwork) {
      setStakeAddress(STAKE_CONTRACT_ADDRESSES);
      setRewardTokenAddress(REWARD_TOKEN_ADDRESSES);
      setStakingTokenAddress(STAKE_TOKEN_ADDRESSES);
      setSelectedChain("mumbai");
    } else {
      setSelectedChain("goerli");
      setStakeAddress(ETH_STAKE_CONTRACT_ADDRESSES);
      setRewardTokenAddress(ETH_REWARD_TOKEN_ADDRESSES);
      setStakingTokenAddress(ETH_STAKE_TOKEN_ADDRESSES);
    }
  }, [selectedNetwork]);

  const { contract: stakeTokenContract } = useContract(
    stakingTokenAddress,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    rewardTokenAddres,
    "token"
  );
  const { contract: stakeContract } = useContract(stakeAddress, "custom");

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  const { contract: tokenDrop } = useContract(
    stakingTokenAddress,
    "token-drop"
  );
  // console.log(tokenDrop)

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const weiToEther = (wei: any) => {
    const ether = wei / Math.pow(10, 18);
    return ether;
  };

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
      title: "JOBS Pre-Sale Token Drop",
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

  const [droptokenValue, setDropTokenValue] = useState();
  const [proposal, setProposal] = useState<any>();
  const [proposalVotes, setProposalVotes] = useState<any>();
  const sendDropToken = async () => {
    if (droptokenValue && address) {
      try {
        let amount = String(droptokenValue);
        console.log(amount);

        const tx = await tokenDrop?.erc20.claim(amount);
        console.log(tx);
        toast.success("Tokens Claimed Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        console.log(err);
        toast.error("Error while Claiming.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Please Enter Valid Amount or Connect Wallet", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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

  const [{ data, error }, switchNetwork] = useNetwork();
  console.log("data:", data?.chain?.chainId);

  const { contract: voteContract }: any = useContract(VOTING_CONTRACT_ADDRESS);

  const fetchProposals = async () => {
    if (!proposalVotes) {
      const data = await voteContract?.call("getAllProposals");
      if (data) {
        console.log(data[0].proposalId.toString());
        const votesData = await voteContract?.call("proposalVotes", [
          data[0].proposalId,
        ]);
        console.log(votesData);
        console.log(data);
        setProposalVotes(votesData);
        setProposal(data);
      }
    }
  };
  useEffect(() => {
    fetchProposals();
  });

  const voteYes = async () => {
    try {
      console.log(String(proposal[0].proposalId));
      const voteType = VoteType.For;
      if (voteContract) {
        const voteTx = await voteContract.vote(
          proposal[0].proposalId,
          voteType,
          "I like this proposal"
        );
        toast.success("Successfully Voted for Propoal.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(voteTx);
      }
    } catch (err) {
      toast.error("Error while casting the Vote", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const voteNo = async () => {
    try {
      console.log(String(proposal[0].proposalId));
      const voteType = VoteType.Against;
      if (voteContract) {
        const voteTx = await voteContract.vote(
          proposal[0].proposalId,
          voteType,
          "I don't like thsi proposal"
        );
        toast.success("Successfully Voted Againt Proposal", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(voteTx);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while casting the Vote", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const voteAbstrain = async () => {
    try {
      console.log(String(proposal[0].proposalId));
      const voteType = VoteType.Abstain;
      const voteTx = await voteContract.vote(
        proposal[0].proposalId,
        voteType,
        "Don't want to answer this"
      );

      toast.success("Successfully Voted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(voteTx);
    } catch (err) {
      console.log(err);
      toast.error("Error while casting the Vote", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className=" flex justify-center  bg-[#f4f7fc] dark:bg-black p-[20px] ">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Tabs value={active}>
        <TabsHeader
          className="max-w-screen-sm bg-transparent grid lg:grid-cols-4 grid-cols-2 gap-2"
          indicatorProps={{
            className: "bg-brand-blue-450 rounded ",
          }}
        >
          {data1.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              // style={{ borderRadius: "10px" }}
              className={
                active === value
                  ? "text-white py-2 px-5 bg-brand-blue-450  rounded"
                  : "text-brand-black-50 py-2 px-5    bg-[#e2eaf8]  rounded"
              }
              onClick={() => setActive(value)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="mt-[20px] max-w-screen-sm">
          {data1.map(({ value, desc, title, subTitle }) => (
            <TabPanel key={value} value={value}>
              <div className="rounded-lg flex flex-col items-center justify-center hover:shadow-containerbg-[#f4f7fc] dark:bg-transparent dark:border dark:border-brand-dark-100 border border-black  pt-5 px-3 pb-3">
                {value == "governance" && (
                  <>
                    {title && (
                      <h4 className="text-[25px] text-center text-brand-black-50 dark:text-brand-dark-50 mb-1 leading-6 font-medium">
                        {title}
                      </h4>
                    )}
                    {subTitle && <span className="mt-2 mb-2">{subTitle}</span>}
                    {desc && <>{desc}</>}
                    {proposal && proposalVotes && (
                      <>
                        <div className="my-5 bg-green-300 p-5 rounded-lg animate-pulse">
                          {proposal[0].description}
                        </div>

                        <div className="flex space-x-5 justify-around">
                          <Web3Button
                            action={() => voteYes()}
                            contractAddress={VOTING_CONTRACT_ADDRESS}
                          >
                            {weiToEther(proposalVotes.forVotes.toString())} Yes
                          </Web3Button>
                          <Web3Button
                            action={() => voteNo()}
                            contractAddress={VOTING_CONTRACT_ADDRESS}
                          >
                            {weiToEther(proposalVotes.againstVotes.toString())}{" "}
                            No
                          </Web3Button>
                          <Web3Button
                            action={() => voteAbstrain()}
                            contractAddress={VOTING_CONTRACT_ADDRESS}
                          >
                            {weiToEther(proposalVotes.abstainVotes.toString())}{" "}
                            Abstain
                          </Web3Button>
                        </div>
                      </>
                    )}

                    <div className="flex-grow" />
                  </>
                )}

                {value == "staking" && (
                  <>
                    {title && (
                      <h4 className="text-[25px] text-center text-brand-black-50 dark:text-brand-dark-50 mb-1 leading-6 font-medium">
                        {title}
                      </h4>
                    )}
                    {subTitle && <span className="mt-2 mb-2">{subTitle}</span>}
                    <div className="flex p-2">
                      <Image
                        alt="company"
                        src={EthermLogo}
                        className="object-contain w-20"
                        style={{
                          background: theme == "dark" ? "#fff" : "",
                          padding: "4px",
                          borderRadius: "10px",
                          fill: "#fff",
                        }}
                      />
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
                      <Image
                        alt="company"
                        src={PolygonLogo}
                        className="object-contain w-20"
                        style={{
                          background: theme == "dark" ? "#fff" : "",
                          padding: "4px",
                          borderRadius: "10px",
                          fill: "#fff",
                        }}
                      />
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-x-2 gap-y-2"></div>
                  </>
                )}
                {value == "staking" && (
                  <div className="grid  w-full lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 gap-x-2">
                    <div className=" shadow-md px-6 py-4 grid items-center hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#2b2bed4a] bg-gradient-to-r from-[#f9fafb] to-[#2b2bed29] grid-cols-2 border dark:bg-gradient-to-r dark:from-[#ada5a536] dark:to-[#0a0affad] dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      {theme == "light" ? (
                        <Image
                          alt="company"
                          src={JobsTokenIcon}
                          className="object-contain w-23"
                          style={{
                            padding: "4px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <Image
                          alt="white token"
                          src={JobsTokenWhiteIcon}
                          className="object-contain w-23"
                          style={{
                            padding: "4px",
                            borderRadius: "10px",
                          }}
                        />
                      )}
                      <div>
                        <div className="py-4">
                          <span
                            className="text-brand-black-50 dark:text-white text-[15px] text-item rounded-md text-item rounded-md px-2 py-1	"
                            style={{ fontWeight: 400 }}
                          >
                            Un-Staked JOBS
                          </span>
                        </div>
                        <div>
                          <span
                            className="text-brand-black-50 dark:text-white text-[15px] text-item rounded-md text-item rounded-md px-2 py-1	"
                            style={{ fontWeight: 400 }}
                          >
                            {StaketokenBalance?.displayValue}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* #f3f4f6 var(--tw-gradient-to-position) */}
                    <div className=" shadow-md px-6 py-4 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#31a14e8a] bg-gradient-to-r from-[#f3f4f6] to-[#68c07f70] grid grid-cols-2 items-center border dark:bg-gradient-to-r dark:from-[#000] dark:to-[#31a14e8a] dark:border dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg">
                      {theme == "light" ? (
                        <Image
                          alt="Work logo"
                          src={WorkTokenIcon}
                          className="object-contain w-23"
                          style={{
                            padding: "4px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <Image
                          alt="Work logo"
                          src={WorkTokenWhiteIcon}
                          className="object-contain w-23"
                          style={{
                            padding: "4px",
                            borderRadius: "10px",
                          }}
                        />
                      )}
                      <div>
                        <div className="py-4">
                          <span
                            className="text-brand-black-50 dark:text-white text-[15px] text-item rounded-md px-2 py-1"
                            style={{ fontWeight: 400 }}
                          >
                            Claimed WORK
                          </span>
                        </div>
                        <div>
                          <span
                            className="text-brand-black-50 dark:text-white text-[15px] text-item rounded-md text-item rounded-md px-2 py-1	"
                            style={{ fontWeight: 400 }}
                          >
                            {parseInt(
                              tokenBalance?.displayValue as any
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="shadow-md	 px-4 py-4 grid grid-cols-1  hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#2b2bed4a] bg-gradient-to-r from-[#f9fafb] to-[#2b2bed29]   border-[1px] dark:bg-gradient-to-r dark:from-[#ada5a536] dark:to-[#0a0affad]  dark:border  mt-3 text-brand-blue-100 text-base rounded-lg ">
                      {/* <span className="flex justify-center text-brand-black-50 dark:text-white text-[20px] font-medium">
                        Total Jobs:0
                      </span> */}
                      <div className="flex justify-center  items-center flex-col py-[10px]">
                        <span
                          className="text-brand-black-50 dark:text-white text-[20px] text-item rounded-md px-2 py-2	"
                          style={{ fontWeight: 400 }}
                        >
                          Staked Jobs
                        </span>
                        <span
                          className="mt-2 text-brand-black-50 dark:text-white text-[20px] text-item rounded-md px-2 py-2	"
                          style={{ fontWeight: 400 }}
                        >
                          {stakeInfo && stakeInfo[0]
                            ? ethers.utils.formatEther(stakeInfo[0])
                            : 0}
                        </span>
                      </div>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-3">
                        <input
                          onChange={stakeChangeHandler}
                          placeholder="0"
                          value={stakeAmount}
                          type="Number"
                          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-1  dark:bg-transparent border[1px] border dark:border-white border-[#000] placeholder:text-brand-gray-500 text-black dark:text-white dark:placeholder:text-slate-300	 leading-[30px] w-full font-light  dark:text-white text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
                        />
                        <input
                          onChange={unstakeChangeHandler}
                          placeholder="0"
                          value={unstakeAmount}
                          type="Number"
                          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-1  dark:bg-transparent border dark:border-white border-[#000] placeholder:text-brand-gray-500 text-black dark:text-white dark:placeholder:text-slate-300 leading-[30px] w-full font-light  dark:text-white text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
                        />
                        <Web3Button
                          contractAddress={stakeAddress}
                          action={async (contract: any) => {
                            await stakeTokenContract?.erc20.setAllowance(
                              stakeAddress,
                              stakeAmount
                            );
                            await contract.call("stake", [
                              ethers.utils.parseEther(stakeAmount),
                            ]);
                            setStakeAmount(0);
                          }}
                          onSuccess={() => {
                            toast.success("Tokens Staked Successfully", {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }}
                          onError={(e) => {
                            console.log(e);
                            toast.error(e.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }}
                          style={{
                            minWidth: "120px",
                            padding: "5px",
                            fontWeight: 400,
                            background: "#0718C4",
                            color: "#fff",
                          }}
                        >
                          Stake
                        </Web3Button>
                        <Web3Button
                          contractAddress={stakeAddress}
                          action={async (contract: any) => {
                            await contract.call("withdraw", [
                              ethers.utils.parseEther(unstakeAmount),
                            ]);
                            setUnstakeAmount(0);
                          }}
                          onSuccess={() => {
                            toast.success("Tokens Unstaked Successfully.", {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }}
                          onError={(e) => {
                            console.log(e);
                            toast.error(e.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }}
                          style={{
                            minWidth: "120px",
                            padding: "5px",
                            fontWeight: 400,
                            background: "#0718C4",
                            color: "#fff",
                          }}
                        >
                          Unstake
                        </Web3Button>
                      </div>
                    </div>
                    <div className=" shadow-md	px-4 py-4 flex justify-center items-center flex-col  hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#31a14e8a] bg-gradient-to-r from-[#f3f4f6] to-[#68c07f70]  border-[1px] dark:bg-gradient-to-r dark:from-[#000] dark:to-[#31a14e8a]  mt-3 text-brand-blue-100 text-base rounded-lg">
                      <div className="flex justify-center items-center flex-col">
                        {/* <span className="text-brand-black-50 dark:text-white text-[20px] font-medium">
                          Claimed WORK:0
                        </span> */}

                        <div className="flex justify-center  items-center flex-col py-[10px]">
                          <span
                            className="text-brand-black-50 dark:text-white text-[20px] text-item rounded-md px-2 py-2"
                            style={{ fontWeight: 400 }}
                          >
                            Current WORK
                          </span>
                          <span
                            className="mt-2 mb-[15px] text-brand-black-50 dark:text-white text-[20px] text-item rounded-md px-2 py-2"
                            style={{ fontWeight: 400 }}
                          >
                            {stakeInfo && stakeInfo[0]
                              ? parseInt(
                                  ethers.utils.formatEther(stakeInfo[1])
                                ).toFixed(2)
                              : 0}
                          </span>{" "}
                        </div>
                      </div>
                      <div className="flex-grow" />
                      <Web3Button
                        contractAddress={stakeAddress}
                        action={async (contract: any) => {
                          await contract.call("claimRewards");
                          setStakeAmount(0);
                        }}
                        onSuccess={() => {
                          toast.success("Reward Claim Successfully.", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }}
                        onError={(e) => {
                          console.log(e.message);
                          toast.error(e.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }}
                        style={{
                          minWidth: "120px",
                          padding: "5px",
                          fontWeight: 400,
                          background: "#0718C4",
                          color: "#fff",
                        }}
                      >
                        Claim
                      </Web3Button>
                    </div>
                  </div>
                )}
                {value == "presale" && (
                  <>
                    {title && (
                      <h4 className="text-[25px] text-center text-brand-black-50 dark:text-brand-dark-50 mb-1 leading-6 font-medium">
                        {title}
                      </h4>
                    )}

                    <div className="px-6 py-4 grid grid-cols-1 ">
                      <div className="flex justify-center">
                        <Image
                          alt="company"
                          src={EthermLogo}
                          className="object-contain w-20"
                          style={{
                            background: theme == "dark" ? "#fff" : "",
                            padding: "4px",
                            borderRadius: "10px",
                            fill: "#fff",
                          }}
                        />
                        <Switch
                          checked={selectedNetwork}
                          onChange={() => setNetwork(!selectedNetwork)}
                          className={`m-2 relative inline-flex bg-brand-blue-450 h-7 w-14 items-center rounded-full`}
                        >
                          <span className="sr-only">Type</span>
                          <span
                            className={`${
                              selectedNetwork
                                ? "translate-x-8"
                                : "translate-x-1"
                            } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                        <Image
                          alt="company"
                          src={PolygonLogo}
                          className="object-contain w-20"
                          style={{
                            background: theme == "dark" ? "#fff" : "",
                            padding: "4px",
                            borderRadius: "10px",
                            fill: "#fff",
                          }}
                        />
                      </div>
                      <div
                        style={{ backgroundColor: "rgb(7, 24, 196)" }}
                        className="w-full max-w-[300px] m-auto shadow-blue-500/100  drop-shadow-lg         inset-0  flex flex-col items-center justify-center overflow-y-auto p-2 h-[180px] rounded-lg shadow-2xl"
                      >
                        <div className="flex items-center justify-center shadow-xl drop-shadow-lg w-[100%]">
                          <div className=" py-4 h-[140px] cursor-pointer	  my-[5px] relative w-[260px]  border dark:bg-transparent dark:border dark:border-brand-dark-200 mt-3 text-brand-blue-100 text-base rounded-lg bg-white shadow-2xl drop-shadow-lg max-w-sm		">
                            {theme === "dark" ? (
                              <Image
                                alt="company"
                                src={logo}
                                fill
                                className="object-contain "
                              />
                            ) : (
                              <Image
                                alt="company"
                                src={logowhite}
                                fill
                                className="object-contain "
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-center  w-[100%] mt-6">
                        <div className=" py-5 my-[45px] relative  h-full w-[260px]  border dark:bg-transparent dark:border dark:border-brand-dark-100 mt-3 text-brand-blue-100 text-base rounded-lg bg-white max-w-sm		">
                          {theme === "dark" ? (
                            <Image
                              alt="company"
                              src={logo}
                              fill
                              className="object-contain "
                            />
                          ) : (
                            <Image
                              alt="company"
                              src={logowhite}
                              fill
                              className="object-contain "
                            />
                          )}
                        </div>
                      </div> */}
                      <div className="flex justify-center">
                        <div
                          className="grid h-[10px] grid-cols-2 flex items-center justify-center gap-x-2 mt-[20px]  "
                          style={{ maxWidth: "300px" }}
                        >
                          <input
                            onChange={(e: any) =>
                              setDropTokenValue(e.target.value)
                            }
                            placeholder="0"
                            value={droptokenValue}
                            type="Number"
                            className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-1  dark:bg-transparent border dark:border-white border-[#000] placeholder:text-brand-gray-500 text-black dark:text-white dark:placeholder:text-slate-300  leading-[30px] w-full font-light  dark:text-white text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
                          />
                          <Web3Button
                            action={sendDropToken}
                            contractAddress={stakingTokenAddress}
                            className={`[appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-1  dark:bg-transparent border dark:border-white border-[#e5e7eb] placeholder:text-brand-gray-100 leading-[30px] w-full font-light  dark:text-white text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
                            style={{
                              height: "30px",
                              minWidth: "120px",
                              padding: "5px",
                              fontWeight: 400,
                              background: "#0718C4",
                              color: "#fff",
                            }}
                          >
                            Buy JOBS
                          </Web3Button>
                        </div>
                      </div>
                      <span className="mt-10 flex justify-center text-center dark:text-white text-[green]">
                        <span className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border   dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-3">
                          2500000.0 minted
                        </span>
                      </span>
                      <span className="mt-3 py-2 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-3">
                        <span className=" text-brand-black-50 pt-2 dark:text-white text-[14px] font-regular">
                          JobLab presale presents an opportunity for early
                          adopters and believers to purchase JOBS token with
                          unique tokenomics at a significant discount to future
                          project value and token price.
                        </span>
                        <span className="text-brand-black-50 pt-2 dark:text-white text-[14px] font-regular">
                          JobLab pairs candidates and employers with powerful Al
                          matching and democratizes the future of work with Web3
                          freelancing. We are a growing team driving to be the
                          next Crypto AI unicorn. With your support, we are
                          cultivating the fastest growing, impactful and useful
                          community in the space today.
                        </span>
                      </span>
                      <div className="flex justify-center">
                        <div className="justify-center mt-4">
                          <div className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-2">
                            <span className="text-brand-black-50 dark:text-white text-[14px] font-medium pr-2">
                              Token Price:
                            </span>
                            <span className="text-brand-black-50 dark:text-white text-[14px] font-regular">
                              $0.20
                            </span>
                          </div>
                          <div className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-2">
                            <span className="text-brand-black-50 dark:text-white text-[14px] font-medium pr-2">
                              Supply:
                            </span>
                            <span className="text-brand-black-50 dark:text-white text-[14px] font-regular">
                              21M (no inflation)
                            </span>
                          </div>
                          <div className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-2">
                            <span className="text-brand-black-50  dark:text-white text-[14px] font-regular">
                              Stake JOBS for WORK rewards
                            </span>
                          </div>
                          <div className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-2">
                            <span className="text-brand-black-50  dark:text-white text-[14px] font-regular">
                              Use JOBS to Vote on Proposals
                            </span>
                          </div>
                          <div className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-2">
                            <span className="text-brand-black-50  dark:text-white text-[14px] font-regular">
                              Use JOBS to hire or get hired
                            </span>
                          </div>
                          <div className="flex justify-center mt-2 py-1 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f4f5f7] bg-gradient-to-r from-[#f3f4f6] to-[#f9fafb]  items-center  border  dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#6969699c] text-base rounded-lg px-2">
                            <span className="text-brand-black-50 dark:text-white text-[14px] font-regular">
                              Multi-chain EVM token support
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {value == "analytics" && (
                  <div className="w-full bg-[#f4f7fc] dark:bg-[#0000]">
                    <div className="pb-[20px] pbox mt-5">
                      <div className="text-brand-black-50 flex items-center justify-center  w-full text-center">
                        <span className="text-brand-black-50 dark:text-white text-[24px] font-medium">
                          JOBS Distribution
                        </span>
                      </div>
                      <div className="flex flex-col gap-y-5 mt-5">
                        <div className="flex items-center shadow-xl justify-center p-5 bg-white dark:bg-transparent dark:border dark:border-brand-dark-100 h-[300px] shadow-container rounded-lg">
                          <ReCharts />
                        </div>
                        <div className="mt-5 text-brand-black-50 flex items-center justify-center  w-full text-center">
                          <span className="text-brand-black-50 dark:text-white text-[24px] font-medium">
                            WORK Distribution
                          </span>
                        </div>
                        <div className="flex items-center shadow-xl justify-center p-5 pt-2 bg-white dark:bg-transparent dark:border dark:border-brand-dark-100 h-[300px] shadow-container rounded-lg">
                          <ReCharts2 />
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
