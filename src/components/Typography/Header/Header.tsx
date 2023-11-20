import { FC } from "react";

interface HeaderProps {
  className?: string;
  title: string;
  subTitle?: string;
}
const Header: FC<HeaderProps> = ({ subTitle, title, className }) => {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="md:text-[30px] text-[23px]  text-brand-black-50 dark:text-brand-dark-50 font-medium">
        {title}
      </h2>
      {subTitle && (
        <p className="md:text-[15px] text-[12px] mt-[15px] text-brand-gray-100 dark:text-brand-dark-50">
          {subTitle}
        </p>
      )}
    </div>
  );

  return null;
};

export default Header;
