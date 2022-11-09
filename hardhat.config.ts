import "@nomicfoundation/hardhat-toolbox";
import "@primitivefi/hardhat-dodoc";
import { config as dotenvConfig } from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import { removeConsoleLog } from "hardhat-preprocessor";
import "hardhat-storage-layout";
import "hardhat-test-suite-generator";
import type { HardhatUserConfig } from "hardhat/config";
import type { HttpNetworkAccountsUserConfig, NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";

import { API_KEYS } from "./config/api-keys";
import { NETWORKS, Network, NetworkName } from "./config/networks";
import "./tasks";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const ACCOUNT_TYPE: string = process.env.ACCOUNT_TYPE || "";
const mnemonic: string = process.env.MNEMONIC || "";
if (ACCOUNT_TYPE === "MNEMONIC" && !mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}
if (ACCOUNT_TYPE === "PRIVATE_KEYS" && typeof process.env.PRIVATE_KEY_1 === "undefined") {
  throw new Error("Please set at least one PRIVATE_KEY_1 in a .env file");
}

const getAccounts = (): HttpNetworkAccountsUserConfig => {
  if (ACCOUNT_TYPE === "PRIVATE_KEYS") {
    // can add as many private keys as you want
    return [
      `0x${process.env.PRIVATE_KEY_1}`,
      // `0x${process.env.PRIVATE_KEY_2}`,
      // `0x${process.env.PRIVATE_KEY_3}`,
      // `0x${process.env.PRIVATE_KEY_4}`,
      // `0x${process.env.PRIVATE_KEY_5}`,
    ];
  } else {
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
    outputDir: "./docs",
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
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  networks: {
    // LOCAL
    hardhat: { chainId: 31337 },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },
    ganache: { chainId: 1337, url: "http://127.0.0.1:7545" },

    ...getAllNetworkConfigs(),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
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
        version: "0.8.17",
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
          // https://docs.soliditylang.org/en/v0.8.14/internals/layout_in_storage.html
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
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
    target: "ethers-v5",
  },
};

export default config;
