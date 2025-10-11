import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox";
import "@primitivefi/hardhat-dodoc";
import { config as dotenvConfig } from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import { resolve } from "node:path";
import { type HardhatUserConfig } from "hardhat/config";
import { type HttpNetworkAccountsUserConfig, type NetworkUserConfig } from "hardhat/types";

import { NETWORKS, type Network, type NetworkName } from "./config/networks";
import "./tasks";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const TEST_MNEMONIC: string = "test test test test test test test test test test test junk";
const mnemonic: string = process.env.MNEMONIC || TEST_MNEMONIC;
const privateKey: string = process.env.PRIVATE_KEY || "";

/**
 * - If $PRIVATE_KEY is defined, use it.
 * - If $MNEMONIC is not defined, default to a test mnemonic.
 */
const getAccounts = (): HttpNetworkAccountsUserConfig => {
  if (privateKey) {
    // can add as many private keys as you want
    return [
      privateKey,
      // process.env.PRIVATE_KEY_2,
      // process.env.PRIVATE_KEY_3,
      // process.env.PRIVATE_KEY_4,
      // process.env.PRIVATE_KEY_5,
    ];
  } else {
    // use mnemonic
    return {
      count: 10,
      mnemonic,
      path: "m/44'/60'/0'/0",
    };
  }
};

// { [key in NetworkName]: { chainId, url, accounts } }
function getAllNetworkConfigs(): Record<NetworkName, NetworkUserConfig> {
  const networkConfigs = Object.entries(NETWORKS).reduce<Record<string, NetworkUserConfig>>((memo, network) => {
    const key = network[0] as NetworkName;
    const value = network[1] as Network;

    memo[key] = {
      ...value,
      accounts: getAccounts(),
    };
    return memo;
  }, {});

  return networkConfigs as Record<NetworkName, NetworkUserConfig>;
}

const config: HardhatUserConfig = {
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: process.env.CONTRACT_SIZER === "true",
  },
  defaultNetwork: "hardhat",
  dodoc: {
    debugMode: false,
    freshOutput: true,
    include: ["contracts"],
    keepFileStructure: true,
    outputDir: "./dodoc",
    runOnCompile: false,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  gasReporter: {
    // gasPrice: process.env.GAS_PRICE, // if commented out then it fetches from ethGasStationAPI
    coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS === "true",
    excludeContracts: [],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  networks: {
    // Local network configs
    anvil: { chainId: 31337, url: "http://127.0.0.1:8545" },
    ganache: { chainId: 1337, url: "http://127.0.0.1:7545" },
    hardhat: { chainId: 31337 },
    localhost: { chainId: 31337 },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },
    // Mainnet and Testnet configs
    ...getAllNetworkConfigs(),
  },
  paths: {
    cache: "./cache_hardhat",
    tests: "./tests",
  },
  solidity: {
    compilers: [
      {
        settings: {
          evmVersion: "cancun",
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/hardhat-template/issues/31
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
        version: "0.8.26",
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
