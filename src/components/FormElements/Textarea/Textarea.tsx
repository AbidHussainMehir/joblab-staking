import { FC, TextareaHTMLAttributes } from "react";
import ErrorMessage from "../ErrorMessage";

export interface TextareaProps {
  props?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: string;
  label?: string;
}

const Textarea: FC<TextareaProps> = ({ props, error, label }) => {
  return (
    <fieldset className="flex w-ful flex-col">
      {label && (
        <label
          htmlFor={`${props?.name}-input-id`}
          className="text-[15px] text-brand-black-50 dark:text-brand-dark-50 pl-1 mb-2.5 font-medium"
        >
          {label}
          {props?.required ? "*" : ""}
        </label>
      )}
      <textarea
        required={props?.required}
        {...props}
        className={`text-[15px] p-7 font-light placeholder:text-brand-gray-100 leading-[30px] w-full text-brand-gray-100 rounded-lg focus:ring-transparent focus:ring-0 focus:outline-none bg-brand-gray-150 dark:bg-transparent dark:border dark:border-brand-dark-100`}
      />
      <ErrorMessage error={error} />
    </fieldset>
  );
};

export default Textarea;
