import Image from "next/image";

import TreasureLogo from "../assets/treasure.svg";
import { useBlockExplorer, useContractAddresses } from "../lib/hooks";
import { AppContract } from "../types";
import { DiscordIcon, GitHubIcon, TwitterIcon } from "./Icons";

const links = [
  {
    title: "Twitter",
    href: "https://twitter.com/SmolQuests",
    Icon: TwitterIcon,
  },
  {
    title: "Discord",
    href: "https://discord.gg/smolbrains",
    Icon: DiscordIcon,
  },
  {
    title: "GitHub",
    href: "https://github.com/TreasureProject/smol-quests",
    Icon: GitHubIcon,
  },
];

export const Footer = () => {
  const blockExplorer = useBlockExplorer();
  const contractAddresses = useContractAddresses();
  return (
    <div className="px-8 py-12 bg-purple-darkest">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-light">
            {links.map(({ title, href, Icon }) => (
              <a key={title} href={href} title={title} className="group">
                <Icon className="w-10 h-10 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
          <div>
            <a
              href={`${blockExplorer}/address/${
                contractAddresses[AppContract.WrappedSmols]
              }`}
              className="block text-xs text-gray-light hover:text-white hover:underline transition-colors"
            >
              wSMOLs Contract
            </a>
            <a
              href={`${blockExplorer}/address/${
                contractAddresses[AppContract.EpisodeOne]
              }`}
              className="block text-xs text-gray-light hover:text-white hover:underline transition-colors"
            >
              Episode One Contract
            </a>
          </div>
        </div>
        <div className="text-center md:text-right">
          <a href="https://www.treasure.lol">
            <Image
              alt="Treasure"
              src={TreasureLogo.src}
              width={175}
              height={50}
            />
          </a>
          <div className="text-lg text-gray-darker">
            &copy; 2021-2022 TreasureDAO
          </div>
        </div>
      </div>
    </div>
  );
};
