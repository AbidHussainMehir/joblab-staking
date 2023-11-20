import { FC } from "react";

interface SendIconProps {
  className: string;
}

const SendIcon: FC<SendIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.58 4.16001L4.12996 10C4.09391 10.017 4.06343 10.0439 4.04208 10.0775C4.02073 10.1111 4.0094 10.1502 4.0094 10.19C4.0094 10.2299 4.02073 10.2689 4.04208 10.3025C4.06343 10.3362 4.09391 10.363 4.12996 10.38L10.74 13.21C10.7647 13.2201 10.7872 13.235 10.8061 13.2539C10.825 13.2728 10.8399 13.2953 10.85 13.32L13.68 19.93C13.6969 19.9661 13.7238 19.9965 13.7574 20.0179C13.7911 20.0392 13.8301 20.0506 13.87 20.0506C13.9098 20.0506 13.9488 20.0392 13.9825 20.0179C14.0161 19.9965 14.043 19.9661 14.06 19.93L19.84 4.42001C19.8545 4.38367 19.8581 4.34385 19.8502 4.3055C19.8423 4.26715 19.8234 4.23195 19.7957 4.20427C19.768 4.17659 19.7328 4.15764 19.6945 4.14977C19.6561 4.1419 19.6163 4.14546 19.58 4.16001V4.16001Z"
        fill="#0157FF"
        fillOpacity="0.1"
        stroke="#0157FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7899 4.21002L10.8099 13.19"
        stroke="#0157FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
