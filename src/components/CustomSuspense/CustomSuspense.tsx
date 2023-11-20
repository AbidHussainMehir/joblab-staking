import React, { ReactNode } from "react";

// eslint-disable-next-line no-unused-vars
type ChildrenProps<T> = (data: T) => ReactNode;

type CustomSuspenseProps<T> = {
  children: ChildrenProps<T>;
  fallback: ReactNode;
  emptyMessage?: ReactNode;
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
};

const CustomSuspense = <T extends object>({
  children,
  isLoading,
  isError,
  data,
  emptyMessage,
  fallback,
}: CustomSuspenseProps<T>) => {
  if (isLoading) {
    return <>{fallback}</>;
  }
  if (isError) {
    return <div className="p-6">Something went wrong.</div>;
  }
  if (Array.isArray(data)) {
    if (data && data.length > 0) {
      return <>{children(data)}</>;
    } else {
      return <>{emptyMessage}</>;
    }
  }
  if (!data) {
    return <>{emptyMessage}</>;
  }

  return <>{children(data)}</>;
};

export default CustomSuspense;
