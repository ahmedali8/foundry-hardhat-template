import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox";
import "@primitivefi/hardhat-dodoc";
import { config as dotenvConfig } from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import { removeConsoleLog } from "hardhat-preprocessor";
import "hardhat-test-suite-generator";
import type { HardhatUserConfig } from "hardhat/config";
import type { HttpNetworkAccountsUserConfig, NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";

import { API_KEYS } from "./config/api-keys";
import { NETWORKS, Network, NetworkName } from "./config/networks";
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
      `0x${privateKey}`,
      // `0x${process.env.PRIVATE_KEY_2}`,
      // `0x${process.env.PRIVATE_KEY_3}`,
      // `0x${process.env.PRIVATE_KEY_4}`,
      // `0x${process.env.PRIVATE_KEY_5}`,
    ];
  } else {
    // use mnemonic
    return {
      mnemonic,
      count: 10,
      path: "m/44'/60'/0'/0",
    };
  }
};

// { [key in NetworkName]: { chainId, url, accounts } }
function getAllNetworkConfigs(): Record<NetworkName, NetworkUserConfig> {
  const networkConfigs = Object.entries(NETWORKS).reduce<Record<string, NetworkUserConfig>>(
    (memo, network) => {
      const key = network[0] as NetworkName;
      const value = network[1] as Network;

      memo[key] = {
        ...value,
        accounts: getAccounts(),
      };
      return memo;
    },
    {}
  );

  return networkConfigs as Record<NetworkName, NetworkUserConfig>;
}

const config: HardhatUserConfig = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: process.env.CONTRACT_SIZER ? true : false,
    disambiguatePaths: false,
  },
  defaultNetwork: "hardhat",
  dodoc: {
    runOnCompile: false,
    debugMode: false,
    keepFileStructure: true,
    freshOutput: true,
    outputDir: "./dodoc",
    include: ["contracts"],
  },
  etherscan: {
    apiKey: API_KEYS,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    // gasPrice: process.env.GAS_PRICE, // if commented out then it fetches from ethGasStationAPI
    coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY || undefined,
    excludeContracts: [],
    src: "./contracts",
    maxMethodDiff: 10,
    maxDeploymentDiff: 10,
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
    artifacts: "./artifacts",
    cache: "./cache_hardhat",
    deploy: "./deploy",
    deployments: "./deployments",
    sources: "./contracts",
    tests: "./test",
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (hre) => hre.network.name !== "hardhat" && hre.network.name !== "ganache"
    ),
  },
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
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
          evmVersion: "paris",
        },
      },
    ],
  },
  testSuiteGenerator: {
    // What contracts to exclude from the test suite
    // Defaults to []
    excludeContracts: [],
    // Out directory name for the test suite
    // Must not contain "/"
    // Defaults to "test"
    outDirName: "test",
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
