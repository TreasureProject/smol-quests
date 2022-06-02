import { useEffect } from "react";

import { Contract, Signer } from "ethers";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import {
  chain,
  useAccount,
  useContractRead as useContractReadWagmi,
  useContractWrite as useContractWriteWagmi,
  useNetwork,
  useSigner,
  useWaitForTransaction,
} from "wagmi";

import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from "../const";
import { AppContract, ContractError } from "../types";
import client from "./client";

export const useBlockExplorer = () => {
  const { activeChain } = useNetwork();
  const { url } = activeChain?.blockExplorers ?? chain.arbitrum.blockExplorers!;
  return url;
};

const useContractAddresses = () => {
  const { activeChain } = useNetwork();
  const chainName = activeChain?.name;
  if (!chainName || !CONTRACT_ADDRESSES[chainName]) {
    return CONTRACT_ADDRESSES[chain.arbitrum.name];
  }

  return CONTRACT_ADDRESSES[chainName];
};

export const useContractAddress = (contract: AppContract) => {
  const addresses = useContractAddresses();
  return addresses[contract].toLowerCase();
};

export const useUserTokens = () => {
  const { data: accountData } = useAccount();
  const { data: signer } = useSigner();
  const smolBrainsAddress = useContractAddress(AppContract.SmolBrains);
  const wrappedSmolsAddress = useContractAddress(AppContract.WrappedSmols);
  const address = accountData?.address?.toLowerCase();

  const {
    data: tokensData,
    status: tokensStatus,
    refetch: refetchTokens,
  } = useQuery(
    ["tokens"],
    () => {
      console.debug("Re-fetching Smol Brains");

      return client.getUserTokens({
        id: address!,
        collection: smolBrainsAddress,
      });
    },
    {
      enabled: !!address,
      keepPreviousData: true,
    }
  );

  const {
    data: wrappedTokensData,
    status: wrappedTokensStatus,
    refetch: refetchWrappedTokens,
  } = useQuery(
    ["wrappedTokens"],
    async () => {
      console.debug(`Re-fetching wSMOLs`);

      const contract = new Contract(
        wrappedSmolsAddress,
        CONTRACT_ABIS[AppContract.WrappedSmols],
        signer!
      );

      const balanceOf = await contract.balanceOf(accountData?.address);
      const balance = parseInt(balanceOf.toString() ?? "0");
      const wrappedSmolsCount = balance < 10_000 ? balance : 0;
      if (wrappedSmolsCount === 0) {
        return [];
      }

      const tokenIds = await Promise.all(
        Array.from({ length: wrappedSmolsCount }).map((_, i) =>
          contract.tokenByIndex(i)
        )
      );
      const tokenUris = await Promise.all(
        tokenIds.map((tokenId) => contract.tokenURI(tokenId))
      );
      const tokens = await Promise.all(
        tokenUris.map(async (uri, i) => {
          const response = await fetch(uri);
          const result = await response.json();
          return {
            ...result,
            tokenId: parseInt(tokenIds[i]),
            chonkSize: result.attributes?.find(
              ({ trait_type: type }) => type === "Chonk Size"
            )?.value,
          };
        })
      );
      return tokens;
    },
    {
      enabled: !!signer,
      keepPreviousData: true,
      refetchInterval: 10000,
    }
  );

  return {
    isLoading: tokensStatus === "loading" || wrappedTokensStatus === "loading",
    tokens: tokensData?.tokens,
    wrappedTokens: wrappedTokensData ?? [],
    refetchTokens,
    refetchWrappedTokens,
  };
};

const useContractRead = (
  contract: AppContract,
  functionName: string,
  args?: any | any[]
) => {
  const addressOrName = useContractAddress(contract);
  const result = useContractReadWagmi(
    {
      addressOrName,
      contractInterface: CONTRACT_ABIS[contract],
    },
    functionName,
    { args }
  );

  // const [{ error }] = result;

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message);
  //   }
  // }, [error]);

  return result;
};

const useContractWrite = (
  contract: AppContract,
  functionName: string,
  args?: any | any[]
) => {
  const addressOrName = useContractAddress(contract);
  const { write, data, status, error } = useContractWriteWagmi(
    {
      addressOrName,
      contractInterface: CONTRACT_ABIS[contract],
    },
    functionName,
    { args }
  );

  const transaction = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    if (error) {
      const contractError = error as ContractError;
      toast.error(contractError.data?.message ?? contractError.message);
    }
  }, [error]);

  return {
    write,
    data,
    isLoading: status === "loading" || transaction.status === "loading",
    error,
  };
};

export const useApprove = (contract: AppContract) => {
  const operatorAddress = useContractAddress(AppContract.WrappedSmols);
  return useContractWrite(contract, "setApprovalForAll", [
    operatorAddress,
    true,
  ]);
};

export const useIsApproved = (contract: AppContract) => {
  const { data: accountData } = useAccount();
  const operatorAddress = useContractAddress(AppContract.WrappedSmols);
  const { data } = useContractRead(contract, "isApprovedForAll", [
    accountData?.address,
    operatorAddress,
  ]);
  return data;
};

export const useWrapSmol = () =>
  useContractWrite(AppContract.WrappedSmols, "wrap");

export const useUnwrapSmol = () =>
  useContractWrite(AppContract.WrappedSmols, "unwrap");

export const useChonkify = () =>
  useContractWrite(AppContract.EpisodeOne, "chonkify");
