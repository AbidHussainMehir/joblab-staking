import { FC } from "react";

interface FormHeaderProps {
  title: string;
}

const FormHeader: FC<FormHeaderProps> = ({ title }) => {
  return (
    <div className="flex bg-white sticky top-0 z-30 p-5 shadow-container items-center justify-between">
      <h1 className="text-brand-black-primary text-lg font-semibold">
        {title}
      </h1>
    </div>
  );
};

export default FormHeader;
