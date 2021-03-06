import { useEffect, useState } from "react";

import { ExternalLinkIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Image from "next/image";
import { useAccount } from "wagmi";

import { BannerImage } from "../components/BannerImage";
import { Button } from "../components/Button";
import { ConnectButton } from "../components/ConnectButton";
import Countdown from "../components/Countdown";
import { Spinner } from "../components/Spinner";
import { WrappedSmolImage } from "../components/WrappedSmolImage";
import { EPISODE_ACTION_INTERVAL } from "../const";
import {
  useApprove,
  useChonkify,
  useIsApproved,
  useUnwrapSmol,
  useUserTokens,
  useWrapSmol,
} from "../lib/hooks";
import { AppContract } from "../types";
import { generateMarketplaceIpfsUrl } from "../utils/image";
import { getShortTimestamp } from "../utils/time";

export default function Home() {
  const { data: accountData } = useAccount();

  // Inventory
  const { isLoading, tokens, wrappedTokens, refetchWrappedTokens } =
    useUserTokens();
  const wrappedTokenIds: number[] = wrappedTokens.map(({ tokenId }) => tokenId);

  // Approvals
  const isSmolBrainsApproved = useIsApproved(AppContract.SmolBrains);
  const isSmolTreasuresApproved = useIsApproved(
    AppContract.SmolTreasures,
    AppContract.EpisodeOne
  );
  const { write: approveSmolBrains, isLoading: isApprovingSmolBrains } =
    useApprove(AppContract.SmolBrains);
  const { write: approveSmolTreasures, isLoading: isApprovingSmolTreasures } =
    useApprove(AppContract.SmolTreasures, AppContract.EpisodeOne);

  // Actions
  const {
    write: wrapSmol,
    isLoading: isWrappingSmol,
    data: wrapData,
  } = useWrapSmol();
  const {
    write: unwrapSmol,
    isLoading: isUnwrappingSmol,
    data: unwrapData,
  } = useUnwrapSmol();
  const {
    write: chonkify,
    isLoading: isChonkifying,
    data: chonkifyData,
  } = useChonkify();

  const handleWrapSmol = (tokenId: number) => {
    wrapSmol({
      args: [tokenId],
    });
  };

  const handleUnwrapSmol = (tokenId: number) => {
    unwrapSmol({
      args: [tokenId],
    });
  };

  const handleChonkify = (tokenId: number) => {
    chonkify({
      args: [tokenId],
    });
  };

  // State
  const [selectedTokenId, setSelectedTokenId] = useState(
    parseInt(tokens?.[0]?.tokenId ?? "0")
  );
  const selectedToken =
    tokens?.find(({ tokenId }) => parseInt(tokenId) === selectedTokenId) ??
    wrappedTokens.find(({ tokenId }) => tokenId === selectedTokenId);
  const isSelectedWrapped = wrappedTokenIds.includes(selectedTokenId);
  const requiresMoonRocks = selectedToken?.episodeStat === 6;
  const nextEpisodeActionTime =
    (selectedToken?.lastActionTime ?? 0) + EPISODE_ACTION_INTERVAL;

  useEffect(() => {
    const tokenIds = tokens?.map(({ tokenId }) => parseInt(tokenId));
    if (
      tokenIds &&
      (!selectedTokenId ||
        (!tokenIds.includes(selectedTokenId) && !isSelectedWrapped))
    ) {
      setSelectedTokenId(tokenIds[0]);
    }
  }, [selectedTokenId, tokens, isSelectedWrapped]);

  useEffect(() => {
    if (wrapData) {
      refetchWrappedTokens();
    }
  }, [wrapData, refetchWrappedTokens]);

  useEffect(() => {
    if (unwrapData) {
      refetchWrappedTokens();
    }
  }, [unwrapData, refetchWrappedTokens]);

  useEffect(() => {
    if (chonkifyData) {
      refetchWrappedTokens();
    }
  }, [chonkifyData, refetchWrappedTokens]);

  return (
    <div className="container max-w-5xl mx-auto px-8 pb-12">
      <div className="space-y-8 text-center">
        <h1 className="p-5 inline-block text-4xl lg:text-6xl text-white font-bold uppercase bg-gray-primary shadow-dark-sharp">
          Smol Quests
        </h1>
        <p className="lg:w-1/2 mx-auto text-xl text-white font-medium">
          <span className="underline decoration-orange-team underline-offset-8">
            Wrap your Smol
          </span>{" "}
          to go on quests and transform your Smol.
        </p>
        <div className="space-y-4">
          <h2 className="p-3 inline-block text-2xl lg:text-3xl text-white font-medium bg-gray-primary shadow-orange">
            Episode One: Chonks
          </h2>
          <p className="md:max-w-[75%] mx-auto text-xs md:text-sm text-gray-light">
            McSmols has come to Smolville! Space travel has left the Smols
            famished and in need of some protein. But trouble awaits them. An
            Enjoyoooooor has sprinkled the food with a potion to make McSmols
            customers even hungrier, turning all the Smols into{" "}
            <span className="underline decoration-orange-team underline-offset-4">
              chonks
            </span>
            .
          </p>
        </div>
      </div>
      <BannerImage
        selectedTokenId={selectedTokenId}
        wrappedTokens={wrappedTokens}
        isLoading={isChonkifying}
      />
      <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 text-xs md:text-sm">
        <p className="relative p-3 md:p-4 flex items-center bg-gray-secondary">
          <span className="flex gap-1.5">
            <span className="text-gray-light">1.</span>
            <span>Wrap your Smol after unstaking it from school</span>
          </span>
        </p>
        <p className="p-3 md:p-4 flex items-center justify-center gap-1.5 bg-gray-secondary">
          <span className="flex gap-1.5">
            <span className="text-gray-light">2.</span>
            <span>Chonk your Wrapped Smol once a day to make it chonkier</span>
          </span>
        </p>
        <p className="p-3 md:p-4 flex items-center justify-center gap-1.5 bg-gray-secondary">
          <span className="flex gap-1.5">
            <span className="text-gray-light">3.</span>
            <span>
              Burn 50 Moon Rocks at Chonk Level 7 for a special surprise
            </span>
          </span>
        </p>
      </div>
      <div className="mt-6 md:mt-8 min-h-[150px] flex items-center justify-center bg-gray-primary shadow-dark-sharp">
        {accountData ? (
          <>
            {isLoading ? (
              <div className="w-10 h-10">
                <Spinner />
              </div>
            ) : (
              <>
                {(tokens && tokens.length > 0) || wrappedTokens.length > 0 ? (
                  <div className="p-8 w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-4">
                      <h2 className="text-center font-semibold">
                        Unwrapped Smols
                      </h2>
                      <div
                        className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto"
                        style={{ gridAutoRows: "min-content" }}
                      >
                        {tokens?.map(({ tokenId, name, image }) => (
                          <button
                            key={tokenId}
                            className={clsx(
                              "block aspect-square w-full overflow-hidden rounded-full border-4 border-purple-secondary hover:opacity-100 transition-all",
                              parseInt(tokenId) === selectedTokenId
                                ? "opacity-100 border-purple-primary"
                                : "opacity-70 hover:border-purple-hover"
                            )}
                            onClick={() =>
                              setSelectedTokenId(parseInt(tokenId))
                            }
                          >
                            <img
                              alt={name}
                              src={generateMarketplaceIpfsUrl(image ?? "")}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      {selectedToken && (
                        <span className="block p-3 bg-purple-darker font-semibold">
                          Token ID: {selectedToken.tokenId}
                        </span>
                      )}
                      <div className="mt-4 mb-7 bg-gray-light shadow-dark-sharp">
                        {isSelectedWrapped ? (
                          <>
                            <WrappedSmolImage
                              token={selectedToken}
                              isPfp
                              width={256}
                              height={256}
                              layout="responsive"
                            />
                            <span className="block p-2 text-xs font-semibold bg-purple-secondary">
                              Chonk Level {selectedToken.episodeStat}
                            </span>
                          </>
                        ) : (
                          <Image
                            src={generateMarketplaceIpfsUrl(
                              selectedToken?.image ?? ""
                            )}
                            width={256}
                            height={256}
                            layout="responsive"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        {isSelectedWrapped ? (
                          <>
                            <div className="flex flex-col gap-1 text-center">
                              {requiresMoonRocks && !isSmolTreasuresApproved ? (
                                <Button
                                  onClick={() => approveSmolTreasures()}
                                  disabled={isApprovingSmolTreasures}
                                >
                                  {isApprovingSmolTreasures
                                    ? "Approving..."
                                    : "Approve Smol Treasures"}
                                </Button>
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleChonkify(selectedTokenId)
                                  }
                                  disabled={
                                    isChonkifying ||
                                    (requiresMoonRocks &&
                                      !isSmolTreasuresApproved) ||
                                    selectedToken.episodeStat === 7
                                  }
                                >
                                  {selectedToken.episodeStat === 7
                                    ? "Max Chonk Level Reached"
                                    : isChonkifying
                                    ? "Snacking..."
                                    : "Chonk!"}
                                </Button>
                              )}
                              {selectedToken.episodeStat < 7 &&
                                getShortTimestamp() < nextEpisodeActionTime && (
                                  <span className="text-xs text-gray-light">
                                    Next chonk available in{" "}
                                    <Countdown target={nextEpisodeActionTime} />
                                  </span>
                                )}
                              {selectedToken.episodeStat === 6 && (
                                <span className="text-xs text-gray-light">
                                  Chonk Level 7 costs 50 Moon Rocks
                                </span>
                              )}
                            </div>
                            <Button
                              onClick={() => handleUnwrapSmol(selectedTokenId)}
                              disabled={isUnwrappingSmol}
                              className="bg-transparent border border-purple-primary hover:bg-purple-dark"
                            >
                              {isUnwrappingSmol ? "Unwrapping..." : "Unwrap"}
                            </Button>
                          </>
                        ) : (
                          <>
                            {isSmolBrainsApproved ? (
                              <Button
                                onClick={() => handleWrapSmol(selectedTokenId)}
                                disabled={isWrappingSmol}
                              >
                                {isWrappingSmol ? "Wrapping..." : "Wrap Smol"}
                              </Button>
                            ) : (
                              <Button
                                onClick={() => approveSmolBrains()}
                                disabled={isApprovingSmolBrains}
                              >
                                {isApprovingSmolBrains
                                  ? "Approving..."
                                  : "Approve Smols"}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-center font-semibold">
                        Wrapped Smols
                      </h2>
                      {wrappedTokens.length > 0 && (
                        <div
                          className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto"
                          style={{ gridAutoRows: "min-content" }}
                        >
                          {wrappedTokens.map((token) => (
                            <button
                              key={token.tokenId}
                              className={clsx(
                                "block aspect-square w-full overflow-hidden rounded-full bg-gray-light border-4 border-purple-secondary hover:opacity-100 transition-all",
                                token.tokenId === selectedTokenId
                                  ? "opacity-100 border-purple-primary"
                                  : "opacity-70 hover:border-purple-hover"
                              )}
                              onClick={() => setSelectedTokenId(token.tokenId)}
                            >
                              <WrappedSmolImage
                                token={token}
                                isPfp
                                width={128}
                                height={128}
                                layout="responsive"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold">
                      You don&apos;t own any Smol Brains.
                    </p>
                    <a
                      href="https://marketplace.treasure.lol/collection/smol-brains"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                    >
                      Buy on Treasure Marketplace
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
}
