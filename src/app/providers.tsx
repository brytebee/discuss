"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface ProvidersPrpos {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersPrpos) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
