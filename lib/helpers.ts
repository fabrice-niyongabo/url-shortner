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
