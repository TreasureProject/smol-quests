import gql from "graphql-tag";

export const getUserTokens = gql`
  query getUserTokens($id: String!, $collection: String!) {
    tokens(where: { collection: $collection, owner: $id }) {
      tokenId
      name
      image
    }
  }
`;
