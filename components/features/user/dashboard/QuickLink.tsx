"use client";

import CustomButton from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { returnAxiosErrorMesssage, toastMessage } from "@/lib/helpers";
import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ShareButton";
import CopyButton from "@/components/CopyButton";
import { ChartNoAxesColumn } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  host: string;
}
function QuickLink({ host }: IProps) {
  const router = useRouter();

  const [createdShortCode, setCreatedShortCode] = useState("");
  const [url, setUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const fethUrlMetadata = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toastMessage("info", "Please enter a valid URL");
      return;
    }

    setIsLoadingMetadata(true);
    const promise = axios.post("/api/metadata", { url });

    toast.promise(promise, {
      loading: "Fetching URL metadata...",
      success: (res) => {
        setIsLoadingMetadata(false);
        handleSave(res.data.image || "", res.data.title || "");
        return "Metadata fetched successfully!";
      },
      error: (error) => {
        setIsLoadingMetadata(false);
        return "Failed to fetch URL metadata, Please make sure the URL is valid and reachable";
      },
    });
  };

  const handleSave = async (icon: string, title: string) => {
    setIsSubmitting(true);
    setCreatedShortCode("");

    const promise = axios.post("/api/link", {
      url,
      title,
      icon,
    });

    toast.promise(promise, {
      loading: "Creating link...",
      success: (res) => {
        setIsSubmitting(false);
        setUrl("");
        setCreatedShortCode(res.data.urlData.shortCode);
        setDialogOpen(true);
        return "URL has been shortened successfully!";
      },
      error: (error) => {
        setIsSubmitting(false);
        return returnAxiosErrorMesssage(error);
      },
    });
  };

  return (
    <div className="bg-white p-5 rounded-md">
      <h2 className="text-lg font-bold mb-4">Quick Create</h2>
      <p className="text-sm text-gray-500">
        Create a link in seconds. Just copy the link and share it with your
        friends.
      </p>

      <form
        onSubmit={fethUrlMetadata}
        className="flex items-center justify-between gap-2 mt-4"
      >
        <Input
          type="text"
          disabled={isSubmitting || isLoadingMetadata}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="text-sm text-gray-700 disabled:!bg-gray-200/50 focus:outline-none focus:!border-orange-500"
        />
        <CustomButton
          className="bg-blue-600"
          type="submit"
          disabled={isSubmitting || isLoadingMetadata}
          isLoading={isSubmitting || isLoadingMetadata}
        >
          Create link
        </CustomButton>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your link is ready! 🎉</DialogTitle>
            <DialogDescription>
              Copy the link below to share it or choose a platform to share it
              to.
            </DialogDescription>
          </DialogHeader>
          <div className="p-5 bg-blue-100 rounded-md flex items-center justify-center gap-5 flex-col">
            <p className="line-clamp-1 text-blue-700 font-bold text-2xl">
              <a href={`${host}/${createdShortCode}`} target="_blank">
                {host}/{createdShortCode}
              </a>
            </p>
            <div className="flex items-center justify-between gap-2">
              <Button
                onClick={() =>
                  router.push(`/dashboard/links/${createdShortCode}`)
                }
                variant="outline"
                size="sm"
                className="rounded-sm hover:cursor-pointer hover:bg-amber-600 hover:text-white"
              >
                <ChartNoAxesColumn size={20} />
                View Link Details
              </Button>
              <CopyButton
                textToCopy={`${host}/${createdShortCode}`}
                className="bg-blue-600 text-white rounded-sm"
              />
              <ShareButton
                url={`${host}/${createdShortCode}`}
                buttonClassName="bg-blue-600 text-white rounded-sm"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default QuickLink;
