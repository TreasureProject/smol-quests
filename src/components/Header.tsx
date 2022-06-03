import Image from "next/image";
import { useAccount } from "wagmi";

import Logo from "../../public/img/logo.png";
import { useMoonRocksBalance } from "../lib/hooks";
import { ConnectButton } from "./ConnectButton";

export const Header = () => {
  const { data: accountData } = useAccount();
  const { isLoading: isLoadingBalance, moonRocksBalance } =
    useMoonRocksBalance();
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 flex items-center justify-between">
      <div className="hidden md:block w-[50px] h-[50px] border-2 border-gray-primary rounded-full overflow-hidden">
        <Image alt="" src={Logo.src} width={50} height={50} />
      </div>
      <div className="flex">
        {accountData?.address && !isLoadingBalance && (
          <a
            className="flex items-center bg-gray-primary border border-gray-secondary rounded-full"
            href="https://marketplace.treasure.lol/collection/smol-treasures/1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{
                backgroundSize: "100px 110px",
                backgroundPosition: "center 45%",
                backgroundImage:
                  "url(https://treasure-marketplace.mypinata.cloud/ipfs/QmZK1i4y7qn7Fi7mEMgT4KZcb1Etb12yndcTZ5dnhigDPt/0.gif)",
              }}
            />
            <div className="pl-3 pr-4 font-medium">
              {moonRocksBalance} Moon Rocks
            </div>
          </a>
        )}
        <ConnectButton />
      </div>
    </div>
  );
};
