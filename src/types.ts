export type Optional<T> = T | undefined;

export enum AppContract {
  SmolBrains,
  SmolTreasures,
  WrappedSmols,
  EpisodeOne,
}

export type ContractMap = Record<AppContract, string>;

export type ContractError = Error & {
  data?: {
    code?: number;
    message?: string;
  };
};
