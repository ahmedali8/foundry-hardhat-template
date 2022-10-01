import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "../.env") });

const INFURA_KEY = process.env.INFURA_PROJECT_ID;
if (typeof INFURA_KEY === "undefined") {
  throw new Error(`INFURA_PROJECT_ID must be a defined environment variable`);
}

const infuraUrl = (network: string): string => `https://${network}.infura.io/v3/${INFURA_KEY}`;

/**
 * All supported network names
 * To use a network in your command use the value of each key
 *
 * e.g.
 *
 * $ yarn deploy:network mainnet
 *
 * $ npx hardhat run scripts/deploy.ts --network polygon-mainnet
 */
export enum NetworkName {
  // ETHEREUM
  MAINNET = "mainnet",
  KOVAN = "kovan",
  GOERLI = "goerli",
  RINKEBY = "rinkeby",
  ROPSTEN = "ropsten",
  SEPOLIA = "sepolia",

  // BINANCE SMART CHAIN
  BSC = "bsc",
  BSC_TESTNET = "bsc-testnet",

  // POLYGON
  POLYGON_MAINNET = "polygon-mainnet",
  POLYGON_MUMBAI = "polygon-mumbai",

  // OPTIMISM
  OPTIMISM_MAINNET = "optimism-mainnet",
  OPTIMISM_KOVAN = "optimism-kovan",

  // ARBITRUM
  ARBITRUM_MAINNET = "arbitrum-mainnet",
  ARBITRUM_RINKEBY = "arbitrum-rinkeby",

  // AVALANCHE
  AVALANCHE_MAINNET = "avalanche-mainnet",
  FUJI_AVALANCHE = "fuji-avalance",

  // FANTOM
  FANTOM_MAINNET = "fantom-mainnet",
  FANTOM_TESTNET = "fantom-testnet",
}

export interface Network {
  chainId: number;
  url: string;
}

export const NETWORKS: { readonly [key in NetworkName]: Network } = {
  // ETHEREUM
  [NetworkName.MAINNET]: {
    chainId: 1,
    url: infuraUrl("mainnet"),
  },
  [NetworkName.KOVAN]: {
    chainId: 42,
    url: infuraUrl("kovan"),
  },
  [NetworkName.GOERLI]: {
    chainId: 5,
    url: infuraUrl("goerli"),
  },
  [NetworkName.RINKEBY]: {
    chainId: 4,
    url: infuraUrl("rinkeby"),
  },
  [NetworkName.ROPSTEN]: {
    chainId: 3,
    url: infuraUrl("ropsten"),
  },
  [NetworkName.SEPOLIA]: {
    chainId: 11155111,
    url: "",
  },

  // BINANCE SMART CHAIN
  [NetworkName.BSC]: {
    chainId: 56,
    url: "https://bsc-dataseed1.defibit.io/",
  },
  [NetworkName.BSC_TESTNET]: {
    chainId: 97,
    url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
  },

  // MATIC/POLYGON
  [NetworkName.POLYGON_MAINNET]: {
    chainId: 137,
    url: infuraUrl("polygon-mainnet"),
  },
  [NetworkName.POLYGON_MUMBAI]: {
    chainId: 80001,
    url: infuraUrl("polygon-mumbai"),
  },

  // OPTIMISM
  [NetworkName.OPTIMISM_MAINNET]: {
    chainId: 10,
    url: infuraUrl("optimism-mainnet"),
  },
  [NetworkName.OPTIMISM_KOVAN]: {
    chainId: 69,
    url: infuraUrl("optimism-kovan"),
  },

  // ARBITRUM
  [NetworkName.ARBITRUM_MAINNET]: {
    chainId: 42161,
    url: infuraUrl("arbitrum-mainnet"),
  },
  [NetworkName.ARBITRUM_RINKEBY]: {
    chainId: 421611,
    url: infuraUrl("arbitrum-rinkeby"),
  },

  // AVALANCHE
  [NetworkName.AVALANCHE_MAINNET]: {
    chainId: 43114,
    url: `https://api.avax.network/ext/bc/C/rpc`,
  },
  [NetworkName.FUJI_AVALANCHE]: {
    chainId: 43113,
    url: `https://api.avax-test.network/ext/bc/C/rpc`,
  },

  // FANTOM
  [NetworkName.FANTOM_MAINNET]: {
    chainId: 250,
    url: `https://rpcapi.fantom.network`,
  },
  [NetworkName.FANTOM_TESTNET]: {
    chainId: 4002,
    url: `https://rpc.testnet.fantom.network`,
  },
} as const;
