import { resolve } from "node:path";
import { config as dotenvConfig } from "dotenv";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(process.cwd(), dotenvConfigPath) });

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
if (typeof ALCHEMY_API_KEY === "undefined") {
  console.log(`ALCHEMY_API_KEY must be a defined environment variable`);
}

const alchemyUrl = (network: string): string => `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

/**
 * All supported network names
 * To use a network in your command use the value of each key
 *
 * e.g.
 *
 * $ bun deploy:network mainnet
 *
 * $ npx hardhat run scripts/deploy.ts --network polygon_mainnet
 */
export enum NetworkName {
  // BASE
  BASE = "base",
  BASE_SEPOLIA = "base_sepolia",

  // BINANCE SMART CHAIN
  BNB_SMART_CHAIN = "bnb_smart_chain",
  BNB_SMART_CHAIN_TESTNET = "bnb_smart_chain_testnet",

  // ETHEREUM
  MAINNET = "mainnet",
  SEPOLIA = "sepolia",

  // POLYGON
  POLYGON_MAINNET = "polygon_mainnet",
  POLYGON_AMOY = "polygon_amoy",
}

export interface Network {
  chainId: number;
  url: string;
}

export const NETWORKS: { readonly [key in NetworkName]: Network } = {
  // BASE
  [NetworkName.BASE]: {
    chainId: 8453,
    url: alchemyUrl("base"),
  },
  [NetworkName.BASE_SEPOLIA]: {
    chainId: 84531,
    url: alchemyUrl("base-sepolia"),
  },

  // BINANCE SMART CHAIN
  [NetworkName.BNB_SMART_CHAIN]: {
    chainId: 56,
    url: "https://bsc-dataseed1.defibit.io/",
  },
  [NetworkName.BNB_SMART_CHAIN_TESTNET]: {
    chainId: 97,
    url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
  },

  // ETHEREUM
  [NetworkName.MAINNET]: {
    chainId: 1,
    url: alchemyUrl("mainnet"),
  },
  [NetworkName.SEPOLIA]: {
    chainId: 11_155_111,
    url: alchemyUrl("sepolia"),
  },

  // MATIC/POLYGON
  [NetworkName.POLYGON_MAINNET]: {
    chainId: 137,
    url: alchemyUrl("polygon-mainnet"),
  },
  [NetworkName.POLYGON_AMOY]: {
    chainId: 80_001,
    url: alchemyUrl("polygon-amoy"),
  },
} as const;

export const DEVELOPMENT_CHAINS: string[] = ["hardhat", "localhost", "anvil"];
