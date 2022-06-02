import { ConnectButton } from "./ConnectButton";

export const Header = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 flex justify-between">
      <div className="w-[50px] h-[50px] border-2 border-gray-primary rounded-full overflow-hidden">
        <img alt="" src="/img/logo.png" />
      </div>
      <ConnectButton />
    </div>
  );
};
