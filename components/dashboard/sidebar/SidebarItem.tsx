import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ComponentType } from "react";

interface IProps {
  label: string;
  icon: ComponentType<{ size?: number }>;
  href: string;
}
function SidebarItem(props: IProps) {
  return (
    <Link href={props.href} className="flex items-center justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="hover:cursor-pointer">
            <props.icon size={25} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{props.label}</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}

export default SidebarItem;
