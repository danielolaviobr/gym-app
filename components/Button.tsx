import React from "react";

interface Props {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  [key: string]: any;
}

export default function Button({
  variant = "primary",
  children,
  ...props
}: Props) {
  return (
    <button {...props} className={STYLES[variant]}>
      {children}
    </button>
  );
}

const STYLES = {
  primary:
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
  secondary:
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
};
