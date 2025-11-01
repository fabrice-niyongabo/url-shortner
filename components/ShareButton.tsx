"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Share } from "lucide-react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface IProps {
  url: string;
}
function ShareButton({ url }: IProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:cursor-pointer hover:bg-amber-600 hover:text-white"
        >
          <Share />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="w-[350px] p-3">
          <h3 className="mb-3 font-semibold">Share this link on:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FacebookShareButton url={url}>
              <div className="flex items-center justify-center gap-1 flex-col">
                <FacebookIcon size={32} round />
                <p className="text-xs">Facebook</p>
              </div>
            </FacebookShareButton>
            <WhatsappShareButton url={url}>
              <div className="flex items-center justify-center gap-1 flex-col">
                <WhatsappIcon size={32} round />
                <p className="text-xs">Whatsapp</p>
              </div>
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
              <div className="flex items-center justify-center gap-1 flex-col">
                <LinkedinIcon size={32} round />
                <p className="text-xs">Linkedin</p>
              </div>
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
              <div className="flex items-center justify-center gap-1 flex-col">
                <TwitterIcon size={32} round />
                <p className="text-xs">X</p>
              </div>
            </TwitterShareButton>
            <EmailShareButton url={url}>
              <div className="flex items-center justify-center gap-1 flex-col">
                <EmailIcon size={32} round />
                <p className="text-xs">Email</p>
              </div>
            </EmailShareButton>
            <RedditShareButton url={url}>
              <div className="flex items-center justify-center gap-1 flex-col">
                <RedditIcon size={32} round />
                <p className="text-xs">Reddit</p>
              </div>
            </RedditShareButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
