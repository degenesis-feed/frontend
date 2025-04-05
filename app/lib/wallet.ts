"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, createConfig } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { WagmiProvider } from "wagmi";

const { connectors } = getDefaultWallets({
  appName: "FeedMe",
  projectId: "d679b0acafc801412fd613c2ebe6a961", // Replace with your WalletConnect ID
});

export const config = createConfig({
  connectors,
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export { WagmiProvider, RainbowKitProvider };
