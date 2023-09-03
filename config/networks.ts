import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(process.cwd(), dotenvConfigPath) });

const INFURA_KEY = process.env.INFURA_API_KEY;
if (typeof INFURA_KEY === "undefined") {
  console.log(`INFURA_API_KEY must be a defined environment variable`);
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
  GOERLI = "goerli",
  SEPOLIA = "sepolia",

  // BINANCE SMART CHAIN
  BSC = "bsc",
  BSC_TESTNET = "bsc-testnet",

  // POLYGON
  POLYGON_MAINNET = "polygon-mainnet",
  POLYGON_MUMBAI = "polygon-mumbai",

  // OPTIMISM
  OPTIMISM_MAINNET = "optimism-mainnet",
  OPTIMISM_GOERLI = "optimism-goerli",

  // ARBITRUM
  ARBITRUM_MAINNET = "arbitrum-mainnet",
  ARBITRUM_GOERLI = "arbitrum-goerli",

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
  [NetworkName.GOERLI]: {
    chainId: 5,
    url: infuraUrl("goerli"),
  },
  [NetworkName.SEPOLIA]: {
    chainId: 11_155_111,
    url: infuraUrl("sepolia"),
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
    chainId: 80_001,
    url: infuraUrl("polygon-mumbai"),
  },

  // OPTIMISM
  [NetworkName.OPTIMISM_MAINNET]: {
    chainId: 10,
    url: infuraUrl("optimism-mainnet"),
  },
  [NetworkName.OPTIMISM_GOERLI]: {
    chainId: 420,
    url: infuraUrl("optimism-goerli"),
  },

  // ARBITRUM
  [NetworkName.ARBITRUM_MAINNET]: {
    chainId: 42_161,
    url: infuraUrl("arbitrum-mainnet"),
  },
  [NetworkName.ARBITRUM_GOERLI]: {
    chainId: 421_611,
    url: infuraUrl("arbitrum-goerli"),
  },

  // AVALANCHE
  [NetworkName.AVALANCHE_MAINNET]: {
    chainId: 43_114,
    url: `https://api.avax.network/ext/bc/C/rpc`,
  },
  [NetworkName.FUJI_AVALANCHE]: {
    chainId: 43_113,
    url: `https://api.avax-test.network/ext/bc/C/rpc`,
  },

  // FANTOM
  [NetworkName.FANTOM_MAINNET]: {
    chainId: 250,
    url: `https://rpcapi.fantom.network`,
  },
  [NetworkName.FANTOM_TESTNET]: {
    chainId: 4_002,
    url: `https://rpc.testnet.fantom.network`,
  },
} as const;

export const DEVELOPMENT_CHAINS: string[] = ["hardhat", "localhost", "ganache"];
