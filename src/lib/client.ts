import { GraphQLClient } from "graphql-request";

import { getSdk as getMarketplaceSdk } from "../../generated/marketplace.graphql";
import { getSdk as getQueriesSdk } from "../../generated/queries.graphql";

export const client = getQueriesSdk(
  new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL as string)
);

export const marketplaceClient = getMarketplaceSdk(
  new GraphQLClient(process.env.NEXT_PUBLIC_MARKETPLACE_GRAPHQL_URL as string)
);

export default client;
