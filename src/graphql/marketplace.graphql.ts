import gql from "graphql-tag";

export const getUserTokenBalance = gql`
  query getUserTokenBalance($id: String!, $token: String!) {
    userTokens(where: { user: $id, token: $token }) {
      quantity
    }
  }
`;
