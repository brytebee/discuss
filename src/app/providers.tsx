"use client";

import { NextUIProvider } from "@nextui-org/react";

interface ProvidersPrpos {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersPrpos) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
