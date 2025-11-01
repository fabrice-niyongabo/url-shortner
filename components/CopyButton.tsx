"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { toastMessage } from "@/lib/helpers";

interface IProps {
  textToCopy: string;
}

function CopyButton({ textToCopy }: IProps) {
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
      className="hover:cursor-pointer hover:bg-amber-600 hover:text-white"
    >
      <CopyIcon />
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export default CopyButton;
