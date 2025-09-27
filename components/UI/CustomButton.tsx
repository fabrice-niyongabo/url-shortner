import { cx, VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";
import { Loader2Icon } from "lucide-react";

function CustomButton(
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      isLoading?: boolean;
    }
) {
  return (
    <Button
      {...props}
      className={cx(props.className, [
        "hover:bg-orange-500 hover:cursor-pointer",
      ])}
    >
      {props.isLoading && <Loader2Icon className="animate-spin" />}
      {props.children}
    </Button>
  );
}

export default CustomButton;
