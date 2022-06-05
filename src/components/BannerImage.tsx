import { useEffect, useRef, useState } from "react";

import {
  DownloadIcon,
  SwitchHorizontalIcon,
  XIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import NextImage from "next/image";

import Banner from "../../public/img/banner.gif";
import { SmolToken, WrappedSmolToken } from "../types";
import { generateIpfsUrl } from "../utils/image";
import { Button } from "./Button";
import { Spinner } from "./Spinner";
import { WrappedSmolImage } from "./WrappedSmolImage";
import { WrappedSmolSelect } from "./WrappedSmolSelect";

type Props = {
  selectedTokenId?: number;
  wrappedTokens: WrappedSmolToken[];
  isLoading?: boolean;
};

export const BannerImage = ({
  selectedTokenId,
  wrappedTokens,
  isLoading,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedFrenId, setSelectedFrenId] = useState<number | undefined>();

  const selectedTokenImageSrc = wrappedTokens.find(
    ({ tokenId }) => tokenId === selectedTokenId
  )?.image;

  const selectedFrenImageSrc = wrappedTokens.find(
    ({ tokenId }) => tokenId === selectedFrenId
  )?.pfp;

  const handleDownload = () => {
    const dataUrl = canvasRef.current?.toDataURL();
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = "smol_quests.png";
      link.href = dataUrl;
      link.click();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = generateIpfsUrl(selectedTokenImageSrc);
        image.onload = () => {
          if (isReversed) {
            ctx.save();
            ctx.scale(-1, 1);
          }

          ctx.drawImage(
            image,
            0,
            0,
            isReversed ? -canvas.width : canvas.width,
            canvas.height
          );

          if (isReversed) {
            ctx.restore();
          }
        };
      }
    }
  }, [selectedTokenImageSrc, selectedFrenImageSrc, isReversed]);

  useEffect(() => {
    if (selectedFrenImageSrc) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = generateIpfsUrl(selectedFrenImageSrc);
          image.onload = () => {
            if (!isReversed) {
              ctx.save();
              ctx.scale(-1, 1);
            }

            const imageSize = canvas.height;
            ctx.drawImage(
              image,
              isReversed
                ? canvas.width * 0.08
                : -(canvas.width * 0.92) + imageSize,
              0,
              isReversed ? imageSize : -imageSize,
              imageSize
            );
            ctx.restore();
          };
        }
      }
    }
  }, [selectedFrenImageSrc, isReversed]);

  useEffect(() => {
    setSelectedFrenId(undefined);
  }, [selectedTokenId]);

  return (
    <div className="my-6 relative group shadow-orange-lg">
      {selectedTokenId ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-10 h-10">
                <Spinner />
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 z-20 hidden group-hover:flex items-center gap-1.5">
            <Button
              className="flex items-center gap-1"
              size="sm"
              onClick={() => setIsReversed((current) => !current)}
            >
              <SwitchHorizontalIcon className="w-4 h-4" />
              Reverse
            </Button>
            {wrappedTokens.length > 0 && (
              <>
                {selectedFrenId ? (
                  <Button
                    className="flex items-center gap-1"
                    size="sm"
                    onClick={() => setSelectedFrenId(undefined)}
                  >
                    <XIcon className="w-4 h-4" />
                    Uninvite Fren
                  </Button>
                ) : (
                  <WrappedSmolSelect
                    label="+ Invite Fren"
                    tokens={wrappedTokens.filter(
                      ({ tokenId }) => tokenId !== selectedTokenId
                    )}
                    onSelect={(token) => setSelectedFrenId(token.tokenId)}
                  />
                )}
              </>
            )}
            <Button
              className="flex items-center gap-1"
              size="sm"
              onClick={handleDownload}
            >
              <DownloadIcon className="w-4 h-4" />
              Download
            </Button>
          </div>
          <canvas
            ref={canvasRef}
            className="w-full aspect-[3/1] bg-gray-primary"
            width={1500}
            height={500}
          />
        </>
      ) : (
        <NextImage
          alt=""
          src={Banner.src}
          width={1500}
          height={500}
          layout="responsive"
        />
      )}
    </div>
  );
};
