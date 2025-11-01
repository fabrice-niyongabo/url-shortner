import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

interface IProps {
  label?: string;
  href: string;
}
function BackButton(props: IProps) {
  return (
    <Link href={props.href}>
      <Button variant={"ghost"} className="cursor-pointer hover:text-amber-600">
        <ChevronLeft />
        {props.label || "Back"}
      </Button>
    </Link>
  );
}

export default BackButton;
