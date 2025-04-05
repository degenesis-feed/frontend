// app/page.tsx
"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "../wallet.config";
import TwitterFrontend from "./TwitterFrontend";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <TwitterFrontend />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
