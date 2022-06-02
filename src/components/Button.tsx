import type { HTMLAttributes } from "react";

import clsx from "clsx";

type Props = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

export const Button = ({ className, disabled, ...buttonProps }: Props) => {
  return (
    <button
      className={clsx(
        "px-6 py-3 text-white font-semibold bg-purple-primary rounded-md transition-all",
        disabled
          ? "opacity-50"
          : "hover:bg-purple-hover active:shadow-purple-active",
        className
      )}
      disabled={disabled}
      {...buttonProps}
    />
  );
};
