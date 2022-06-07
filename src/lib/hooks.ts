import { useEffect, useRef } from "react";

import type { BaseContract } from "ethers";
import toast from "react-hot-toast";
import { useQueries, useQuery } from "react-query";
import {
  chain,
  useAccount,
  useContractRead as useContractReadWagmi,
  useContractWrite as useContractWriteWagmi,
  useNetwork,
  useSigner,
  useWaitForTransaction,
} from "wagmi";

import {
  EpisodeOne,
  EpisodeOne__factory,
  WrappedSmols,
  WrappedSmols__factory,
} from "../../generated/types";
import {
  CONTRACT_ABIS,
  CONTRACT_ADDRESSES,
  DEFAULT_REFETCH_INTERVAL,
  LONG_REFETCH_INTERVAL,
} from "../const";
import { AppContract, ContractError } from "../types";
import client, { marketplaceClient } from "./client";

export const useBlockExplorer = () => {
  const { activeChain } = useNetwork();
  return (
    activeChain?.blockExplorers?.default.url ??
    chain.arbitrum.blockExplorers?.default.url
  );
};

export const useContractAddresses = () => {
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

const useContract = (contract: AppContract) => ({
  address: useContractAddress(contract),
  abi: CONTRACT_ABIS[contract],
});

export const useMoonRocksBalance = () => {
  const { data: accountData } = useAccount();
  const address = accountData?.address?.toLowerCase();
  const smolTreasuresAddress = useContractAddress(AppContract.SmolTreasures);

  const { data, isLoading } = useQuery(
    ["moonRocksBalance"],
    () => {
      console.debug("Re-fetching Moon Rocks balance");
      return marketplaceClient.getUserTokenBalance({
        id: address ?? "",
        token: `${smolTreasuresAddress}-0x1`,
      });
    },
    {
      enabled: !!address,
      keepPreviousData: true,
      refetchInterval: LONG_REFETCH_INTERVAL,
    }
  );

  return {
    isLoading,
    moonRocksBalance: data?.userTokens[0]?.quantity ?? 0,
  };
};

const getWrappedTokens = async (
  address: string,
  contract: WrappedSmols,
  episodeContract: EpisodeOne
) => {
  const balanceOf = await contract.balanceOf(address);
  const balance = parseInt(balanceOf.toString() ?? "0");
  const wrappedSmolsCount = balance < 10_000 ? balance : 0;
  if (wrappedSmolsCount === 0) {
    return [];
  }

  const tokenIds = await Promise.all(
    Array.from({ length: wrappedSmolsCount }).map((_, i) =>
      contract.tokenOfOwnerByIndex(address, i)
    )
  );
  const tokenUris = await Promise.all(
    tokenIds.map((tokenId) => contract.tokenURI(tokenId))
  );
  const lastChonks = await Promise.all(
    tokenIds.map((tokenId) => episodeContract.lastChonk(tokenId))
  );
  const tokens = await Promise.all(
    tokenUris.map(async (uri, i) => {
      const response = await fetch(uri);
      const result = await response.json();
      return {
        ...result,
        tokenId: tokenIds[i].toNumber(),
        lastActionTime: lastChonks[i].toNumber(),
        episodeStat:
          (result.attributes?.find(
            ({ trait_type: type }) => type === "Chonk Size"
          )?.value ?? 0) + 1,
      };
    })
  );
  return tokens;
};

export const useUserTokens = () => {
  const { data: accountData } = useAccount();
  const { data: signer } = useSigner();
  const contractAddresses = useContractAddresses();
  const address = accountData?.address?.toLowerCase();

  const [
    { data: tokensData, isLoading: tokensLoading },
    {
      data: wrappedTokensData,
      isLoading: wrappedTokensLoading,
      refetch: refetchWrappedTokens,
    },
  ] = useQueries([
    {
      queryKey: ["tokens"],
      queryFn: () => {
        console.debug("Re-fetching Smol Brains");
        return client.getUserTokens({
          id: address ?? "",
          collection: contractAddresses[AppContract.SmolBrains].toLowerCase(),
        });
      },
      enabled: !!address,
      keepPreviousData: true,
    },
    {
      queryKey: ["wrappedTokens"],
      queryFn: () => {
        console.debug("Re-fetching wSMOLs");
        const contract = WrappedSmols__factory.connect(
          contractAddresses[AppContract.WrappedSmols].toLowerCase(),
          signer!
        );
        const episodeContract = EpisodeOne__factory.connect(
          contractAddresses[AppContract.EpisodeOne].toLowerCase(),
          signer!
        );
        return getWrappedTokens(address!, contract, episodeContract);
      },
      enabled: !!address && !!signer,
      keepPreviousData: true,
      refetchInterval: LONG_REFETCH_INTERVAL,
    },
  ]);

  return {
    isLoading: tokensLoading || wrappedTokensLoading,
    tokens: tokensData?.tokens,
    wrappedTokens: wrappedTokensData ?? [],
    refetchWrappedTokens,
  };
};

function useContractRead<T extends BaseContract>(
  contract: AppContract,
  functionName: keyof T["functions"],
  params?: Parameters<typeof useContractReadWagmi>[2]
) {
  const { address, abi } = useContract(contract);
  const result = useContractReadWagmi(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    functionName as string,
    params
  );

  return result;
}

const getCustomErrorMessage = (message: string) => {
  if (message.includes("not time to eat yet")) {
    return "Not time to eat yet!";
  }

  if (message.includes("SmolBrain: is at school")) {
    return "Smol must drop out of school first!";
  }

  return message;
};

function useContractWrite<T extends BaseContract>(
  contract: AppContract,
  functionName: keyof T["functions"],
  params?: Parameters<typeof useContractWriteWagmi>[2]
) {
  const { address, abi } = useContract(contract);
  const { write, data, error, ...result } = useContractWriteWagmi(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    functionName as string,
    params
  );

  const transaction = useWaitForTransaction({ hash: data?.hash });

  const toastId = useRef<string | undefined>();
  const isLoading = transaction.isLoading || result.isLoading;
  const isError = transaction.isError || result.isError;
  const isSuccess = transaction.isSuccess;

  useEffect(() => {
    if (isLoading) {
      if (toastId.current) {
        toast.loading("Transaction in progress...", {
          id: toastId.current,
        });
      } else {
        toastId.current = toast.loading("Transaction in progress...");
      }
    } else if (isSuccess) {
      toast.success(
        "Transaction successful. Please wait for the UI to update or refresh the page if there is an issue.",
        {
          id: toastId.current,
        }
      );
    } else if (isError) {
      const contractError = error as ContractError;
      const message = contractError.data?.message ?? contractError.message;
      toast.error(getCustomErrorMessage(message), {
        id: toastId.current,
      });
    }
  }, [isSuccess, isError, isLoading, error]);

  return {
    write,
    data,
    isLoading: result.isLoading || transaction.status === "loading",
    error,
  };
}

export const useApprove = (
  contract: AppContract,
  operator = AppContract.WrappedSmols
) =>
  useContractWrite(contract, "setApprovalForAll", {
    args: [useContractAddress(operator), true],
  });

export const useIsApproved = (
  contract: AppContract,
  operator = AppContract.WrappedSmols
) => {
  const { data: accountData } = useAccount();
  const operatorAddress = useContractAddress(operator);
  const { data } = useContractRead(contract, "isApprovedForAll", {
    args: [accountData?.address, operatorAddress],
    cacheTime: DEFAULT_REFETCH_INTERVAL,
  });
  return data;
};

export const useWrapSmol = () =>
  useContractWrite<WrappedSmols>(AppContract.WrappedSmols, "wrap");

export const useUnwrapSmol = () =>
  useContractWrite<WrappedSmols>(AppContract.WrappedSmols, "unwrap");

export const useChonkify = () =>
  useContractWrite<EpisodeOne>(AppContract.EpisodeOne, "chonkify");
