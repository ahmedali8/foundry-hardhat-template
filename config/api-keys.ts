import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(process.cwd(), dotenvConfigPath) });

export const API_KEYS: string | Record<string, string> | undefined = {
  // ETHEREUM
  mainnet: process.env.ETHERSCAN_API_KEY || "",
  goerli: process.env.ETHERSCAN_API_KEY || "",
  sepolia: process.env.ETHERSCAN_API_KEY || "",

  // BINANCE SMART CHAIN
  bsc: process.env.BSCSCAN_API_KEY || "",
  bscTestnet: process.env.BSCSCAN_API_KEY || "",

  // MATIC/POLYGON
  polygon: process.env.POLYGONSCAN_API_KEY || "",
  polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",

  // OPTIMISM
  optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
  optimisticGoerli: process.env.OPTIMISM_API_KEY || "",

  // ARBITRUM
  arbitrumOne: process.env.ARBISCAN_API_KEY || "",
  arbitrumTestnet: process.env.ARBISCAN_API_KEY || "",

  // AVALANCHE
  avalanche: process.env.SNOWTRACE_API_KEY || "",
  avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",

  // FANTOM
  opera: process.env.FANTOM_API_KEY || "",
  ftmTestnet: process.env.FANTOM_API_KEY || "",
} as const;
