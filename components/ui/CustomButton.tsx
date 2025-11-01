import { cx, VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";
import { Loader2Icon } from "lucide-react";

interface CustomButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

function CustomButton({
  isLoading,
  children,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      {...props}
      className={cx(className, "hover:bg-orange-500 hover:cursor-pointer", {
        "opacity-60": props.disabled,
        "cursor-not-allowed": props.disabled,
      })}
      disabled={isLoading}
    >
      {isLoading && <Loader2Icon className="animate-spin mr-2" />}
      {children}
    </Button>
  );
}

export default CustomButton;
