import { FC } from "react";

interface InstaIconProps {
  className: string;
}

const InstaIcon: FC<InstaIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.7509 3.31824C4.1259 3.31824 2.83098 4.63855 2.83098 6.23816C2.83098 7.86316 4.1259 9.15808 5.7509 9.15808C7.35051 9.15808 8.67082 7.86316 8.67082 6.23816C8.67082 4.63855 7.35051 3.31824 5.7509 3.31824ZM5.7509 8.14246C4.70988 8.14246 3.8466 7.30457 3.8466 6.23816C3.8466 5.19714 4.68449 4.35925 5.7509 4.35925C6.79191 4.35925 7.62981 5.19714 7.62981 6.23816C7.62981 7.30457 6.79191 8.14246 5.7509 8.14246ZM9.45793 3.21667C9.45793 2.83582 9.15324 2.53113 8.77238 2.53113C8.39152 2.53113 8.08684 2.83582 8.08684 3.21667C8.08684 3.59753 8.39152 3.90222 8.77238 3.90222C9.15324 3.90222 9.45793 3.59753 9.45793 3.21667ZM11.3876 3.90222C11.3368 2.98816 11.1337 2.17566 10.4736 1.5155C9.8134 0.855347 9.0009 0.652222 8.08684 0.60144C7.14738 0.550659 4.32902 0.550659 3.38957 0.60144C2.47551 0.652222 1.6884 0.855347 1.00285 1.5155C0.342696 2.17566 0.139571 2.98816 0.0887899 3.90222C0.0380087 4.84167 0.0380087 7.66003 0.0887899 8.59949C0.139571 9.51355 0.342696 10.3007 1.00285 10.9862C1.6884 11.6464 2.47551 11.8495 3.38957 11.9003C4.32902 11.951 7.14738 11.951 8.08684 11.9003C9.0009 11.8495 9.8134 11.6464 10.4736 10.9862C11.1337 10.3007 11.3368 9.51355 11.3876 8.59949C11.4384 7.66003 11.4384 4.84167 11.3876 3.90222ZM10.1689 9.58972C9.99113 10.0975 9.58488 10.4784 9.10246 10.6815C8.34074 10.9862 6.5634 10.91 5.7509 10.91C4.91301 10.91 3.13566 10.9862 2.39934 10.6815C1.89152 10.4784 1.51066 10.0975 1.30754 9.58972C1.00285 8.85339 1.07902 7.07605 1.07902 6.23816C1.07902 5.42566 1.00285 3.64832 1.30754 2.8866C1.51066 2.40417 1.89152 2.02332 2.39934 1.82019C3.13566 1.5155 4.91301 1.59167 5.7509 1.59167C6.5634 1.59167 8.34074 1.5155 9.10246 1.82019C9.58488 1.99792 9.96574 2.40417 10.1689 2.8866C10.4736 3.64832 10.3974 5.42566 10.3974 6.23816C10.3974 7.07605 10.4736 8.85339 10.1689 9.58972Z" />
    </svg>
  );
};

export default InstaIcon;
