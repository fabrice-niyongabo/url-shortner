import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Type = "success" | "error" | "warning" | "info";

export const toastMessage = (type: Type, message: string) => {
  if (type === "success") {
    toast.success(message);
  }

  if (type === "error") {
    toast.error(message);
  }

  if (type === "warning") {
    toast.loading(message);
  }
};

export const returnAxiosErrorMesssage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data?.message || error.message;
    } else {
      return error.message;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Error: Something went wrong";
  }
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const minifyNumber = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
};
