
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';
export const config = getDefaultConfig({
  appName: 'FeedMe',
  projectId: 'd679b0acafc801412fd613c2ebe6a961',
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});