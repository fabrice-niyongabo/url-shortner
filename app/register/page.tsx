"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { returnAxiosErrorMesssage, toastMessage } from "@/lib/helpers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password.trim() !== form.confirmPassword.trim()) {
      toastMessage("error", "Passwords do not match");
      return;
    }
    const promise = axios.post("/api/auth/register", {
      ...form,
    });

    setIsSubmitting(true);
    toast.promise(promise, {
      loading: "Creating your account...",
      success: (res) => {
        setIsSubmitting(false);
        return res.data.message;
      },
      error: (error) => {
        setIsSubmitting(false);
        return returnAxiosErrorMesssage(error);
      },
    });
  };

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="bg-white p-20 col-span-2">
        <div className="w-[65%] mx-auto">
          <h3 className="text-3xl font-bold text-[#031F39]">
            Create your account
          </h3>
          <p className="text-sm text-[#031F39]">
            Already have an account?{" "}
            <Link href={"/login"} className="underline text-blue-600">
              Login
            </Link>
          </p>
          <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-semibold">
                Email
              </label>
              <Input
                placeholder="Email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                name="email"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-semibold">
                Password
              </label>
              <Input
                placeholder="Password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                name="password"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-semibold">
                Repeat Password
              </label>
              <Input
                placeholder="Repeat password"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="rounded-md">
              Create free account
            </Button>
          </form>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center p-5 bg-[#EDF2FF] flex-col gap-3">
        <Image
          alt="login"
          src="/images/register.png"
          width={400}
          height={400}
        />
        <p className="text-center text-sm text-[#031F39] font-semibold">
          Power your links, QR Codes, and landing pages with our platform's
          Connections Platform.
        </p>
      </div>
    </div>
  );
}

export default Register;
