import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@primitivefi/hardhat-dodoc";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import { removeConsoleLog } from "hardhat-preprocessor";
import "hardhat-storage-layout";
import "hardhat-test-utils";
import "hardhat-tracer";
import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkAccountsUserConfig, NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";
import "solidity-coverage";

import { API_KEYS } from "./config/api-keys";
import { NETWORKS, Network, NetworkName } from "./config/networks";
import "./tasks";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const ACCOUNT_TYPE: string = process.env.ACCOUNT_TYPE || "";
const mnemonic: string = process.env.MNEMONIC || "";
if (ACCOUNT_TYPE === "MNEMONIC" && !mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}
if (ACCOUNT_TYPE === "PRIVATE_KEYS" && typeof process.env.PRIVATE_KEY_1 === "undefined") {
  throw new Error("Please set at least one PRIVATE_KEY_1 in a .env file");
}

const getAccounts = (): HttpNetworkAccountsUserConfig => {
  if (ACCOUNT_TYPE === "MNEMONIC")
    return {
      mnemonic,
      count: 10,
      path: "m/44'/60'/0'/0",
    };
  // can add as many private keys as you want
  else
    return [
      `0x${process.env.PRIVATE_KEY_1}`,
      // `0x${process.env.PRIVATE_KEY_2}`,
      // `0x${process.env.PRIVATE_KEY_3}`,
      // `0x${process.env.PRIVATE_KEY_4}`,
      // `0x${process.env.PRIVATE_KEY_5}`,
    ];
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
    outputDir: "./generated/docs",
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
    artifacts: "./generated/artifacts/hardhat",
    cache: "./generated/cache/hardhat",
    deploy: "./deploy",
    deployments: "./generated/deployments",
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
        version: "0.8.15",
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/solidity-template/issues/31
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
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
};

export default config;
