import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectButton = () => (
  <RainbowConnectButton
    accountStatus="address"
    chainStatus={{ smallScreen: "none", largeScreen: "none" }}
    showBalance={{ smallScreen: false, largeScreen: false }}
  />
);
