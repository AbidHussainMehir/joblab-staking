import { FC } from 'react';

interface ErrorMessageProps {
  error?: string;
}
const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return error ? (
    <span className={`text-[13px] mt-1.5 font-medium text-brand-red-primary`}>{error}</span>
  ) : null;
};

export default ErrorMessage;
