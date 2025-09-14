import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

function Button(props: IProps) {
  return (
    <button
      className={[
        "flex items-center justify-center bg-blue-500 text-white px-5 py-3 mt-5 gap-2 transition duration-400 hover:bg-orange-500 hover:cursor-pointer",
        props.className,
        props.isLoading && "!cursor-not-allowed",
      ].join(" ")}
    >
      {props.isLoading && <Spinner />}
      {props.children}
    </button>
  );
}

export default Button;
