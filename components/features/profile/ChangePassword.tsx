"use client";

import CustomButton from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { returnAxiosErrorMesssage, toastMessage } from "@/lib/helpers";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (oldPassword.trim() === "") {
      toastMessage("error", "Old password is required");
      return;
    }

    if (newPassword.trim().length < 5) {
      toastMessage("error", "Password must be at least 5 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastMessage("error", "Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    const promise = axios.put("/api/profile/password", {
      oldPassword,
      newPassword,
    });

    toast.promise(promise, {
      loading: "Changing password...",
      success: (res) => {
        setIsSubmitting(false);
        return res.data.message || "Password changed successfully!";
      },
      error: (error) => {
        setIsSubmitting(false);
        return returnAxiosErrorMesssage(error);
      },
    });
  };

  return (
    <div className="bg-white rounded-md p-10 mt-5">
      <h1 className="text-lg font-semibold mb-2">Change Password</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col">
          <p className="text-sm font-medium">Old Password</p>
          <Input
            type="password"
            placeholder="Old password"
            disabled={isSubmitting}
            value={oldPassword}
            className="disabled:bg-gray-100 disabled:text-gray-500"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex gap-2 flex-col">
            <p className="text-sm font-medium">New Password</p>
            <Input
              type="password"
              placeholder="New password"
              disabled={isSubmitting}
              value={newPassword}
              className="disabled:bg-gray-100 disabled:text-gray-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="text-sm font-medium">Confirm Password</p>
            <Input
              type="password"
              placeholder="Confirm password"
              disabled={isSubmitting}
              value={confirmPassword}
              className="disabled:bg-gray-100 disabled:text-gray-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <CustomButton
            type="submit"
            className="bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Change Password
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
