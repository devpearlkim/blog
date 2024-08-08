"use client";

import Nav from "@/components/Nav";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  return (
    <NextUIProvider>
      {path !== "/signup" && path !== "/signin" && <Nav />}
      {children}
    </NextUIProvider>
  );
};

export default Providers;
