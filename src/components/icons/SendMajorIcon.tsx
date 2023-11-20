import { FC } from "react";

interface SendMajorIconProps {
  className: string;
}

const SendMajorIcon: FC<SendMajorIconProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.26278 1.82405C3.53298 1.6293 3.89319 1.61414 4.17879 1.78551L16.6788 9.2855C16.9298 9.43611 17.0834 9.70736 17.0834 10.0001C17.0834 10.2928 16.9298 10.5641 16.6788 10.7147L4.17879 18.2147C3.89319 18.386 3.53298 18.3709 3.26278 18.1761C2.99259 17.9814 2.8643 17.6444 2.93655 17.3193L4.37786 10.8334L8.75 10.8334C9.21024 10.8334 9.58334 10.4603 9.58334 10.0001C9.58334 9.53984 9.21024 9.16675 8.75 9.16675L4.37786 9.16675L2.93655 2.68086C2.8643 2.35572 2.99259 2.01879 3.26278 1.82405Z"
        fill="white"
      />
    </svg>
  );
};

export default SendMajorIcon;
