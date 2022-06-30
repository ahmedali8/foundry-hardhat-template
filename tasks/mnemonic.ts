/* eslint-disable @typescript-eslint/no-var-requires */
import { task } from "hardhat/config";

const DEBUG = true;

task("mnemonic", "Create a mnemonic for builder deploys", async () => {
  const bip39 = require("bip39");
  const hdkey = require("ethereumjs-wallet/hdkey");
  const mnemonic = bip39.generateMnemonic();
  if (DEBUG) console.log("\nmnemonic: ", mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log("\nseed: ", seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const walletHdPath = "m/44'/60'/0'/0/";
  const accountIndex = 0;
  const fullPath = walletHdPath + accountIndex;
  if (DEBUG) console.log("\nfullPath: ", fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet._privKey.toString("hex")}`;
  if (DEBUG) console.log("\nprivateKey: ", privateKey);
  const EthUtil = require("ethereumjs-util");
  const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString("hex")}`;

  console.log(`🔐 Mnemonic Generated as ${mnemonic}`);
  console.log(`🔐 Account Generated as ${address}, privateKey: ${privateKey}`);
});
