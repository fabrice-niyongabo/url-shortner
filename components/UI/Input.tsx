import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "block w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 transition duration-300 ease focus:outline-none focus:border-orange-500",
        props.className,
        props.disabled && "!bg-gray-200/50",
      ].join(" ")}
    />
  );
}
