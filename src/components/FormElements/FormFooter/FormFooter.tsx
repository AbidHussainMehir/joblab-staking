import { FC } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../Button";

interface FormFooterProps {
  loading: boolean;
  onCancel: () => void;
}

const FormFooter: FC<FormFooterProps> = ({ loading, onCancel }) => {
  return (
    <div className="flex bg-white sticky z-30 bottom-0 mt-auto shadow-container p-5 items-center justify-end">
      <Button
        loading={loading}
        fallback={
          <div className="flex items-center">
            <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
              <path
                className="fill-current"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              />
            </svg>
            <span className="ml-2 text-sm">Loading</span>
          </div>
        }
        onClick={() => onCancel()}
        type="button"
        className="font-medium px-4 lg:hover:bg-brand-palette-primaryLight py-2 rounded text-sm text-brand-palette-primary border border-brand-palette-primary ml-auto"
      >
        <XCircleIcon className="w-5" />
        <span className="ml-1.5 mr-1">Vazgeç</span>
      </Button>
      <Button
        loading={loading}
        fallback={
          <div className="flex items-center">
            <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
              <path
                className="fill-current"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              />
            </svg>
            <span className="ml-2 text-sm">Loading</span>
          </div>
        }
        type="submit"
        className="font-medium px-4 py-2 ml-3 rounded text-sm bg-brand-palette-primary border border-brand-palette-primary  text-white"
      >
        <CheckCircleIcon className="w-5" />
        <span className="ml-1.5 mr-1">Kaydet</span>
      </Button>
    </div>
  );
};

export default FormFooter;
