export const generateIpfsUrl = (path?: string) => {
  const normalizedPath = path?.replace("ipfs://", "") ?? "";
  return `https://smolart.mypinata.cloud/ipfs/${normalizedPath}`;
};

export const generateMarketplaceIpfsUrl = (path?: string) => {
  const normalizedPath =
    path?.replace("https://gateway.pinata.cloud/ipfs/", "") ?? "";
  return `https://treasure-marketplace.mypinata.cloud/ipfs/${normalizedPath}`;
};
