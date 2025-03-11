import { ButtonHTMLAttributes } from "react";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={[
        "flex items-center justify-center bg-blue-500 text-white px-5 py-3 mt-5 gap-2 transition duration-400 hover:bg-orange-500 hover:cursor-pointer",
        props.className,
      ].join(" ")}
    >
      {props.children}
    </button>
  );
}

export default Button;
