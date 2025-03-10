"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="bg-white p-20 col-span-2">
        <div className="w-[65%] mx-auto">
          <h3 className="text-3xl font-bold text-[#031F39]">
            Log in and start sharing
          </h3>
          <p className="text-sm text-[#031F39]">
            Don't have an account?{" "}
            <Link href={"/register"} className="underline text-blue-600">
              Sign up
            </Link>
          </p>
          <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-md font-semibold">
                Email
              </label>
              <Input
                placeholder="Email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-md font-semibold">
                Password
              </label>
              <Input
                placeholder="Password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <Link
              href="#"
              className="text-right underline text-sm text-blue-700"
            >
              Forgot your password?
            </Link>
            <Button type="submit" className="rounded-md">
              Log in
            </Button>
          </form>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center p-5 bg-[#EDF2FF] flex-col">
        <Image alt="login" src="/images/login.png" width={400} height={400} />
        <p className="text-center text-sm text-[#031F39] font-semibold">
          Analyze your links and QR Codes as easily as creating them
        </p>
      </div>
    </div>
  );
}

export default Login;
