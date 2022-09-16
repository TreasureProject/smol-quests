import clsx from "clsx";

type Props = {
  className?: string;
};

export const DiscordIcon = ({ className }: Props) => (
  <svg viewBox="0 0 40 40" className={className}>
    <path
      d="M29.9959 11.4011C28.1072 10.5485 26.109 9.94263 24.0543 9.59961C23.7984 10.046 23.4994 10.6465 23.2932 11.1242C21.0778 10.8028 18.8828 10.8028 16.7082 11.1242C16.5021 10.6466 16.1963 10.046 15.938 9.59961C13.8813 9.94278 11.8814 10.5502 9.99183 11.4055C6.23163 16.8879 5.21226 22.234 5.72189 27.5044C8.2159 29.3013 10.6329 30.3929 13.0091 31.1072C13.5996 30.3237 14.1217 29.4941 14.5698 28.6271C13.7166 28.3138 12.8941 27.9276 12.1121 27.4731C12.3179 27.3259 12.5189 27.1726 12.7147 27.0132C17.4534 29.1517 22.6023 29.1517 27.2845 27.0132C27.4812 27.1715 27.6821 27.3249 27.887 27.4731C27.1037 27.9287 26.2797 28.3157 25.4248 28.6294C25.8755 29.4999 26.3966 30.3303 26.9855 31.1094C29.364 30.3952 31.7832 29.3036 34.2772 27.5044C34.8753 21.3947 33.2557 16.0976 29.9959 11.401V11.4011ZM15.2154 24.2632C13.7929 24.2632 12.6262 22.9818 12.6262 21.4215C12.6262 19.8612 13.768 18.5777 15.2154 18.5777C16.663 18.5777 17.8295 19.859 17.8046 21.4215C17.8069 22.9818 16.663 24.2632 15.2154 24.2632ZM24.7837 24.2632C23.3611 24.2632 22.1946 22.9818 22.1946 21.4215C22.1946 19.8612 23.3362 18.5777 24.7837 18.5777C26.2312 18.5777 27.3977 19.859 27.3729 21.4215C27.3729 22.9818 26.2312 24.2632 24.7837 24.2632Z"
      fill="currentColor"
    />
  </svg>
);

export const GitHubIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={clsx("py-1.5", className)}>
    <path
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      fill="currentColor"
    />
  </svg>
);

export const TwitterIcon = ({ className }: Props) => (
  <svg viewBox="0 0 40 40" className={className}>
    <path
      d="M33.6001 11.7864C32.5897 12.2342 31.5041 12.5367 30.3629 12.6735C31.5404 11.9689 32.4214 10.86 32.8414 9.55364C31.7351 10.2108 30.5243 10.6733 29.2617 10.9211C28.4126 10.0146 27.288 9.41366 26.0624 9.21174C24.8368 9.00982 23.5789 9.21818 22.4838 9.80445C21.3888 10.3907 20.518 11.3221 20.0065 12.4541C19.4951 13.586 19.3716 14.8551 19.6554 16.0643C17.4138 15.9518 15.2209 15.3692 13.219 14.3543C11.2171 13.3394 9.45105 11.9149 8.03535 10.1733C7.55128 11.0083 7.27294 11.9764 7.27294 13.0075C7.2724 13.9357 7.50098 14.8496 7.93839 15.6683C8.3758 16.487 9.00852 17.185 9.78041 17.7005C8.88522 17.672 8.00978 17.4301 7.22695 16.995V17.0676C7.22686 18.3694 7.67718 19.6312 8.50148 20.6388C9.32579 21.6464 10.4733 22.3378 11.7494 22.5956C10.9189 22.8204 10.0483 22.8535 9.20316 22.6924C9.56318 23.8126 10.2645 24.7921 11.2089 25.4939C12.1532 26.1957 13.2934 26.5846 14.4698 26.6061C12.4728 28.1738 10.0066 29.0241 7.46778 29.0204C7.01806 29.0205 6.56871 28.9943 6.12207 28.9417C8.69909 30.5987 11.6989 31.478 14.7627 31.4746C25.1338 31.4746 30.8034 22.8849 30.8034 15.4351C30.8034 15.193 30.7974 14.9486 30.7865 14.7065C31.8893 13.909 32.8413 12.9214 33.5977 11.79L33.6001 11.7864Z"
      fill="currentColor"
    />
  </svg>
);