import type { HTMLAttributes } from "react";

import clsx from "clsx";

type Props = HTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  disabled?: boolean;
};

export const Button = ({
  className,
  size = "md",
  disabled,
  ...buttonProps
}: Props) => {
  return (
    <button
      className={clsx(
        "text-white font-medium bg-purple-primary rounded-md transition-all",
        size === "sm" ? "px-3 py-1" : "px-4 py-3",
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
