"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { toastMessage } from "@/lib/helpers";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface IProps {
  textToCopy: string;
  className?: ClassNameValue;
}

function CopyButton({ textToCopy, className }: IProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toastMessage("success", "Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className={twMerge(
        "hover:cursor-pointer hover:bg-amber-600 hover:text-white",
        className
      )}
    >
      <CopyIcon />
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export default CopyButton;
