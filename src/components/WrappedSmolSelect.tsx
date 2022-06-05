import { Fragment, ReactNode } from "react";

import { Popover, Transition } from "@headlessui/react";

import type { WrappedSmolToken } from "../types";
import { WrappedSmolImage } from "./WrappedSmolImage";

type Props = {
  label: ReactNode;
  tokens: WrappedSmolToken[];
  onSelect: (token: WrappedSmolToken) => void;
};

export const WrappedSmolSelect = ({ label, tokens, onSelect }: Props) => {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="px-3 py-1 text-white font-medium bg-purple-primary transition-all rounded-md hover:bg-purple-hover active:shadow-purple-active focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {label}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-screen max-w-xs -translate-x-1/2 transform">
              <div className="p-4 overflow-hidden bg-gray-secondary rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto"
                  style={{ gridAutoRows: "min-content" }}
                >
                  {tokens.map((token) => (
                    <button
                      key={token.tokenId}
                      className="block aspect-square w-full overflow-hidden rounded-full bg-gray-light border-4 border-purple-secondary hover:border-purple-hover transition-all"
                      onClick={() => {
                        close();
                        onSelect(token);
                      }}
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
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
