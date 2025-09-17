"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "hsla(217, 83%, 43%, 1.00)",
          color: "#fff",
        },
      }}
    />
  );
}
