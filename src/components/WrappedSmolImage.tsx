import Image, { ImageProps } from "next/image";

import type { WrappedSmolToken } from "../types";
import { generateIpfsUrl } from "../utils/image";

type Props = Partial<ImageProps> & {
  token: WrappedSmolToken;
  isPfp?: boolean;
};

export const WrappedSmolImage = ({
  token: { image, pfp },
  isPfp = false,
  ...imageProps
}: Props) => {
  return (
    <Image {...imageProps} alt="" src={generateIpfsUrl(isPfp ? pfp : image)} />
  );
};
