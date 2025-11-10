"use client";

import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";

function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const promise = signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    toast.promise(promise, {
      loading: "Logging in...",
      success: (res) => {
        if (res?.error) {
          setIsSubmitting(false);
          throw new Error("Wrong username or password.");
        }
        router.push("/dashboard");
        return "Logged in successfully!";
      },
      error: (error) => {
        setIsSubmitting(false);
        return error.message || "Invalid credentials";
      },
    });
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

          <Button
            variant="ghost"
            className="border py-1 px-3 flex items-center justify-center gap-3 my-5 w-full hover:cursor-pointer"
            onClick={() => signIn("google")}
          >
            <BsGoogle /> <span>Continue with Google</span>
          </Button>

          <div className="flex items-center w-full">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-600 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

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
                className="focus:!border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={isSubmitting}
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
                className="focus:!border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={isSubmitting}
              />
            </div>
            <Link
              href="#"
              className="text-right underline text-sm text-blue-700"
            >
              Forgot your password?
            </Link>
            <CustomButton
              type="submit"
              className="rounded-md"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Log in
            </CustomButton>
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
