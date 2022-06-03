import Image, { ImageProps } from "next/image";

import { generateIpfsUrl } from "../utils/image";

type Props = Partial<ImageProps> & {
  token: {
    image: string;
    pfp: string;
  };
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
