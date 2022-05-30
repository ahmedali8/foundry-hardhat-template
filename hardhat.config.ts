import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-docgen";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import {
  HttpNetworkAccountsUserConfig,
  NetworkUserConfig,
} from "hardhat/types";
import { resolve } from "path";
import "solidity-coverage";

// require tasks
import "./tasks";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const ACCOUNT_TYPE: string = process.env.ACCOUNT_TYPE || "";
const mnemonic: string = process.env.MNEMONIC || "";
if (ACCOUNT_TYPE === "MNEMONIC" && !mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}
if (
  ACCOUNT_TYPE === "PRIVATE_KEYS" &&
  typeof process.env.PRIVATE_KEY_1 === "undefined"
) {
  throw new Error("Please set at least one PRIVATE_KEY_1 in a .env file");
}

const INFURA_KEY = process.env.INFURA_PROJECT_ID;
if (typeof INFURA_KEY === "undefined") {
  throw new Error(`INFURA_PROJECT_ID must be a defined environment variable`);
}

const infuraUrl = (network: string): string =>
  `https://${network}.infura.io/v3/${INFURA_KEY}`;

const networks = {
  // LOCAL
  ganache: { chainId: 1337, url: "http://127.0.0.1:7545" },

  // ETHEREUM
  mainnet: {
    chainId: 1,
    url: infuraUrl("mainnet"),
  },
  kovan: {
    chainId: 42,
    url: infuraUrl("kovan"),
  },
  goerli: {
    chainId: 5,
    url: infuraUrl("goerli"),
  },
  rinkeby: {
    chainId: 4,
    url: infuraUrl("rinkeby"),
  },
  ropsten: {
    chainId: 3,
    url: infuraUrl("ropsten"),
  },

  // BINANCE SMART CHAIN
  bsc: {
    chainId: 56,
    url: process.env.BSC_MAINNET_RPC_URL,
  },
  bscTestnet: {
    chainId: 97,
    url: process.env.BSC_TESTNET_RPC_URL,
  },

  // MATIC/POLYGON
  polygon: {
    chainId: 137,
    url: infuraUrl("polygon-mainnet"),
  },
  polygonMumbai: {
    chainId: 80001,
    url: infuraUrl("polygon-mumbai"),
  },

  // OPTIMISM
  optimisticEthereum: {
    chainId: 10,
    url: infuraUrl("optimism-mainnet"),
  },
  optimisticKovan: {
    chainId: 69,
    url: infuraUrl("optimism-kovan"),
  },

  // ARBITRUM
  arbitrumOne: {
    chainId: 42161,
    url: infuraUrl("arbitrum-mainnet"),
  },
  arbitrumTestnet: {
    chainId: 421611,
    url: infuraUrl("arbitrum-rinkeby"),
  },
};

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

function getChainConfig(network: keyof typeof networks): NetworkUserConfig {
  return {
    accounts: getAccounts(),
    chainId: networks[network].chainId,
    url: networks[network].url,
  };
}

const config: HardhatUserConfig = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: process.env.CONTRACT_SIZER ? true : false,
    disambiguatePaths: false,
  },
  defaultNetwork: "hardhat",
  docgen: {
    path: "./generated/docs",
    clear: true,
    runOnCompile: process.env.DOC_GEN ? true : false,
  },
  etherscan: {
    apiKey: {
      // ETHEREUM
      mainnet: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,

      // BINANCE SMART CHAIN
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,

      // MATIC/POLYGON
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    // if commented out then it fetches from ethGasStationAPI
    // gasPrice: process.env.GAS_PRICE,
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
    ganache: {
      chainId: networks["ganache"].chainId,
      url: networks["ganache"].url,
    },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },

    // ETHEREUM
    mainnet: getChainConfig("mainnet"),
    ropsten: getChainConfig("ropsten"),
    rinkeby: getChainConfig("rinkeby"),
    goerli: getChainConfig("goerli"),

    // BINANCE SMART CHAIN
    bsc: getChainConfig("bsc"),
    bscTestnet: getChainConfig("bscTestnet"),

    // MATIC/POLYGON
    polygon: getChainConfig("polygon"),
    polygonMumbai: getChainConfig("polygonMumbai"),
  },
  paths: {
    artifacts: "./generated/artifacts/hardhat",
    cache: "./generated/cache/hardhat",
    sources: "./contracts",
    tests: "./test",
    deployments: "./generated/deployments",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.14",
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
