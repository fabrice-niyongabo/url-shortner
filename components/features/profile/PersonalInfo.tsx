"use client";

import CustomButton from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { returnAxiosErrorMesssage } from "@/lib/helpers";
import axios from "axios";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  session: Session;
}
function PersonalInfo({ session }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [names, setNames] = useState(session.user.name || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const promise = axios.put("/api/profile/info", {
      names,
    });

    toast.promise(promise, {
      loading: "Updating...",
      success: (res) => {
        setIsSubmitting(false);
        return res.data.message || "Profile updated successfully!";
      },
      error: (error) => {
        setIsSubmitting(false);
        return returnAxiosErrorMesssage(error);
      },
    });
  };
  return (
    <div className="bg-white rounded-md p-10 mt-5">
      <h1>Personal info</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col">
          <p className="text-sm font-medium">Email</p>
          <Input
            className="disabled:bg-gray-100 disabled:text-gray-500"
            disabled
            value={session.user.email || ""}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <p className="text-sm font-medium">Names</p>
          <Input
            disabled={isSubmitting}
            value={names}
            className="disabled:bg-gray-100 disabled:text-gray-500"
            onChange={(e) => setNames(e.target.value)}
          />
        </div>
        <div>
          <CustomButton
            type="submit"
            className="bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
