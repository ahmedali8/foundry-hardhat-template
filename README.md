# Foundry + Hardhat Template [![Open in Gitpod][gitpod-badge]][gitpod] [![Github Actions][gha-badge]][gha] [![Hardhat][hardhat-badge]][hardhat] [![Foundry][foundry-badge]][foundry]

[gitpod]: https://gitpod.io/#https://github.com/ahmedali8/foundry-hardhat-template
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[gha]: https://github.com/ahmedali8/foundry-hardhat-template/actions
[gha-badge]: https://github.com/ahmedali8/foundry-hardhat-template/actions/workflows/ci.yml/badge.svg
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg
[foundry]: https://getfoundry.sh/
[foundry-badge]: https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg

A Foundry + Hardhat based template for developing Solidity smart contracts, with sensible defaults.

#### Inspiration - [Hardhat Template](https://github.com/paulrberg/hardhat-template) and [Foundry Template](https://github.com/paulrberg/foundry-template)

- [Hardhat](https://github.com/nomiclabs/hardhat): compile, run and test smart contracts
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript bindings for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Solcover](https://github.com/sc-forks/solidity-coverage): code coverage
- [Forge](https://github.com/foundry-rs/foundry/blob/master/forge): compile, test, fuzz, debug and deploy smart contracts
- [Forge Std](https://github.com/foundry-rs/forge-std): collection of helpful contracts and cheatcodes for testing
- [Solhint](https://github.com/protofire/solhint): code linter
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

## Getting Started

Click the [`Use this template`](https://github.com/ahmedali8/foundry-hardhat-template/generate) button at the top of the page to
create a new repository with this repo as the initial state.

Or, if you prefer to install the template manually:

```sh
$ forge init my-project --template https://github.com/ahmedali8/foundry-hardhat-template
$ cd my-project
$ make setup
```

If this is your first time with Foundry, check out the [installation](https://github.com/foundry-rs/foundry#installation) instructions.

## Features

This template builds upon the frameworks and libraries mentioned above, so for details about their specific features, please consult their respective documentations.

For example, for Hardhat, you can refer to the [Hardhat Tutorial](https://hardhat.org/tutorial) and the [Hardhat
Docs](https://hardhat.org/docs). You might be in particular interested in reading the [Testing Contracts](https://hardhat.org/tutorial/testing-contracts) section.

For example, for Foundry, you can refer to the [Foundry Book](https://book.getfoundry.sh/). You might be in particular interested in reading the [Writing Tests](https://book.getfoundry.sh/forge/writing-tests.html) guide.

### Sensible Defaults

This template comes with sensible default configurations in the following files:

```text
├── .commitlintrc.yml
├── .editorconfig
├── .eslintignore
├── .eslintrc.yml
├── .gitignore
├── .prettierignore
├── .prettierrc.yml
├── .solcover.js
├── .solhintignore
├── .solhint.json
├── .yarnrc.yml
├── foundry.toml
├── hardhat.config.ts
└── remappings.txt
```

### GitHub Actions

This template comes with GitHub Actions pre-configured. Your contracts will be linted and tested on every push and pull request made to the `main` branch.

Note though that by default it injects `.env.example` env variables into github action's `$GITHUB_ENV`.

You can edit the CI script in [.github/workflows/ci.yml](./.github/workflows/ci.yml).

### Conventional Commits

This template enforces the [Conventional Commits](https://www.conventionalcommits.org/) standard for git commit messages.
This is a lightweight convention that creates an explicit commit history, which makes it easier to write automated
tools on top of.

### Git Hooks

This template uses [Husky](https://github.com/typicode/husky) to run automated checks on commit messages, and [Lint Staged](https://github.com/okonet/lint-staged) to automatically format the code with Prettier when making a git commit.

# Usage

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

## Hardhat

### Pre Requisites

Before running any command, you need to create a `.env` file and set all necessary environment variables.
Follow the example in `.env.example`. You can either use mnemonic or individual private keys by setting

```sh
$ ACCOUNT_TYPE="MNEMONIC" (Default)
or
$ ACCOUNT_TYPE="PRIVATE_KEYS"
```

If you don't already have a mnemonic, use this [mnemonic-website](https://iancoleman.io/bip39/) to generate one Or if you don't already have a private key, use this [privatekey-website](https://vanity-eth.tk/) to generate one.

Then, proceed with installing dependencies:

```sh
$ yarn install
```

### Run a Hardhat chain

To run a local network with all your contracts in it, run the following:

```sh
$ yarn chain
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain bindings:

```sh
$ yarn typechain
```

### Test

Run the tests with Hardhat:

```sh
$ yarn test

or

$ yarn test:gas         # shows gas report and contract size

or

$ yarn test:trace       # shows logs + calls

or

$ yarn test:fulltrace   # shows logs + calls + sloads + sstores
```

Optional:

- See the actual fiat currency rates by setting your coingecko api key from [here](https://coinmarketcap.com/api/pricing/) in `.env` file or command.

- Set custom gas price (gwei) in `.env` file or command or let it automatically fetched by ethgasstationapi.

```sh
$ GAS_PRICE=20
$ COIN_MARKET_CAP_API_KEY="your_api_key"
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Forking mainnet

Starts a local hardhat chain with the state of the last `mainnet` block

```sh
$ yarn fork
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

### Deploy

Deploy the contracts to Hardhat Network:

```sh
$ yarn deploy
```

Deploy the contracts to a specific network, such as the Rinkeby testnet:

```sh
$ yarn deploy:network rinkeby
```

For more information on deploy check out repo [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)

### Generate Natspec Doc

Generate natspec documentation for your contracts by running

```sh
$ yarn hardhat dodoc
```

For more information on Natspec [click here](https://docs.soliditylang.org/en/v0.8.12/natspec-format.html#natspec) and for dodoc repo [click here](https://github.com/primitivefinance/primitive-dodoc)

### View Contracts Size

```sh
$ yarn hardhat size-contracts
```

or turn on for every compile

```sh
$ CONTRACT_SIZER=true
```

## Verify Contract

### Manual Verify

```sh
$ yarn hardhat verify --network <network> DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"
```

For complex arguments you can refer [here](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

```sh
$ yarn hardhat verify --contract contracts/CONTRACT_NAME.sol:CONTRACT_NAME --network <network> --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

### Verify Contract Programmatically

Verify the contract using `verifyContract` function in [verify.ts](./utils/verify.ts)

Set block explorer api key in `.env` file or using command, refer to `.env.example` for more insight.

Example deploy script with `verifyContract` function is [here](./deploy/00_deploy_token_contract.ts)

## Foundry

Here's a list of the most frequently needed commands.

### Build or Compile

Build the contracts:

```sh
$ forge build
```

### Clean

Delete the build artifacts and cache directories:

```sh
$ forge clean
```

### Deploy

Deploy to Anvil:

```sh
$ forge script sol_script/Token.s.sol:TokenScript \
  --fork-url http://localhost:8545 \
  --broadcast --private-key $PRIVATE_KEY
```

For instructions on how to deploy to a testnet or mainnet, check out the [Solidity Scripting tutorial](https://book.getfoundry.sh/tutorials/solidity-scripting.html).

### Gas Usage

Get a gas report:

```sh
$ forge test --gas-report
```

### Test

Run the tests:

```sh
$ forge test
```

You can also use [console.log](https://book.getfoundry.sh/faq?highlight=console.log#how-do-i-use-consolelog), whose logs you can see in the terminal output by adding the `-vvvv` flag.

## Notes

1. Foundry piggybacks off [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to manage dependencies. There's a [guide](https://book.getfoundry.sh/projects/dependencies.html) about how to work with dependencies in the book.
2. You don't have to create a `.env` file, but filling in the environment variables may be useful when debugging and testing against a mainnet fork.

## Syntax Highlighting

If you use VSCode, you can enjoy syntax highlighting for your Solidity code via the
[vscode-solidity](https://github.com/juanfranblanco/vscode-solidity) extension.

## Using GitPod

[GitPod](https://www.gitpod.io/) is an open-source developer platform for remote development.

To view the coverage report generated by `yarn coverage`, just click `Go Live` from the status bar to turn the server on/off.

## Contributing

Contributions are always welcome! Open a PR or an issue!

## Thank You!

## Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [Foundry Book](https://book.getfoundry.sh/)
