import { FC } from "react";

interface FbIconProps {
  className: string;
}

const FbIcon: FC<FbIconProps> = ({ className }) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.86522 8.05066L7.22069 5.71472H4.96092V4.19128C4.96092 3.53113 5.26561 2.92175 6.28123 2.92175H7.32225V0.915894C7.32225 0.915894 6.3828 0.738159 5.49412 0.738159C3.64061 0.738159 2.42186 1.88074 2.42186 3.91199V5.71472H0.339828V8.05066H2.42186V13.7382H4.96092V8.05066H6.86522Z" />
    </svg>
  );
};

export default FbIcon;
