import { FC, ReactNode, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOnClickOutside } from "usehooks-ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface SelectProps {
  options: {
    value: string | number;
    filterValue?: string;
    label: string | ReactNode;
  }[];
  selected?: string | number;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string | number | undefined) => void;
  error?: string;
  label: string;
}

const SelectOption: FC<SelectProps> = ({
  error,
  onChange,
  disabled,
  selected,
  label,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [optionsState, setOptionState] = useState(options);

  const selectRef = useRef(null);
  const handleClickOutside = () => {
    setOpen(false);
    setOptionState(options);
  };
  useOnClickOutside(selectRef, handleClickOutside);

  return (
    <div
      ref={selectRef}
      className={`select-none relative flex flex-col w-full ${
        disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      <div
        onClick={() => {
          if (!disabled) {
            setOpen(!open);
            setOptionState(options);
          }
        }}
        className={`text-[15px] w-[100px] px-3 py-2 placeholder:text-brand-gray-100 leading-[30px]  font-light text-brand-gray-100 rounded-lg focus:ring-transparent h-[42px] focus:ring-0 focus:outline-none bg-brand-gray-150 dark:bg-transparent dark:border dark:border-brand-dark-100 `}
      >
        <span>
          {options?.find((option) => option.value === selected)?.label}
        </span>

        {selected && (
          <ChevronDownIcon
            className={`w-4 h-4 ml-auto -mt-[22px] stroke-2 transform transition-transform duration-200 ${
              open
                ? "rotate-180 text-brand-gray-100 "
                : "rotate-0 text-brand-gray-100 "
            }`}
          />
        )}
      </div>

      <ErrorMessage error={error} />

      {open && (
        <div
          className={`absolute bg-white dark:bg-black dark:border dark:border-brand-dark-100 dark:text-brand-dark-50 shadow-container left-0 z-50 w-full rounded overflow-y-auto text-base origin-top max-h-64 animate-enterSelect text-brand-black-50 top-[50px]`}
        >
          {options[0].filterValue && (
            <div className="w-full sticky left-0 top-0">
              <input
                onChange={(e) => {
                  setOptionState(
                    options.filter((option) =>
                      option.filterValue
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  );
                }}
                placeholder="Arayınız"
                className="w-full px-4 py-2.5 text-sm border-b border-brand-palette-primary focus:ring-brand-palette-primary focus:outline-none focus:ring-1 rounded-t"
              />
            </div>
          )}

          {optionsState.length === 0 ? (
            <div className={`px-4 py-2.5 select-none`}>
              No options available
            </div>
          ) : (
            optionsState.map((option) => (
              <div
                onClick={() => {
                  setOpen(false);
                  setOptionState(options);
                  onChange(option.value);
                }}
                className={`px-4 py-2.5 select-none cursor-pointer lg:hover:bg-brand-palette-primaryLight ${
                  option.value === selected
                    ? "bg-brand-palette-primaryLight"
                    : ""
                }`}
                key={option.value}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SelectOption;
