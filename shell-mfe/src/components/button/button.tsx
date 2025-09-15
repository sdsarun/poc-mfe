import React from "react";

export type ButtonProps = React.ComponentProps<"button">;

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      className="px-2 py-1 border rounded-md active:bg-amber-200 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-60 hover:ring-2 transition-all"
      {...props}
    />
  );
};

export default React.memo(Button);
