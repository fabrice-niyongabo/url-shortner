"use client";

import CustomButton from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { returnAxiosErrorMesssage, toastMessage } from "@/lib/helpers";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Form() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const [data, setData] = useState({
    destination: "",
    title: "",
    icon: "",
  });

  const fethUrlMetadata = async () => {
    try {
      if (!data.destination) return;
      setIsLoadingMetadata(true);
      const res = await axios.post("/api/metadata", { url: data.destination });
      setData({ ...data, title: res.data.title, icon: res.data.image });
      setIsUrlValid(true);
    } catch (err: any) {
      setIsUrlValid(false);
      toastMessage(
        "error",
        "Failed to fetch URL metadata, Please make sure the URL is valid and reachable"
      );
    } finally {
      setIsLoadingMetadata(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUrlValid) {
      toastMessage(
        "error",
        "Invalid URL, please make sure the URL is valid and reachable"
      );
      return;
    }

    //
    setIsSubmitting(true);
    const promise = axios.post("/api/link", {
      url: data.destination,
      title: data.title,
      icon: data.icon,
    });

    toast.promise(promise, {
      loading: "Creating link...",
      success: () => {
        setIsSubmitting(false);
        router.push("/dashboard/links");
        return "URL has been shortened successfully!";
      },
      error: (error) => {
        setIsSubmitting(false);
        return returnAxiosErrorMesssage(error);
      },
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex gap-2 flex-col">
        <p className="text-sm font-medium">Destination URL</p>
        <Input
          className="disabled:bg-gray-100 disabled:text-gray-500"
          disabled={isSubmitting || isLoadingMetadata}
          placeholder="https://example.com"
          value={data.destination}
          onChange={(e) => setData({ ...data, destination: e.target.value })}
          onBlur={() => fethUrlMetadata()}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <p className="text-sm font-medium">Title</p>
        <div className="flex items-center justify-between gap-5">
          <Input
            disabled={isLoadingMetadata || isSubmitting}
            value={data.title}
            className="disabled:bg-gray-100 disabled:text-gray-500"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          {isLoadingMetadata && <Loader2Icon className="animate-spin" />}
          {!isLoadingMetadata && data.icon && (
            <Image
              src={data.icon}
              alt={data.destination}
              height={35}
              width={35}
            />
          )}
        </div>
      </div>
      <div>
        <CustomButton
          type="submit"
          className="bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          isLoading={isSubmitting}
          disabled={isSubmitting || isLoadingMetadata}
        >
          Create
        </CustomButton>
      </div>
    </form>
  );
}

export default Form;
