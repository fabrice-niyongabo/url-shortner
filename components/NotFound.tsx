import clsx, { ClassValue } from "clsx";
import { PawPrint } from "lucide-react";

interface IProps {
  title?: string;
  className?: ClassValue;
  hideLabel?: boolean;
}
function NotFound(props: IProps) {
  return (
    <div
      className={clsx(
        "w-full h-full p-5 flex items-center justify-center",
        props.className
      )}
    >
      <div className="w-1/2 p-10 rounded-4xl flex items-center justify-center flex-col gap-3">
        <div className="flex justify-center items-center p-4 rounded-full bg-red-100">
          <PawPrint
            className="text-red-700 text-center opacity-50"
            size={100}
          />
        </div>
        {!props.hideLabel && (
          <h1 className="text-red-700 text-center font-semibold">
            {props.title || "Not Data Found"}
          </h1>
        )}
      </div>
    </div>
  );
}

export default NotFound;
