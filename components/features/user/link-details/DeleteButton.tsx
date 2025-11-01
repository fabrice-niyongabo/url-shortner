"use client";

import AlertConfirmation from "@/components/AlertConfirmation";
import { Button } from "@/components/ui/button";
import { returnAxiosErrorMesssage } from "@/lib/helpers";
import axios from "axios";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  urlId: number;
}
function DeleteButton({ urlId }: IProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = () => {
    setLoading(true);
    const promise = axios.delete(`/api/link/remove/${urlId}`);
    toast.promise(promise, {
      loading: "Logging in...",
      success: (res) => {
        setLoading(false);
        router.push("/dashboard/links");
        return res.data.message;
      },
      error: (error) => {
        setLoading(false);
        return returnAxiosErrorMesssage(error);
      },
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={loading}
        variant="outline"
        size="sm"
        className="text-red-600 hover:cursor-pointer hover:bg-red-600 hover:text-white"
      >
        <CircleX />
        {loading ? "Deleting..." : "Delete"}
      </Button>
      <AlertConfirmation
        description="Do you want to delete this link?"
        open={open}
        setOpen={setOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteButton;
