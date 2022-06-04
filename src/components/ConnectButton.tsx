import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectButton = () => (
  <RainbowConnectButton
    accountStatus="address"
    showBalance={{ smallScreen: false, largeScreen: false }}
  />
);
