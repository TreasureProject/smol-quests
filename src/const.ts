import { chain, erc721ABI } from "wagmi";

import {
  EpisodeOne__factory,
  Erc1155__factory,
  WrappedSmols__factory,
} from "../generated/types";
import { AppContract, ContractMap } from "./types";

// Chains
export const SUPPORTED_CHAINS = [chain.arbitrum, chain.arbitrumRinkeby];

export const DEFAULT_CHAIN = chain.arbitrum;

// Contracts
export const CONTRACT_ADDRESSES: Record<string, ContractMap> = {
  [chain.arbitrumRinkeby.name]: {
    [AppContract.SmolBrains]: "0x2542421ACA04A98f5Cf04DA97a36DAD8F1FaC3f4",
    [AppContract.SmolTreasures]: "0x8e79c8607a28fe1EC3527991C89F1d9E36D1bAd9",
    [AppContract.WrappedSmols]: "0x112001Ab4FE40464cAc3Cf789E4cd304176051B0",
    [AppContract.EpisodeOne]: "0x0536490B709248543c897983eaABD1f586143c51",
  },
  [chain.arbitrum.name]: {
    [AppContract.SmolBrains]: "0x6325439389E0797Ab35752B4F43a14C004f22A9c",
    [AppContract.SmolTreasures]: "0xc5295C6a183F29b7c962dF076819D44E0076860E",
    [AppContract.WrappedSmols]: "0x0000000000000000000000000000000000000000",
    [AppContract.EpisodeOne]: "0x0000000000000000000000000000000000000000",
  },
};

export const CONTRACT_ABIS: Record<AppContract, any> = {
  [AppContract.SmolBrains]: erc721ABI,
  [AppContract.SmolTreasures]: Erc1155__factory.abi,
  [AppContract.WrappedSmols]: WrappedSmols__factory.abi,
  [AppContract.EpisodeOne]: EpisodeOne__factory.abi,
};
