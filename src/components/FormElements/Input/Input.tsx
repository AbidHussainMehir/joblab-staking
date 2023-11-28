import { FC, InputHTMLAttributes } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export interface InputProps {
  props?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  label?: string;
}

const Input: FC<InputProps> = ({ props, error, label }) => {
  return (
    <div className="flex w-full mt-3">
      <div className="flex flex-col w-full border border-brand-blue-450 ">
        <input
          disabled={props?.disabled}
          placeholder={props?.placeholder}
          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px] px-4 py-2  dark:bg-transparent border border-brand-blue-450 placeholder:text-brand-gray-100 leading-[30px] w-full font-light  dark:text-white rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150`}
          id={`${props?.name}-input-id`}
          style={{ border: "1px solid black" }}
          required={props?.required}
          {...props}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Input;
