import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "../.env") });

export const API_KEYS: string | Record<string, string> | undefined = {
  // ETHEREUM
  mainnet: process.env.ETHERSCAN_API_KEY || "",
  kovan: process.env.ETHERSCAN_API_KEY || "",
  goerli: process.env.ETHERSCAN_API_KEY || "",
  rinkeby: process.env.ETHERSCAN_API_KEY || "",
  ropsten: process.env.ETHERSCAN_API_KEY || "",
  sepolia: process.env.ETHERSCAN_API_KEY || "",

  // BINANCE SMART CHAIN
  bsc: process.env.BSCSCAN_API_KEY || "",
  bscTestnet: process.env.BSCSCAN_API_KEY || "",

  // MATIC/POLYGON
  polygon: process.env.POLYGONSCAN_API_KEY || "",
  polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",

  // OPTIMISM
  optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
  optimisticKovan: process.env.OPTIMISM_API_KEY || "",

  // ARBITRUM
  arbitrumOne: process.env.ARBISCAN_API_KEY || "",
  arbitrumTestnet: process.env.ARBISCAN_API_KEY || "",

  // AVALANCHE
  avalanche: process.env.SNOWTRACE_API_KEY || "",
  avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",

  // FANTOM
  opera: process.env.FANTOM_API_KEY || "",
  ftmTestnet: process.env.FANTOM_API_KEY || "",
};
